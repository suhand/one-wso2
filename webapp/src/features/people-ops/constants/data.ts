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

// Mock data for the People Ops perspective — placeholder names only.
// Every name in this file is an obviously-generic label ("Candidate A",
// "Joiner 1", …) so nothing here can be mistaken for real HR data about
// a real person. Swap each block for a React Query hook
// (useOpenRequisitions, useInterviewsThisWeek, …) once backends exist.

import type {
  Requisition,
  Interview,
  Candidate,
  Joiner,
} from "../types";

export const INSIGHT_TEXT =
  '"3 Senior Lead — Security & Compliance Officer candidates are ready for a final panel. Candidate A\'s offer expires in 5 days. 2 promotion nominations for the H1 cycle are overdue — Nominee 4 and Nominee 5. Want me to schedule the panel and nudge the nominators?"';
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
    owner: "Owner 1",
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
    owner: "Owner 2",
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
    id: "iv-a",
    candidateName: "Candidate A",
    when: "Tue 10:00 IST",
    role: "Sr Lead Security & Compliance",
    panel: "Interviewer 1, Interviewer 2, Interviewer 3",
    pill: { label: "Final", tone: "crit" },
  },
  {
    id: "iv-b",
    candidateName: "Candidate B",
    when: "Wed 14:00 IST",
    role: "Sr Account Manager (Spain)",
    panel: "Owner 2 + 2",
  },
  {
    id: "iv-d",
    candidateName: "Candidate D",
    when: "Wed 16:00 IST",
    role: "Sr Lead Security & Compliance",
    note: "re-engage discussion",
  },
  {
    id: "iv-f",
    candidateName: "Candidate F",
    when: "Thu 11:00 IST",
    role: "Sr Account Manager (Spain)",
    note: "referral loop",
  },
  {
    id: "iv-g",
    candidateName: "Candidate G",
    when: "Fri 09:00 IST",
    role: "Sr Lead Security & Compliance",
    note: "needs a 3rd interviewer",
    actionLabel: "Assign",
  },
];

export const CANDIDATES: Candidate[] = [
  {
    id: "c-a",
    initials: "CA",
    name: "Candidate A",
    background: "8y GRC · CISM · industry alum",
    role: "Sr Lead Security & Compliance",
    stage: "Offer expires 5d",
    stageTone: "crit",
    signal: "✓ prior strong fit",
    signalTone: "pos",
    actionLabel: "Nudge",
    actionPrimary: true,
  },
  {
    id: "c-b",
    initials: "CB",
    name: "Candidate B",
    background: "SaaS enterprise sales · Madrid",
    role: "Sr Account Manager · Spain",
    stage: "Case study",
    stageTone: "watch",
    signal: "Referral · Owner 2",
    signalTone: "neutral",
    actionLabel: "Review",
  },
  {
    id: "c-c",
    initials: "CC",
    name: "Candidate C",
    background: "Salesforce Certified · 6y CRM builds",
    role: "Salesforce Developer",
    stage: "Panel scheduling",
    stageTone: "watch",
    signal: "Interviewer to assign",
    signalTone: "neutral",
    actionLabel: "Open",
  },
  {
    id: "c-d",
    initials: "CD",
    name: "Candidate D",
    background: "Applied 2024 · not offered",
    role: "Sr Lead Security & Compliance",
    stage: "Re-engage?",
    stageTone: "neutral",
    signal: "✗ prior fit — budget only",
    signalTone: "neg",
    actionLabel: "Reopen",
  },
  {
    id: "c-e",
    initials: "CE",
    name: "Candidate E",
    background: "FP&A 5y · CIMA · Big 4 alum",
    role: "Sr Lead Finance Analyst",
    stage: "HR round",
    stageTone: "ok",
    signal: "Fast-track requested",
    signalTone: "neutral",
    actionLabel: "Open",
  },
  {
    id: "c-f",
    initials: "CF",
    name: "Candidate F",
    background: "SDR 3y · Bengaluru",
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
    id: "j-1",
    name: "Joiner 1",
    designation: "Senior Software Engineer",
    team: "Ballerina Consulting Team in the Customer Success BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-2",
    name: "Joiner 2",
    designation: "Software Engineer",
    team: "Choreo Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-3",
    name: "Joiner 3",
    designation: "Marketing Executive",
    team: "Content Team in the Marketing BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-4",
    name: "Joiner 4",
    designation: "Associate Software Engineer",
    team: "Identity Server Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-07-01",
  },
  {
    id: "j-5",
    name: "Joiner 5",
    designation: "Associate Lead - Procurement",
    team: "Finance Team in the Corporate BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-6",
    name: "Joiner 6",
    designation: "Product Designer",
    team: "Design Systems Team in the Corporate BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-7",
    name: "Joiner 7",
    designation: "Software Engineer",
    team: "API Manager Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-8",
    name: "Joiner 8",
    designation: "People Operations Executive",
    team: "People Operations Team in the Corporate BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-15",
  },
  {
    id: "j-9",
    name: "Joiner 9",
    designation: "Associate Consultant",
    team: "Forward Deployed Engineering Team in the Customer Success BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-01",
  },
  {
    id: "j-10",
    name: "Joiner 10",
    designation: "Senior Software Engineer",
    team: "Micro Integrator Team in the Product Engineering BU",
    location: "Sri Lanka",
    joinedDate: "2026-06-01",
  },
];

export const PROMOTION_NOMINEES = [
  { name: "Nominee 1", track: "Snr → Lead · Product", pill: { label: "On track", tone: "ok" as const } },
  { name: "Nominee 2", track: "Snr → Lead · Engineering", pill: { label: "Draft", tone: "watch" as const } },
  { name: "Nominee 3", track: "Assoc → Snr · Support", pill: { label: "On track", tone: "ok" as const } },
  { name: "Nominee 4", track: "Snr → Lead · Design", pill: { label: "Nomination overdue", tone: "crit" as const } },
  { name: "Nominee 5", track: "Assoc → Snr · QE", pill: { label: "Nomination overdue", tone: "crit" as const } },
];

export const CAFETERIA_MENU = [
  { icon: "🥣", meal: "Breakfast", items: "Main · side · protein · fruit" },
  { icon: "🥐", meal: "Morning snack", items: "Pastry · savoury bite · tea & coffee" },
  { icon: "🍛", meal: "Lunch", items: "Rice · curry · protein · vegetable · condiment" },
  { icon: "🫖", meal: "Evening snack", items: "Savoury bite · fritters · tea" },
];
