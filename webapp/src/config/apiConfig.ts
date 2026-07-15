// Backend base URLs. Read at runtime from window.config (same pattern as
// authConfig). Empty string = not configured; the calling hook should treat
// that as "backend not available" and render an appropriate state instead
// of firing broken requests.

export const peopleBackendUrl: string =
  window.config?.ONE_WSO2_PEOPLE_BACKEND_URL ?? "";

// Convenience — mirrors the AppConfig.serviceUrls shape used by people-app's
// own webapp so the two apps hit the same endpoints the same way.
export const peopleServiceUrls = {
  userInfo: `${peopleBackendUrl}/user-info`,
  employee: (employeeId: string) => `${peopleBackendUrl}/employees/${employeeId}`,
  employeePersonalInfo: (employeeId: string) =>
    `${peopleBackendUrl}/employees/${employeeId}/personal-info`,
};
