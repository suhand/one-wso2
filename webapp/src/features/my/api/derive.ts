import type { Employee, EmployeePersonalInfo, UserInfo } from "./types";

// Small helpers for turning wire-format DTOs into what the profile UI
// actually renders. Kept next to the types so field-format quirks live in
// one place instead of being sprinkled across components.

export const DASH = "—";

export function display(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return DASH;
  const s = String(v).trim();
  return s.length === 0 ? DASH : s;
}

export function fullName(u: Pick<UserInfo | Employee, "firstName" | "lastName">): string {
  return `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || DASH;
}

export function initialsOf(u: Pick<UserInfo | Employee, "firstName" | "lastName">): string {
  const f = (u.firstName ?? "").trim();
  const l = (u.lastName ?? "").trim();
  return `${f[0] ?? ""}${l[0] ?? ""}`.toUpperCase() || "?";
}

// "5y 4m" style — same shape people-app renders for length of service.
// Anchor date is a param so callers can pass a fixed "today" if they need
// deterministic tests; falls back to now.
export function serviceLength(startDate: string | null | undefined, now: Date = new Date()): string {
  if (!startDate) return DASH;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return DASH;
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 0) return DASH;
  return `${years}y ${months}m`;
}

export function ageFromDob(dob: string | null | undefined, now: Date = new Date()): string {
  if (!dob) return DASH;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return DASH;
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age >= 0 ? String(age) : DASH;
}

// people-app renders dates as ISO YYYY-MM-DD from the backend, so we just
// pass them through and trim any trailing time component.
export function formatDate(v: string | null | undefined): string {
  if (!v) return DASH;
  return v.length > 10 ? v.slice(0, 10) : v;
}

// Not every UI surface needs the whole EmployeePersonalInfo. This picks
// only the fields the emergency-contacts sub-grid renders.
export function emergencyContactList(p: EmployeePersonalInfo | undefined) {
  return p?.emergencyContacts ?? [];
}
