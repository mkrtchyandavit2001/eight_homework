import type { CourseFormat, CourseLevel, CoursesDict } from "@/types/dashboard";
import type { ReactNode } from "react";
import {
  CourseBookIcon,
  CourseLevelIcon,
  CourseMapPinIcon,
  CourseMonitorIcon,
} from "../icons/Icons";

interface CourseMetaProps {
  lessons: number;
  level: CourseLevel;
  format: CourseFormat;
  t: CoursesDict;
}

function MetaItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 first:pl-0">
      <span className="flex shrink-0 items-center justify-center text-[#F15A22]">{icon}</span>
      <span className="text-[10px] leading-[15px] text-black">{label}</span>
    </div>
  );
}

export default function ProfileCourseMeta({ lessons, level, format, t }: CourseMetaProps) {
  // online → desktop-mac-outline (monitor), offline → map pin
  const FormatIcon = format === "online" ? CourseMonitorIcon : CourseMapPinIcon;

  return (
    <div className="flex items-center divide-x divide-[#EDEDED]">
      {/* Lessons → tabler:book */}
      <MetaItem
        icon={<CourseBookIcon size={16} />}
        label={t.lessons.replace("{count}", String(lessons))}
      />
      {/* Level → ooui:level-none-ltr */}
      <MetaItem icon={<CourseLevelIcon size={12} />} label={t.levels[level]} />
      {/* Format → material-symbols-light:desktop-mac-outline */}
      <MetaItem icon={<FormatIcon size={16} />} label={t.formats[format]} />
    </div>
  );
}