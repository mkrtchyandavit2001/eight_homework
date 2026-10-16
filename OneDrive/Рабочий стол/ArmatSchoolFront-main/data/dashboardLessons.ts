import type { Lesson } from "@/types/dashboard";

export const LESSONS: Lesson[] = [
  { id: "u1-alphabet", status: "completed", startsAt: "2026-07-07T10:00", score: 95 },
  { id: "u1-practice", status: "completed", startsAt: "2026-07-10T10:00", score: 88 },
  { id: "u2-vocab", status: "completed", startsAt: "2026-07-14T10:00", score: 92 },
  { id: "u2-sentences", status: "completed", startsAt: "2026-07-17T10:00", score: 90 },
  { id: "u3-numbers", status: "upcoming", startsAt: "2026-07-21T10:00" },
  { id: "u3-review", status: "upcoming", startsAt: "2026-07-24T10:00" },
  { id: "u4-story", status: "upcoming", startsAt: "2026-07-28T10:00" },
];

export const MONTH_HOMEWORK_SUBMITTED = 2;