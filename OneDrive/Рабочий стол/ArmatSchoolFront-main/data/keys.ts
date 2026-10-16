import { HeartIcon, LightbulbIcon, TargetIcon } from "@/components/icons/AboutIcons";
import type { IconComponent, PillarKey, StatKey, TeacherKey, TestimonialKey } from "@/types/about";


// Content lives in the dictionaries; only ordering and non-text config lives here.
export const pillarIcons: Record<PillarKey, IconComponent> = {
  mission: TargetIcon,
  vision: LightbulbIcon,
  values: HeartIcon,
};
export const pillarKeys: PillarKey[] = ["mission", "vision", "values"];

export const methodKeys = [
  "assessment", "learningPlan", "liveLessons", "homework",
  "teacherFeedback", "progressReports", "certification",
] as const;

export const statKeys: StatKey[] = ["lessonsDone", "countries", "satisfaction"];
export const teacherKeys: TeacherKey[] = ["ani", "mariam", "narine"];
export const testimonialKeys: TestimonialKey[] = ["sarah", "armen", "lena"];
