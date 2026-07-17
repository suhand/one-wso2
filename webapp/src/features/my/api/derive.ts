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

// Parse a YYYY-MM-DD (or ISO datetime prefixed with YYYY-MM-DD) into its
// numeric components. Avoids `new Date("YYYY-MM-DD")`, which the spec
// requires to be parsed as UTC midnight — that shifts by a full day in
// negative TZ offsets, miscomputing month/birthday boundaries. Returns
// null if the input is missing or doesn't start with a well-formed date.
function parseDateOnly(v: string | null | undefined): { y: number; m: number; d: number } | null {
  if (!v) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return { y, m: m - 1, d }; // m is 0-indexed to match Date.getMonth()
}

// "5y 4m" style — same shape people-app renders for length of service.
// Anchor date is a param so callers can pass a fixed "today" if they need
// deterministic tests; falls back to now.
export function serviceLength(startDate: string | null | undefined, now: Date = new Date()): string {
  const start = parseDateOnly(startDate);
  if (!start) return DASH;
  let years = now.getFullYear() - start.y;
  let months = now.getMonth() - start.m;
  if (now.getDate() < start.d) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 0) return DASH;
  return `${years}y ${months}m`;
}

export function ageFromDob(dob: string | null | undefined, now: Date = new Date()): string {
  const b = parseDateOnly(dob);
  if (!b) return DASH;
  let age = now.getFullYear() - b.y;
  const m = now.getMonth() - b.m;
  if (m < 0 || (m === 0 && now.getDate() < b.d)) age -= 1;
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
