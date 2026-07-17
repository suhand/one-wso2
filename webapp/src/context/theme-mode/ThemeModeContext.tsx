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

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

// Bridges MUI's colorScheme state (which oxygen-ui reads via
// data-color-scheme on <html>) into a tiny mode/toggle API our components
// can use. MUI's own hook handles persistence + the DOM attribute stamp;
// we just resolve "system" down to a concrete light/dark for consumers
// that need one value (e.g. picking the right WSO2 wordmark asset).
//
// Must be mounted inside <OxygenUIThemeProvider> — that's where MUI's
// CssVarsProvider lives.
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const { mode, systemMode, setMode } = useColorScheme();

  const resolved: ThemeMode = (mode === "system" ? systemMode : mode) === "dark" ? "dark" : "light";

  const toggle = useCallback(() => {
    setMode(resolved === "dark" ? "light" : "dark");
  }, [resolved, setMode]);

  const value = useMemo<ThemeModeContextValue>(() => ({ mode: resolved, toggle }), [resolved, toggle]);
  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode outside <ThemeModeProvider>");
  return ctx;
}
