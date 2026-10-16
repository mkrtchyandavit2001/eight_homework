import type { CourseDetailData, CourseDetailDictionary } from "@/types/course";
import { interpolate } from "./format";

export type FactKey =
  | "lessonDuration" | "courseDuration" | "lessonsPerWeek" | "totalLessons"
  | "level" | "language" | "format" | "lessonFormat" | "certificate";

export interface Fact {
  label: string;
  value: string;
}

/** Դասընթացի "facts"-երը՝ օգտագործվում են և sidebar-ում, և InfoTiles-ում */
export function buildCourseFacts(
  t: CourseDetailDictionary,
  data: CourseDetailData,
  level: string,
  format: string,
  totalLessons: number
): Record<FactKey, Fact> {
  const l = t.pricing.facts;
  const u = t.units;
  const h = data.lessonDurationHours;
  const m = data.courseDurationMonths;

  return {
    lessonDuration: { label: l.lessonDuration, value: interpolate(h === 1 ? u.hourOne : u.hourOther, { count: h }) },
    courseDuration: { label: l.courseDuration, value: interpolate(m === 1 ? u.monthOne : u.monthOther, { count: m }) },
    lessonsPerWeek: { label: l.lessonsPerWeek, value: String(data.lessonsPerWeek) },
    totalLessons: { label: l.totalLessons, value: String(totalLessons) },
    level: { label: l.level, value: level },
    language: { label: l.language, value: t.instructor.languageValue },
    format: { label: l.format, value: format },
    lessonFormat: { label: l.lessonFormat, value: format },
    certificate: { label: l.certificate, value: t.pricing.certificateValue },
  };
}