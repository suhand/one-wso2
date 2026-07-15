// Mock data for the People Ops perspective — ported verbatim from the
// prototype's index.html. Swap each block for a React Query hook
// (useOpenRequisitions, useInterviewsThisWeek, …) once backends exist.

import type {
  Requisition,
  Interview,
  Candidate,
  Joiner,
} from "../types";

export const INSIGHT_TEXT =
  '"3 Senior Lead — Security & Compliance Officer candidates are ready for a final panel. Isuru P.\'s offer expires in 5 days. 2 promotion nominations for the H1 cycle are overdue — Kavindu W. and Roshan B. Want me to schedule the panel and nudge the nominators?"';
export const INSIGHT_SOURCE =
  "▸ from: Hiring · Candidate history · Performance · people-ops-suite";

export const KPI_ROW = [
  { label: "Open requisitions", value: "4", delta: "+1 this week", tone: "up" as const },
  { label: "Pipeline candidates", value: "24", delta: "across 4 roles", tone: "neutral" as const },
  { label: "Interviews this week", value: "5", delta: "1 unstaffed", tone: "watch" as const },
  { label: "Reviews overdue", value: "12", delta: "cycle closes Jul 26", tone: "crit" as const },
];

export const OPEN_REQUISITIONS: Requisition[] = [
  {
    id: "req-sec-lead",
    title: "Senior Lead — Security & Compliance Officer",
    location: "Sri Lanka",
    daysOpen: 32,
    team: "Digital Transformation",
    owner: "A. Silva",
    status: "aging",
    funnel: [
      { label: "Shortlisted", count: 22 },
      { label: "Screen", count: 11 },
      { label: "Interview", count: 5 },
      { label: "Offer", count: 2, hot: true },
    ],
  },
  {
    id: "req-am-spain",
    title: "Senior Account Manager",
    location: "Spain",
    daysOpen: 12,
    team: "Sales",
    owner: "N. Kumara",
    status: "on-track",
    funnel: [
      { label: "Shortlisted", count: 14 },
      { label: "Screen", count: 6, hot: true },
      { label: "Interview", count: 3 },
      { label: "Offer", count: 1 },
    ],
  },
  {
    id: "req-legal",
    title: "Senior Legal Officer",
    location: "Sri Lanka",
    team: "Legal",
    status: "draft",
  },
  {
    id: "req-sdr-india",
    title: "Senior Sales Development Representative",
    location: "India",
    team: "Sales",
    status: "draft",
  },
];

export const INTERVIEWS_THIS_WEEK: Interview[] = [
  {
    id: "iv-isuru",
    candidateName: "Isuru Perera",
    when: "Tue 10:00 IST",
    role: "Sr Lead Security & Compliance",
    panel: "A. Silva, D. Wijesuriya, R. Herath",
    pill: { label: "Final", tone: "crit" },
  },
  {
    id: "iv-miguel",
    candidateName: "Miguel Álvarez",
    when: "Wed 14:00 IST",
    role: "Sr Account Manager (Spain)",
    panel: "N. Kumara + 2",
  },
  {
    id: "iv-dilan",
    candidateName: "Dilan Muthukuda",
    when: "Wed 16:00 IST",
    role: "Sr Lead Security & Compliance",
    note: "re-engage discussion",
  },
  {
    id: "iv-sofia",
    candidateName: "Sofía García",
    when: "Thu 11:00 IST",
    role: "Sr Account Manager (Spain)",
    note: "referral loop",
  },
  {
    id: "iv-kavitha",
    candidateName: "Kavitha Wijesuriya",
    when: "Fri 09:00 IST",
    role: "Sr Lead Security & Compliance",
    note: "needs a 3rd interviewer",
    actionLabel: "Assign",
  },
];

