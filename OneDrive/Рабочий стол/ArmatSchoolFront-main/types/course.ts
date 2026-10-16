export interface Course {
  id: string;
  image?: string;
  title: string;
  description: string;
  lessons: string;
  level: string;
  format: string;
  price: string;
  oldPrice?: string;
  href: string;
}

// ---------- Ընդհանուր ----------
export type CourseSlug = "beginner" | "intermediate" | "advanced";
export type TeacherKey = "ani" | "mariam" | "narine";

export type DayKey =
  | "monday" | "tuesday" | "wednesday" | "thursday"
  | "friday" | "saturday" | "sunday";

export type FeatureKey =
  | "liveOnline" | "homework" | "feedback"
  | "materials" | "progress" | "certificate";

export type PackageId = "individual" | "groupSmall" | "groupLarge";

export interface TimeRange {
  from: string; // "16:00"
  to: string; // "20:00"
}
export type SchedulePreferences = Partial<Record<DayKey, TimeRange>>;

// ---------- Static data (չթարգմանվող, յուրաքանչյուր դասընթացի համար) ----------
export interface CourseDetailData {
  slug: CourseSlug;
  heroImage: string;
  /** dict.teachers.items[teacher] */
  teacher: TeacherKey;
  studentsEnrolled: number;
  features: FeatureKey[];
  /** Յուրաքանչյուր module-ի դասերի քանակը (dictionary-ի modules-ի հերթականությամբ) */
  moduleLessons: number[];
  price: { current: number; old: number };
  lessonDurationHours: number;
  lessonsPerWeek: number;
  courseDurationMonths: number;
}

export interface OtherPackageData {
  id: PackageId;
  price: number;
  image: string;
}

// ---------- Գոյություն ունեցող dictionary-ից վերցվող shape-եր ----------
export interface TeacherDict {
  name: string;
  role: string;
  experience: string;
  image: string;
}

export interface CourseMetaDict {
  title: string;
  level: string;
  format: string;
}

// ---------- Նոր dictionary (courseDetail) ----------
export interface ModuleText {
  title: string;
  description: string;
}

export interface CourseText {
  subtitle: string;
  description: string;
  modules: ModuleText[];
}

export interface CourseDetailDictionary {
  badge: string;
  category: string;
  /** "{count} students enrolled" */
  studentsEnrolled: string;
  features: Record<FeatureKey, string>;
  instructor: {
    label: string;
    experienceLabel: string;
    languageLabel: string;
    languageValue: string;
    certified: string;
  };
  units: {
    hourOne: string; // "{count} Hour"
    hourOther: string;
    monthOne: string;
    monthOther: string;
  };
  learn: {
    heading: string;
    /** "{lessons} Lessons · {hours}h total" */
    metaOne: string;
    metaOther: string;
  };
  pricing: {
    individualLesson: string;
    certificateValue: string;
    facts: {
      lessonDuration: string;
      courseDuration: string;
      lessonsPerWeek: string;
      totalLessons: string;
      level: string;
      language: string;
      format: string;
      lessonFormat: string;
      certificate: string;
    };
  };
  schedule: {
    title: string;
    description: string;
    preferredDays: string;
    from: string;
    to: string;
    timeZone: string;
    timeZoneNote: string;
    removeDay: string;
    days: Record<DayKey, string>;
  };
  promo: { label: string; placeholder: string };
  enroll: string;
  other: {
    heading: string;
    packages: Record<PackageId, { tag: string; title: string }>;
  };
  /** Դասընթացի յուրահատուկ տեքստերը */
  courses: Record<CourseSlug, CourseText>;
}