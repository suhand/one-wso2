import { AsgardeoProvider } from "@asgardeo/react";
import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import { authConfig } from "@config/authConfig";
import { themeConfig } from "@config/themeConfig";
import { ThemeModeProvider } from "@context/theme-mode/ThemeModeContext";
import { PerspectiveProvider } from "@context/perspective/PerspectiveContext";
import { HttpError } from "@features/my/api/useMeProfile";
import App from "./App";

// One shared QueryClient — retry only on transient upstream errors. All
// HTTP failures the app throws are HttpError (see @features/my/api), so we
// key the check off the class + .status rather than a fragile regex on the
// message. Non-HttpError throws (e.g. network offline) also retry.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: (failureCount, error) => {
        if (failureCount >= 2) return false;
        if (error instanceof HttpError) return error.status === 502 || error.status === 503;
        return true;
      },
    },
  },
});

export default function AppWithConfig() {
  return (
    <AsgardeoProvider
      baseUrl={authConfig.baseUrl}
      clientId={authConfig.clientId}
      afterSignInUrl={authConfig.afterSignInUrl}
      afterSignOutUrl={authConfig.afterSignOutUrl}
      scopes={[...authConfig.scopes]}
      preferences={{
        theme: { inheritFromBranding: false },
        user: { fetchUserProfile: false, fetchOrganizations: false },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <OxygenUIThemeProvider theme={themeConfig}>
          <ThemeModeProvider>
            <BrowserRouter>
              <PerspectiveProvider>
                <App />
              </PerspectiveProvider>
            </BrowserRouter>
          </ThemeModeProvider>
        </OxygenUIThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AsgardeoProvider>
  );
}
