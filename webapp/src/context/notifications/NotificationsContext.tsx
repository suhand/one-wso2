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

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import NotificationBanner, { type NotificationSeverity } from "./NotificationBanner";

// Global success/error banner. Same shape as cs-tools/apps/customer-portal's
// SuccessBanner + ErrorBanner contexts, folded into one provider so a single
// slot on screen shows whichever kind of notification fires last. Auto-
// dismisses on a fixed timeout; passing a fresh message while one is
// visible restarts the timer.

const AUTO_DISMISS_MS = 3500;

interface NotificationsContextValue {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

interface Notification {
  severity: NotificationSeverity;
  message: string;
  // Bumped every showSuccess/showError call so the timer effect resets even
  // when the message string is identical to the previous one.
  key: number;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const push = useCallback(
    (severity: NotificationSeverity) => (message: string) => {
      setNotification((prev) => ({
        severity,
        message,
        key: (prev?.key ?? 0) + 1,
      }));
    },
    [],
  );

  const showSuccess = useMemo(() => push("success"), [push]);
  const showError = useMemo(() => push("error"), [push]);

  const dismiss = useCallback(() => setNotification(null), []);

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [notification, dismiss]);

  const value = useMemo(() => ({ showSuccess, showError }), [showSuccess, showError]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      {notification && (
        <NotificationBanner
          severity={notification.severity}
          message={notification.message}
          onClose={dismiss}
        />
      )}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
