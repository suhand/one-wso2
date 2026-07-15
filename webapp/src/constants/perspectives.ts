// Central perspective registry. The waffle switcher and left rail both read
// from this — one edit here changes every entry point.

export type PerspectiveGroup = "functional" | "cross";

export interface PerspectiveSection {
  id: string; // anchor id on the perspective's page
  label: string;
}

export interface PerspectiveDef {
  key: string;
  label: string;
  emoji: string;
  group: PerspectiveGroup;
  access: boolean;
  path?: string; // route path (undefined for locked perspectives)
  sections?: PerspectiveSection[];
}

export const PERSPECTIVES: readonly PerspectiveDef[] = [
  // Functional (persona-based, locked or unlocked)
  { key: "csm", label: "CSM", emoji: "🛟", group: "functional", access: false },
  {
    key: "people",
    label: "People Ops",
    emoji: "👥",
    group: "functional",
    access: true,
    path: "/people-ops",
    sections: [
      { id: "sec-hiring", label: "Hiring" },
      { id: "sec-candidates", label: "Candidates" },
      { id: "sec-performance", label: "Performance & promotions" },
      { id: "sec-people", label: "People" },
      { id: "sec-ops", label: "Operational services" },
    ],
  },
  { key: "sales", label: "Sales", emoji: "📈", group: "functional", access: false },
  { key: "revops", label: "Rev Ops", emoji: "⚙️", group: "functional", access: false },
  { key: "marketing", label: "Marketing", emoji: "📣", group: "functional", access: false },
  { key: "finance", label: "Finance", emoji: "💰", group: "functional", access: false },
  { key: "leadership", label: "Leadership", emoji: "🧭", group: "functional", access: false },

  // Cross-cutting (available to everyone)
  {
    key: "my",
    label: "My",
    emoji: "🙋",
    group: "cross",
    access: true,
    path: "/my",
    sections: [
      { id: "my-general", label: "General" },
      { id: "my-personal", label: "Personal" },
      { id: "my-emergency", label: "Emergency contacts" },
      { id: "my-connected", label: "Connected" },
    ],
  },
  {
    key: "requests",
    label: "Service Requests",
    emoji: "⚡",
    group: "cross",
    access: true,
    path: "/service-requests",
  },
];

export const FUNCTIONAL_PERSPECTIVES = PERSPECTIVES.filter(
  (p) => p.group === "functional",
);
export const CROSS_PERSPECTIVES = PERSPECTIVES.filter(
  (p) => p.group === "cross",
);

export function findPerspectiveByPath(pathname: string): PerspectiveDef | undefined {
  return PERSPECTIVES.find((p) => p.path && pathname.startsWith(p.path));
}

export function findPerspectiveByKey(key: string): PerspectiveDef | undefined {
  return PERSPECTIVES.find((p) => p.key === key);
}
