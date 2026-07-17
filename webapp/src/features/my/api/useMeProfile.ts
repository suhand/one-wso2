import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAsgardeo } from "@asgardeo/react";
import { peopleBackendUrl, peopleServiceUrls } from "@config/apiConfig";
import type { Employee, EmployeePersonalInfo, UserInfo } from "./types";

// Thrown by authedGet — carries the HTTP status so retry logic (both the
// per-query retry in useMeProfile and the global one in AppWithConfig's
// QueryClient) can key off it without regex-parsing the message.
//
// The user-facing `.message` intentionally omits the raw response body —
// backend diagnostics can leak stack traces / internal identifiers and
// this Error surfaces via MyProfilePage's error banner (visible to the
// signed-in user). Sanitized body is preserved on `.responseBody` for
// controlled dev logging (see authedGet) but never in the message.
export class HttpError extends Error {
  readonly status: number;
  readonly url: string;
  readonly responseBody: string;
  constructor(url: string, status: number, body: string) {
    super(`Request failed with HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.responseBody = body;
  }
}

// Authed fetch — Bearer <Asgardeo id_token>. Same header shape people-app's
// axios interceptor sets (Choreo's gateway rewrites this into
// x-jwt-assertion for the backend's JwtInterceptor).
//
// No Content-Type header on GET: with no body the header is meaningless and
// makes the request non-simple, forcing an unnecessary CORS preflight.
async function authedGet<T>(url: string, idToken: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Dev-only console log — never render `body` in the UI.
    if (import.meta.env.DEV && body) {
      console.warn(`[authedGet] ${url} → HTTP ${res.status}: ${body.slice(0, 400)}`);
    }
    throw new HttpError(url, res.status, body);
  }
  return res.json() as Promise<T>;
}

export interface MeProfile {
  userInfo: UserInfo;
  employee: Employee;
  personalInfo: EmployeePersonalInfo;
}

// Resolves the current Asgardeo user's `sub` claim. Used as an identity
// discriminator in downstream query keys so a sign-out→different-user
// sign-in in the same tab can't briefly serve the previous user's cached
// data. We can't use useAsgardeo().user for this — that field is only
// populated when preferences.user.fetchUserProfile is true (we disable it)
// or on the AsgardeoV2 platform (our tenant isn't). Decoding the id_token
// via the SDK is the one path that always works.
//
// Returns a three-state value so the caller can distinguish loading
// ({status: "loading"}), success ({status: "ready", sub}), and terminal
// failure ({status: "error", message}). Callers surface the error state
// in the UI instead of leaving the downstream query silently disabled.
type SubState =
  | { status: "loading" }
  | { status: "ready"; sub: string }
  | { status: "error"; message: string };

function useAsgardeoSub(): SubState {
  const { isSignedIn, getDecodedIdToken } = useAsgardeo();
  const [state, setState] = useState<SubState>({ status: "loading" });

  useEffect(() => {
    if (!isSignedIn) {
      setState({ status: "loading" });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });
    getDecodedIdToken()
      .then((token) => {
        if (cancelled) return;
        const s = (token as { sub?: string } | null | undefined)?.sub;
        if (typeof s === "string" && s.length > 0) {
          setState({ status: "ready", sub: s });
        } else {
          setState({
            status: "error",
            message: "Signed in, but the identity token has no `sub` claim.",
          });
        }
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : String(e);
        setState({ status: "error", message: `Couldn't decode identity token: ${msg}` });
      });
    return () => {
      cancelled = true;
    };
  }, [isSignedIn, getDecodedIdToken]);

  return state;
}

// Two-step fetch that mirrors people-app's own me flow:
//   1. GET /user-info                 → employeeId (from the JWT identity)
//   2. GET /employees/{id}            → org / role / employment record
//      GET /employees/{id}/personal-info → contact + emergency contacts
// Steps 2 and 3 run in parallel once employeeId is known.
export function useMeProfile() {
  const { getIdToken, isSignedIn } = useAsgardeo();
  const subState = useAsgardeoSub();
  const userSub = subState.status === "ready" ? subState.sub : undefined;
  const backendConfigured = Boolean(peopleBackendUrl);
  const identityError = subState.status === "error" ? subState.message : null;

  const query = useQuery<MeProfile>({
    // userSub is part of the key so cached data is scoped per-user — no
    // brief cross-user leak on account switch in the same tab.
    queryKey: ["me-profile", userSub],
    enabled: isSignedIn && backendConfigured && Boolean(userSub),
    queryFn: async () => {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("No id_token available from Asgardeo");

      const userInfo = await authedGet<UserInfo>(
        peopleServiceUrls.userInfo,
        idToken,
      );
      const [employee, personalInfo] = await Promise.all([
        authedGet<Employee>(peopleServiceUrls.employee(userInfo.employeeId), idToken),
        authedGet<EmployeePersonalInfo>(
          peopleServiceUrls.employeePersonalInfo(userInfo.employeeId),
          idToken,
        ),
      ]);
      return { userInfo, employee, personalInfo };
    },
    // Profile changes rarely — fetch once per session, don't retry on
    // 4xx (usually a token / role problem, not a transient failure).
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof HttpError && error.status >= 400 && error.status < 500) return false;
      return failureCount < 1;
    },
  });

  // Fold identity resolution failures into the query result so the page
  // renders a real error (with a retry path) instead of getting stuck on
  // the loading skeleton. Identity errors take precedence — if the JWT
  // subject is unresolvable, the /user-info call would fail anyway.
  //
  // The synthetic result doesn't match React Query's discriminated union
  // exactly (the four *Result variants have exclusive boolean flags), so
  // we cast through unknown; the consumer only reads isError + error +
  // isLoading, and this shape sets those consistently.
  if (identityError && !query.isError) {
    const synthetic = {
      ...query,
      isError: true,
      isPending: false,
      isLoading: false,
      isSuccess: false,
      isFetching: false,
      status: "error" as const,
      error: new Error(identityError),
    };
    return synthetic as unknown as typeof query;
  }
  return query;
}

export function isPeopleBackendConfigured(): boolean {
  return Boolean(peopleBackendUrl);
}
