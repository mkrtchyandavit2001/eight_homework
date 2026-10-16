import type { Homework } from "@/types/dashboard";

// TODO: ժամանակավոր՝ մինչև backend-ի միացումը (Figma-ի "հիմա")
export const MOCK_NOW = "2026-07-22T09:59";

export const HOMEWORK: Homework[] = [
  {
    id: "hw-writing",
    type: "writing",
    status: "pending",
    assignedAt: "2026-07-21T23:59",
    deadlineAt: "2026-07-24T23:59",
  },
  {
    id: "hw-vocab-u3",
    type: "vocabulary",
    status: "pending",
    assignedAt: "2026-07-20T23:59",
    deadlineAt: "2026-07-23T23:59",
  },
  {
    id: "hw-vocab-u2",
    type: "vocabulary",
    status: "overdue", // փոխիր "retry"՝ "Try Again" վիճակը տեսնելու համար
    assignedAt: "2026-07-18T23:59",
    deadlineAt: "2026-07-21T23:59",
  },
  {
    id: "hw-sentences",
    type: "grammar",
    status: "submitted",
    assignedAt: "2026-07-15T23:59",
    deadlineAt: "2026-07-17T23:59",
    submittedAt: "2026-07-16T18:00",
  },
  {
    id: "hw-recognition",
    type: "reading",
    status: "graded",
    assignedAt: "2026-07-06T23:59",
    deadlineAt: "2026-07-10T23:59",
    submittedAt: "2026-07-07T12:00",
    score: 92,
  },
];