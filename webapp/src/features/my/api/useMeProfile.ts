import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAsgardeo } from "@asgardeo/react";
import { peopleBackendUrl, peopleServiceUrls } from "@config/apiConfig";
import type { Employee, EmployeePersonalInfo, UserInfo } from "./types";

// Thrown by authedGet — carries the HTTP status so retry logic (both the
// per-query retry in useMeProfile and the global one in AppWithConfig's
// QueryClient) can key off it without regex-parsing the message.
export class HttpError extends Error {
  readonly status: number;
  readonly url: string;
  constructor(url: string, status: number, body: string) {
    super(`GET ${url} failed: HTTP ${status}${body ? ` — ${body.slice(0, 200)}` : ""}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
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
function useAsgardeoSub(): string | undefined {
  const { isSignedIn, getDecodedIdToken } = useAsgardeo();
  const [sub, setSub] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isSignedIn) {
      setSub(undefined);
      return;
    }
    let cancelled = false;
    getDecodedIdToken()
      .then((token) => {
        if (cancelled) return;
        const s = (token as { sub?: string } | null | undefined)?.sub;
        setSub(typeof s === "string" && s.length > 0 ? s : undefined);
      })
      .catch(() => {
        if (!cancelled) setSub(undefined);
      });
    return () => {
      cancelled = true;
    };
  }, [isSignedIn, getDecodedIdToken]);

  return sub;
}

// Two-step fetch that mirrors people-app's own me flow:
//   1. GET /user-info                 → employeeId (from the JWT identity)
//   2. GET /employees/{id}            → org / role / employment record
//      GET /employees/{id}/personal-info → contact + emergency contacts
// Steps 2 and 3 run in parallel once employeeId is known.
export function useMeProfile() {
  const { getIdToken, isSignedIn } = useAsgardeo();
  const userSub = useAsgardeoSub();
  const backendConfigured = Boolean(peopleBackendUrl);

  return useQuery<MeProfile>({
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
}

export function isPeopleBackendConfigured(): boolean {
  return Boolean(peopleBackendUrl);
}
