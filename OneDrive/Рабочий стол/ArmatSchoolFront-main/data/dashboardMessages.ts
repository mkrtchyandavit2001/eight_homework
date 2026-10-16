import type { ChatMessage, UpdateEntry } from "@/types/dashboard";

// TODO: ժամանակավոր՝ մինչև backend-ի միացումը
export const STUDENT_TZ = "America/New_York";
export const TEACHER_TZ = "Asia/Yerevan";

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    from: "teacher",
    sentAt: "2026-07-20T15:45",
    text: "Hi Emma! Your homework was excellent. Well done!",
  },
  {
    id: "m2",
    from: "student",
    sentAt: "2026-07-20T16:02",
    text: "Thank you so much! I practiced every day.",
  },
  {
    id: "m3",
    from: "teacher",
    sentAt: "2026-07-20T16:08",
    text: "Tomorrow we move on to Unit 3 — Numbers & Colors!",
  },
  {
    id: "m4",
    from: "student",
    sentAt: "2026-07-20T16:15",
    text: "Can't wait! See you at 10 AM.",
  },
];

export const UPDATES: UpdateEntry[] = [
  { id: "u1", sentAt: "2026-07-21T09:00" },
  { id: "u2", sentAt: "2026-07-19T12:00" },
  { id: "u3", sentAt: "2026-07-15T10:30" },
  { id: "u4", sentAt: "2026-07-10T18:00" },
  { id: "u5", sentAt: "2026-07-05T08:00" },
];