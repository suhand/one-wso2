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
