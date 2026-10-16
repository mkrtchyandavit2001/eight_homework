"use client";

import type { CourseItem, CoursesDict } from "@/types/dashboard";
import { useState } from "react";
import CourseImage from "../CourseImage/CourseImage";
import { CourseChevronDownIcon } from "../icons/Icons";
import CourseExpandedPanel from "../CourseExpandedPanel/CourseExpandedPanel";
import ProfileCourseMeta from "../ProfileCourseMeta/ProfileCourseMeta";
import ProfileCoursePrice from "../ProfileCoursePrice/ProfileCoursePrice";


interface CourseCardProps {
  course: CourseItem;
  t: CoursesDict;
  locale: string;
  defaultExpanded?: boolean;
}

function formatMonth(ym: string, locale: string): string {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "hy" ? "hy-AM" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, 1));
}

export default function ProfileCourseCard({ course, t, locale, defaultExpanded = false }: CourseCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const schedule = t.scheduleValue
    .replace("{start}", formatMonth(course.startMonth, locale))
    .replace("{end}", formatMonth(course.endMonth, locale))
    .replace("{hours}", String(course.hoursPerLesson));

  return (
    <article className="flex flex-col rounded-2xl border border-[#EDEDED] bg-white px-4">
      <div className="flex items-center py-4 max-md:flex-col max-md:items-stretch max-md:gap-4">
        <CourseImage src={course.image} alt={course.title} />

        <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-5 max-md:px-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-start gap-0.5">
              <h2 className="min-w-0 flex-1 text-base font-semibold leading-[30px] tracking-[-0.5px] text-[#2D2D2D]">
                {course.title}
              </h2>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls={`course-panel-${course.id}`}
                aria-label={expanded ? t.collapseAria : t.expandAria}
                className="flex h-7 w-6 items-center justify-center pt-1 text-[#999] hover:text-[#F15A22]"
              >
                <CourseChevronDownIcon
                  size={16}
                  className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div className="border-b border-[#EDEDED] py-2.5">
              <p className="text-xs leading-[18px] text-[#2D2D2D]">{course.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1.5 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <ProfileCourseMeta
              lessons={course.lessons}
              level={course.level}
              format={course.format}
              t={t}
            />
            <ProfileCoursePrice price={course.price} oldPrice={course.oldPrice} />
          </div>
        </div>
      </div>

      {expanded && (
        <CourseExpandedPanel
          id={course.id}
          about={course.about}
          teacher={course.teacher}
          schedule={schedule}
          t={t}
        />
      )}
    </article>
  );
}