export const CANDIDATES: Candidate[] = [
  {
    id: "c-isuru",
    initials: "IP",
    name: "Isuru Perera",
    background: "8y GRC · CISM · WSO2 alum",
    role: "Sr Lead Security & Compliance",
    stage: "Offer expires 5d",
    stageTone: "crit",
    signal: "✓ prior strong fit",
    signalTone: "pos",
    actionLabel: "Nudge",
    actionPrimary: true,
  },
  {
    id: "c-miguel",
    initials: "MA",
    name: "Miguel Álvarez",
    background: "SaaS enterprise sales · Madrid",
    role: "Sr Account Manager · Spain",
    stage: "Case study",
    stageTone: "watch",
    signal: "Referral · N. Kumara",
    signalTone: "neutral",
    actionLabel: "Review",
  },
  {
    id: "c-rukshan",
    initials: "RF",
    name: "Rukshan Fernando",
    background: "Salesforce Certified · 6y CRM builds",
    role: "Salesforce Developer",
    stage: "Panel scheduling",
    stageTone: "watch",
    signal: "Interviewer to assign",
    signalTone: "neutral",
    actionLabel: "Open",
  },
  {
    id: "c-dilan",
    initials: "DM",
    name: "Dilan Muthukuda",
    background: "Applied 2024 · not offered",
    role: "Sr Lead Security & Compliance",
    stage: "Re-engage?",
    stageTone: "neutral",
    signal: "✗ prior fit — budget only",
    signalTone: "neg",
    actionLabel: "Reopen",
  },
  {
    id: "c-shashini",
    initials: "SP",
    name: "Shashini Perera",
    background: "FP&A 5y · CIMA · KPMG alum",
    role: "Sr Lead Finance Analyst",
    stage: "HR round",
    stageTone: "ok",
    signal: "Fast-track requested",
    signalTone: "neutral",
    actionLabel: "Open",
  },
  {
    id: "c-priya",
    initials: "PN",
    name: "Priya Nair",
    background: "SDR 3y · Freshworks · Bengaluru",
    role: "Sr Sales Dev Rep · India",
    stage: "Screen",
    stageTone: "neutral",
    signal: "New · inbound",
    signalTone: "neutral",
    actionLabel: "Screen",
  },
];

export const RECENT_JOINERS: Joiner[] = [
  {
    id: "j-priya-s",
    name: "Priya Senanayake",
    designation: "Senior Software Engineer",
    team: "Ballerina Consulting Team in the Customer Success BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-ravindu",
    name: "Ravindu Karunatilake",
    designation: "Software Engineer",
    team: "Choreo Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-menaka",
    name: "Menaka Pathirana",
    designation: "Marketing Executive",
    team: "Content Team in the Marketing BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-anushka",
    name: "Anushka Perera",
    designation: "Associate Software Engineer",
    team: "Identity Server Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-chamara",
    name: "Chamara Wickramaratne",
    designation: "Associate Lead - Procurement",
    team: "Finance Team in the Corporate BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-kavindu",
    name: "Kavindu Weerasinghe",
    designation: "Product Designer",
    team: "Design Systems Team in the Corporate BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-dinesh",
    name: "Dinesh Fonseka",
    designation: "Software Engineer",
    team: "API Manager Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-nuwani",
    name: "Nuwani Silva",
    designation: "HR Executive",
    team: "People Operations Team in the Corporate BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-amal",
    name: "Amal Jayasuriya",
    designation: "Associate Consultant",
    team: "Forward Deployed Engineering Team in the Customer Success BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-01",
  },
  {
    id: "j-chathura",
    name: "Chathura Gunaratne",
    designation: "Senior Software Engineer",
    team: "Micro Integrator Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-01",
  },
];

export const PROMOTION_NOMINEES = [
  { name: "Chanuka Karunanayake", track: "Snr → Lead · Product", pill: { label: "On track", tone: "ok" as const } },
  { name: "Nadun Rathnayake", track: "Snr → Lead · Engineering", pill: { label: "Draft", tone: "watch" as const } },
  { name: "Priyanka Silva", track: "Assoc → Snr · Support", pill: { label: "On track", tone: "ok" as const } },
  { name: "Kavindu Weerasinghe", track: "Snr → Lead · Design", pill: { label: "Nomination overdue", tone: "crit" as const } },
  { name: "Roshan Bandara", track: "Assoc → Snr · QE", pill: { label: "Nomination overdue", tone: "crit" as const } },
];

export const CAFETERIA_MENU = [
  { icon: "🥣", meal: "Breakfast", items: "Milk rice · pol sambol · dhal · seeni sambol" },
  { icon: "🥐", meal: "Morning snack", items: "Fish rolls · malu paan · tea & coffee" },
  { icon: "🍛", meal: "Lunch", items: "Rice & curry · chicken · dhal · mallum · papadam" },
  { icon: "🫖", meal: "Evening snack", items: "Vadai · cutlets · tea" },
];
