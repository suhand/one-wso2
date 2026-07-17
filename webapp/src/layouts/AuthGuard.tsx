// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { useAsgardeo } from "@asgardeo/react";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Box, CircularProgress } from "@wso2/oxygen-ui";
import { devBypassAuth } from "@config/authConfig";

const POST_LOGIN_KEY = "one_wso2_post_login_redirect";

// Wrap every authenticated route. If the user isn't signed in, stash the
// intended path so we can restore it after the Asgardeo redirect completes,
// then call signIn(). Same pattern as customer-portal's AuthGuard.
export default function AuthGuard() {
  const { isSignedIn, isLoading, signIn } = useAsgardeo();
  const location = useLocation();
  const navigate = useNavigate();
  // Prevents a second signIn() from firing under StrictMode's double-render
  // or on any incidental re-run of this effect before the browser has left
  // the page. Reset only when the SDK reports the user as signed in.
  const startedSignInRef = useRef(false);

  useEffect(() => {
    if (devBypassAuth) return; // dev-only: never redirect
    if (isLoading) return;
    if (!isSignedIn) {
      if (startedSignInRef.current) return;
      startedSignInRef.current = true;
      const target = location.pathname + location.search + location.hash;
      if (target && target !== "/") {
        sessionStorage.setItem(POST_LOGIN_KEY, target);
      }
      signIn();
      return;
    }
    // Signed in: consume any stashed redirect and let React Router own the
    // history stack so useNavigate()/Back behave predictably.
    startedSignInRef.current = false;
    const restored = sessionStorage.getItem(POST_LOGIN_KEY);
    if (!restored) return;
    sessionStorage.removeItem(POST_LOGIN_KEY);
    if (restored !== location.pathname + location.search + location.hash) {
      navigate(restored, { replace: true });
    }
  }, [isLoading, isSignedIn, location, signIn, navigate]);

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
