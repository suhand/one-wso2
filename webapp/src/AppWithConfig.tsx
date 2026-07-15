import { AsgardeoProvider } from "@asgardeo/react";
import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import { authConfig } from "@config/authConfig";
import { themeConfig } from "@config/themeConfig";
import { ThemeModeProvider } from "@context/theme-mode/ThemeModeContext";
import { PerspectiveProvider } from "@context/perspective/PerspectiveContext";
import App from "./App";

// One shared QueryClient — retry only on transient upstream errors.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: (failureCount, error) => {
        const status = (error as { status?: number })?.status;
        return failureCount < 2 && (status === 502 || status === 503);
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
