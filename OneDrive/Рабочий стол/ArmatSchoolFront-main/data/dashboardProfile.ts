import type { Certificate, CurrentCourse, Favorite, LearningProgress, Payment, ProfileStats, UpcomingLesson } from "@/types/dashboard";

// TODO: ժամանակավոր՝ մինչև backend-ի միացումը
export const PROFILE = {
  planLessons: 8,
  memberSince: "2026-01-01",
} as const;

export const PROFILE_STATS: ProfileStats = {
  lessonsDone: 17,
  levelProgress: 68,
  homeworkRate: 87,
  certificates: 4,
};

export const PAYMENTS: Payment[] = [
  { id: "pay-3", date: "2026-07-01", amount: 149, status: "unpaid" },
  { id: "pay-2", date: "2026-04-01", amount: 149, status: "paid" },
  { id: "pay-1", date: "2026-01-01", amount: 59, status: "paid" },
];

// TODO: href-երը և նկարները ճշտիր քո իրական route-երով ու ֆայլերով
export const FAVORITES: Favorite[] = [
  {
    id: "fav-guide-beginner",
    type: "article",
    href: "/blog/course-guides/beginner-armenian",
    image: "/images/past-culture.jpg",
  },
  {
    id: "fav-flashcards",
    type: "resource",
    href: "/blog/resources/everyday-vocabulary-flashcards",
    image: "/images/past-kids.jpg",
    format: "PDF",
  },
  {
    id: "fav-alphabet-chart",
    type: "resource",
    href: "/blog/resources/armenian-alphabet-chart-poster",
    image: "/images/past-community.jpg",
    format: "PDF",
    price: 12,
  },
];

export const CURRENT_COURSE: CurrentCourse = {
  lessonDurationHours: 2,
  startsOn: "2026-09-01",
  endsOn: "2026-12-31",
};

export const LEARNING_PROGRESS: LearningProgress = {
  learning: 68,
  homework: 85,
  attendance: 92,
};

export const UPCOMING_LESSON: UpcomingLesson = {
  startsAt: "2026-07-29T18:00",
  durationMinutes: 60,
  meetUrl: "#", // TODO: իրական Google Meet հղում
};

// TODO: fileUrl-ները փոխարինել backend-ի իրական PDF-երով
export const CERTIFICATES: Certificate[] = [
  { id: "cert-a2", issuedAt: "2026-06-28", fileUrl: "#" },
  { id: "cert-a1", issuedAt: "2026-03-15", fileUrl: "#" },
];