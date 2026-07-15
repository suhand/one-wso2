// Types for People Ops perspective mock data. Substitute the constants
// modules with real API calls (React Query hooks) when the backend lands.

export type ReqStatus = "aging" | "on-track" | "draft";

export interface FunnelStage {
  label: "Shortlisted" | "Screen" | "Interview" | "Offer";
  count: number;
  hot?: boolean;
  dim?: boolean;
}

export interface Requisition {
  id: string;
  title: string;
  location: string;
  daysOpen?: number;
  team?: string;
  owner?: string;
  status: ReqStatus;
  funnel?: FunnelStage[]; // absent for DRAFT rows
}

export interface Interview {
  id: string;
  candidateName: string;
  when: string; // "Tue 10:00 IST"
  role: string;
  panel?: string;
  note?: string; // e.g. "needs a 3rd interviewer"
  pill?: { label: string; tone: "crit" | "watch" | "ok" };
  actionLabel?: string;
}

export type CandidateStageTone = "crit" | "watch" | "ok" | "neutral";
export type CandidateSignalTone = "pos" | "neg" | "neutral";

export interface Candidate {
  id: string;
  initials: string;
  name: string;
  background: string; // "8y GRC · CISM · WSO2 alum"
  role: string;
  stage: string;
  stageTone: CandidateStageTone;
  signal: string;
  signalTone: CandidateSignalTone;
  actionLabel: string;
  actionPrimary?: boolean;
}

export interface Joiner {
  id: string;
  name: string;
  designation: string; // "Senior Software Engineer"
  team: string; // "Ballerina Consulting Team in the Customer Success BU"
  location: string;
  joinedDate: string; // ISO
}
