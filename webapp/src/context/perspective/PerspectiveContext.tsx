import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router";
import {
  findPerspectiveByPath,
  findPerspectiveByKey,
  type PerspectiveDef,
} from "@constants/perspectives";

interface PerspectiveContextValue {
  active: PerspectiveDef;
}

const PerspectiveContext = createContext<PerspectiveContextValue | undefined>(
  undefined,
);

// Derive the "active" perspective from the current route so the rail /
// top-bar stay in sync without a duplicate state store. Fallback = People
// Ops when the route doesn't match a known perspective (e.g. mid-redirect).
export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const value = useMemo<PerspectiveContextValue>(
    () => ({
      active:
        findPerspectiveByPath(location.pathname) ??
        findPerspectiveByKey("people")!,
    }),
    [location.pathname],
  );
  return (
    <PerspectiveContext.Provider value={value}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function useActivePerspective(): PerspectiveDef {
  const ctx = useContext(PerspectiveContext);
  if (!ctx) {
    throw new Error(
      "useActivePerspective must be used inside <PerspectiveProvider>",
    );
  }
  return ctx.active;
}
