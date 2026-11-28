/*
 * The /apply page's questions and routing (Founder OS: one application, gated by spend, three routes).
 * Import-free so Node runs src/lib/apply-core.test.ts as is. The edge function send-application keeps its
 * own copy of the allowed values, because edge functions do not import from src/.
 */

export const SPEND_BANDS = ["under-10k", "10k-20k", "20k-50k", "50k-plus"] as const;
export type SpendBand = (typeof SPEND_BANDS)[number];
export type Route = "resources" | "audit" | "call";

/** Under €10K a month: free guides and the newsletter. €10K to €20K: the fixed-fee audit. €20K+: a fit call. */
export const routeFor = (spend: SpendBand): Route =>
  spend === "under-10k" ? "resources" : spend === "10k-20k" ? "audit" : "call";

type Option = { value: string; label: string };
export type Question = { id: string; label: string; kind: "select" | "text" | "email" | "long"; options?: Option[]; optional?: boolean };

export const QUESTIONS: Question[] = [
  {
    id: "spend", label: "How much do you spend on ads each month?", kind: "select",
    options: [
      { value: "under-10k", label: "Under €10K" },
      { value: "10k-20k", label: "€10K to €20K" },
      { value: "20k-50k", label: "€20K to €50K" },
      { value: "50k-plus", label: "€50K or more" },
    ],
  },
  { id: "name", label: "Your name", kind: "text" },
  { id: "email", label: "Work email", kind: "email" },
  { id: "company", label: "Company", kind: "text" },
  { id: "website", label: "Website", kind: "text", optional: true },
  {
    id: "role", label: "Your role", kind: "select",
    options: [
      { value: "founder", label: "Founder or CEO" },
      { value: "growth", label: "Head of growth or marketing" },
      { value: "buyer", label: "I run the ad account myself" },
      { value: "other", label: "Something else" },
    ],
  },
  { id: "goal", label: "What should your ads do in the next 90 days that they don't do now?", kind: "long" },
  { id: "blocker", label: "What's in the way right now?", kind: "long" },
  {
    id: "timeline", label: "When do you want to start?", kind: "select",
    options: [
      { value: "now", label: "As soon as possible" },
      { value: "month", label: "Within a month" },
      { value: "quarter", label: "In one to three months" },
      { value: "exploring", label: "I'm just exploring" },
    ],
  },
  { id: "decision", label: "Who else decides on this?", kind: "text" },
];
