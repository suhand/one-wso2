import { useAsgardeo } from "@asgardeo/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Box, CircularProgress } from "@wso2/oxygen-ui";
import { devBypassAuth } from "@config/authConfig";

const POST_LOGIN_KEY = "one_wso2_post_login_redirect";

// Wrap every authenticated route. If the user isn't signed in, stash the
// intended path so we can restore it after the Asgardeo redirect completes,
// then call signIn(). Same pattern as customer-portal's AuthGuard.
export default function AuthGuard() {
  const { isSignedIn, isLoading, signIn } = useAsgardeo();
  const location = useLocation();

  useEffect(() => {
    if (devBypassAuth) return; // dev-only: never redirect
    if (isLoading) return;
    if (!isSignedIn) {
      const target = location.pathname + location.search + location.hash;
      if (target && target !== "/") {
        sessionStorage.setItem(POST_LOGIN_KEY, target);
      }
      signIn();
    } else {
      const restored = sessionStorage.getItem(POST_LOGIN_KEY);
      if (restored) {
        sessionStorage.removeItem(POST_LOGIN_KEY);
        if (restored !== location.pathname + location.search + location.hash) {
          window.history.replaceState({}, "", restored);
        }
      }
    }
  }, [isLoading, isSignedIn, location, signIn]);

  if (devBypassAuth) return <Outlet />;

  if (isLoading || !isSignedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
}
