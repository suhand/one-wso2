import { useQuery } from "@tanstack/react-query";
import { useAsgardeo } from "@asgardeo/react";
import { peopleBackendUrl, peopleServiceUrls } from "@config/apiConfig";
import type { Employee, EmployeePersonalInfo, UserInfo } from "./types";

// Authed fetch — Bearer <Asgardeo id_token>. Same header shape people-app's
// axios interceptor sets (Choreo's gateway rewrites this into
// x-jwt-assertion for the backend's JwtInterceptor).
async function authedGet<T>(url: string, idToken: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `GET ${url} failed: HTTP ${res.status}${body ? ` — ${body.slice(0, 200)}` : ""}`,
    );
  }
  return res.json() as Promise<T>;
}

export interface MeProfile {
  userInfo: UserInfo;
  employee: Employee;
  personalInfo: EmployeePersonalInfo;
}

// Two-step fetch that mirrors people-app's own me flow:
//   1. GET /user-info                 → employeeId (from the JWT identity)
//   2. GET /employees/{id}            → org / role / employment record
//      GET /employees/{id}/personal-info → contact + emergency contacts
// Steps 2 and 3 run in parallel once employeeId is known.
export function useMeProfile() {
  const { getIdToken, isSignedIn } = useAsgardeo();
  const backendConfigured = Boolean(peopleBackendUrl);

  return useQuery<MeProfile>({
    queryKey: ["me-profile"],
    enabled: isSignedIn && backendConfigured,
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
      const msg = (error as Error)?.message ?? "";
      if (/HTTP 4\d\d/.test(msg)) return false;
      return failureCount < 1;
    },
  });
}

export function isPeopleBackendConfigured(): boolean {
  return Boolean(peopleBackendUrl);
}
