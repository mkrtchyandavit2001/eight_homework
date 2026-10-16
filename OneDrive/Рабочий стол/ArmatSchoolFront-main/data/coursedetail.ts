import type { CourseDetailData, CourseSlug, OtherPackageData } from "@/types/course";


const FEATURES: CourseDetailData["features"] = [
  "liveOnline",
  "homework",
  "feedback",
  "materials",
  "progress",
  "certificate",
];

export const courseDetails: Record<CourseSlug, CourseDetailData> = {
  beginner: {
    slug: "beginner",
    heroImage: "/images/beginner-armenian.jpg",
    teacher: "ani",
    studentsEnrolled: 142,
    features: FEATURES,
    moduleLessons: [4, 2, 2, 1, 2, 1],
    price: { current: 128, old: 180 },
    lessonDurationHours: 2,
    lessonsPerWeek: 1,
    courseDurationMonths: 3,
  },
  intermediate: {
    slug: "intermediate",
    heroImage: "/images/intermediate.jpg",
    teacher: "mariam",
    studentsEnrolled: 98,
    features: FEATURES,
    moduleLessons: [3, 3, 2, 2, 1, 1],
    price: { current: 200, old: 250 },
    lessonDurationHours: 2,
    lessonsPerWeek: 1,
    courseDurationMonths: 3,
  },
  advanced: {
    slug: "advanced",
    heroImage: "/images/advanced-armenian.jpg",
    teacher: "narine",
    studentsEnrolled: 210,
    features: FEATURES,
    moduleLessons: [3, 3, 2, 2, 1, 1],
    price: { current: 280, old: 360 },
    lessonDurationHours: 2,
    lessonsPerWeek: 1,
    courseDurationMonths: 3,
  },
};

/**
 * "beginner-2" → "beginner" (courses.ts-ի կրկնօրինակ id-ները),
 * անհայտ slug-ի դեպքում՝ null
 */
export function resolveCourseSlug(raw: string): CourseSlug | null {
  const key = raw.replace(/-\d+$/, "");
  return key in courseDetails ? (key as CourseSlug) : null;
}

export const OTHER_PACKAGES: OtherPackageData[] = [
  { id: "individual", price: 72, image: "/images/individual-lessons.jpg" },
  { id: "groupSmall", price: 48, image: "/images/groupSmall-lessons.jpg" },
  { id: "groupLarge", price: 88, image: "/images/groupLarge-lessons.jpg" },
];

export const TIME_ZONES = [
  "Asia/Yerevan",
  "Europe/Moscow",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
] as const;

export const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

// ---------- Ժամի ընտրության slot-եր (Figma՝ 2-ժամյա քայլ) ----------
export const TIME_STEP_MINUTES = 120; // 60 կամ 30՝ ավելի մանր քայլի համար
const TIME_START_MINUTES = 6 * 60; // 06:00
const TIME_END_MINUTES = 22 * 60; // 22:00

export const TIME_SLOTS: string[] = Array.from(
  { length: (TIME_END_MINUTES - TIME_START_MINUTES) / TIME_STEP_MINUTES + 1 },
  (_, i) => {
    const m = TIME_START_MINUTES + i * TIME_STEP_MINUTES;
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  }
);