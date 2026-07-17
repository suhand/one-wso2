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
