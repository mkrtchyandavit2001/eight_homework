import type { ComponentType, SVGProps } from "react";

export type DashIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export const PROFILE_SECTIONS = [
  "lessons",
  "calendar",
  "homework",
  "materials",
  "messages",
  "courses",
  "profile",
  "settings",
] as const;

export type ProfileSlug = (typeof PROFILE_SECTIONS)[number];

export type LessonStatus = "completed" | "upcoming";
export type LessonFilter = "all" | LessonStatus;

/** Տվյալներ (լեզվից անկախ) */
export interface Lesson {
  id: string;
  status: LessonStatus;
  /** Local ISO without timezone, e.g. "2026-07-07T10:00" */
  startsAt: string;
  score?: number;
}

/** Թարգմանվող տեքստեր (dict.dashboard.items) */
export interface LessonText {
  id: string;
  title: string;
  teacher: string;
  feedback?: string;
}

export type LessonView = Lesson & LessonText;

export type DashNavKey =
  | "myLessons"
  | "calendar"
  | "homework"
  | "materials"
  | "messages"
  | "courses"
  | "profile"
  | "settings";

export interface DashNavItem {
  key: DashNavKey;
  path: ProfileSlug;
  icon: DashIcon;
  hasDot?: boolean;
}

export interface CalendarCell {
  day: number;
  /** "YYYY-MM-DD" */
  key: string;
}

export type HomeworkStatus = "pending" | "submitted" | "graded" | "overdue" | "retry";
export type HomeworkType = "writing" | "vocabulary" | "grammar" | "reading";

/** Տվյալներ (լեզվից անկախ) */
export interface Homework {
  id: string;
  type: HomeworkType;
  status: HomeworkStatus;
  /** Local ISO without timezone, e.g. "2026-07-21T23:59" */
  assignedAt: string;
  deadlineAt: string;
  submittedAt?: string;
  /** 0–100 */
  score?: number;
}

/** Թարգմանվող տեքստեր (dict.dashboard.homework.items) */
export interface HomeworkText {
  id: string;
  title: string;
  instructions: string;
  tags: string[];
  feedback?: string;
}

export type HomeworkItem = Homework & HomeworkText;

export interface HomeworkSubmission {
  text: string;
  files: File[];
}

export interface Material {
  id: string;
  unit: number;
  size: { value: number; unit: "MB" | "KB" };
  /** Առաջին քարտը՝ նարնջագույն եզրագծով */
  highlighted?: boolean;
  viewUrl: string;
  videoUrl?: string;
  exerciseUrl?: string;
}

/** Թարգմանվող տեքստեր (dict.dashboard.materials.items) */
export interface MaterialText {
  id: string;
  title: string;
  teacher: string;
}

export type MaterialItem = Material & MaterialText;


export type MessagesTab = "teacher" | "updates";

/** Չաթի հաղորդագրություն (backend-ի տվյալ, չի թարգմանվում) */
export interface ChatMessage {
  id: string;
  from: "teacher" | "student";
  /** Local ISO without timezone, e.g. "2026-07-20T15:45" */
  sentAt: string;
  text: string;
  attachments?: string[];
}

export interface UpdateEntry {
  id: string;
  sentAt: string;
}

/** Թարգմանվող տեքստեր (dict.dashboard.messages.updates.items) */
export interface UpdateText {
  id: string;
  title: string;
  body: string;
}

export type UpdateItem = UpdateEntry & UpdateText;


export type CourseTab = "other" | "mine" | "completed";
export type CourseStatus = "available" | "enrolled" | "completed";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseFormat = "online" | "offline";
export type CourseTypeFilter = "all" | CourseFormat;

/** Տվյալներ (լեզվից անկախ) */
export interface Course {
  id: string;
  status: CourseStatus;
  level: CourseLevel;
  format: CourseFormat;
  lessons: number;
  /** Current price in USD */
  price: number;
  /** Old (crossed out) price in USD */
  oldPrice?: number;
  /** "YYYY-MM" */
  startMonth: string;
  /** "YYYY-MM" */
  endMonth: string;
  hoursPerLesson: number;
  image: string;
}

/** Թարգմանվող տեքստեր (dict.dashboard.courses.items) */
export interface CourseText {
  id: string;
  title: string;
  description: string;
  about: string;
  teacher: string;
}

export type CourseItem = Course & CourseText;

/** dict.dashboard.courses */
export interface CoursesDict {
  title: string;
  tabs: Record<CourseTab, string>;
  searchPlaceholder: string;
  searchAria: string;
  types: Record<CourseTypeFilter, string>;
  typeAria: string;
  levels: Record<CourseLevel, string>;
  formats: Record<CourseFormat, string>;
  lessons: string; // "{count} Lessons"
  aboutCourse: string;
  teacher: string;
  schedule: string;
  scheduleValue: string; // "{start} – {end} · {hours} hr / lesson"
  expandAria: string;
  collapseAria: string;
  empty: string;
  items: CourseText[];
}


export type ProfileTab = "learning" | "certificates" | "payments" | "favorites";

export type PaymentStatus = "paid" | "unpaid";

export interface Payment {
  id: string;
  /** "YYYY-MM-DD" */
  date: string;
  amount: number;
  status: PaymentStatus;
}

/** Թարգմանվող տեքստեր (dict.dashboard.profile.payments.items) */
export interface PaymentText {
  id: string;
  title: string;
}

export type PaymentItem = Payment & PaymentText;

export type FavoriteType = "course" | "event" | "article" | "resource";
export type FavoriteFilter = "all" | FavoriteType;

export interface Favorite {
  id: string;
  type: FavoriteType;
  href: string;
  image: string;
  format?: string;
  price?: number;
}

export interface FavoriteText {
  id: string;
  title: string;
  description: string;
  category: string;
  level?: string;
  age?: string;
}

export type FavoriteItem = Favorite & FavoriteText;

export interface ProfileStats {
  lessonsDone: number;
  levelProgress: number;
  homeworkRate: number;
  certificates: number;
}

export interface CurrentCourse {
  lessonDurationHours: number;
  /** "YYYY-MM-DD" */
  startsOn: string;
  endsOn: string;
}

export interface LearningProgress {
  learning: number;
  homework: number;
  attendance: number;
}

export interface UpcomingLesson {
  /** Local ISO without timezone, e.g. "2026-07-29T18:00" */
  startsAt: string;
  durationMinutes: number;
  meetUrl: string;
}

export interface Certificate {
  id: string;
  /** "YYYY-MM-DD" */
  issuedAt: string;
  fileUrl: string;
}

/** Թարգմանվող տեքստեր (dict.dashboard.profile.certificates.items) */
export interface CertificateText {
  id: string;
  title: string;
}

export type CertificateItem = Certificate & CertificateText;