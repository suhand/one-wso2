// Asgardeo OAuth config. Read at runtime from window.config (injected by
// public/config.js) so a single static bundle can serve any environment.
// Same pattern as customer-portal — every WSO2 internal webapp follows this.

declare global {
  interface Window {
    config: {
      ONE_WSO2_AUTH_BASE_URL: string;
      ONE_WSO2_AUTH_CLIENT_ID: string;
      ONE_WSO2_AUTH_SIGN_IN_REDIRECT_URL: string;
      ONE_WSO2_AUTH_SIGN_OUT_REDIRECT_URL: string;
      ONE_WSO2_THEME?: string;
      // Base URL for the people-ops-suite people-app backend (the same
      // SERVICE_BASE_URL people-app's own webapp reads). Used to fetch the
      // current user's Employee + EmployeePersonalInfo records on the
      // My profile page. Optional — when absent, the My page still loads
      // but the profile sections show a "not configured" state.
      ONE_WSO2_PEOPLE_BACKEND_URL?: string;
      // Dev-only escape hatch — when true AND the bundle is a Vite dev
      // build, AuthGuard treats the user as signed in without ever calling
      // Asgardeo. Ignored in production builds (see devBypassAuth below),
      // so a stray true in a prod config.js can't disable auth.
      ONE_WSO2_DEV_BYPASS_AUTH?: boolean;
    };
  }
}

// Gate on import.meta.env.DEV so this constant folds to `false` in the
// production bundle no matter what config.js says. Vite/esbuild replaces
// import.meta.env.DEV with a literal `false` at build time and dead-code
// eliminates the whole branch, so ONE_WSO2_DEV_BYPASS_AUTH becomes inert
// in shipped code even if an operator accidentally sets it to true.
export const devBypassAuth =
  import.meta.env.DEV && window.config?.ONE_WSO2_DEV_BYPASS_AUTH === true;

function readConfig(key: keyof Window["config"], fallback = ""): string {
  const value = window.config?.[key];
  if (typeof value === "string" && value) return value;
  if (devBypassAuth) return fallback;
  throw new Error(
    `Missing runtime config: window.config.${key}. Populate public/config.js from public/config.js.example.`,
  );
}

export const authConfig = {
  baseUrl: readConfig("ONE_WSO2_AUTH_BASE_URL", "https://dev.local/asgardeo"),
  clientId: readConfig("ONE_WSO2_AUTH_CLIENT_ID", "dev-mode-client"),
  afterSignInUrl: readConfig("ONE_WSO2_AUTH_SIGN_IN_REDIRECT_URL", "http://localhost:3000"),
  afterSignOutUrl: readConfig("ONE_WSO2_AUTH_SIGN_OUT_REDIRECT_URL", "http://localhost:3000"),
  // Same scope set as Novera and the leave/menu backends — groups is
  // required for role-based checks in downstream experience APIs.
  scopes: ["openid", "email", "groups", "profile"] as const,
};
