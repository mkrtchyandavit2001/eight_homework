"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import DashTopbar from "@/components/DashTopbar/DashTopbar";
import type { CourseItem, CoursesDict, CourseStatus, CourseTab, CourseTypeFilter } from "@/types/dashboard";
import { DASHBOARD_COURSES } from "@/data/dashboardCourses";
import CoursesTabs from "../CoursesTabs/CoursesTabs";
import CoursesSearch from "../CoursesSearch/CoursesSearch";
import CourseTypeSelect from "../CourseTypeSelect/CourseTypeSelect";
import ProfileCourseCard from "../ProfileCourseCard/ProfileCourseCard";


const TAB_STATUS: Record<CourseTab, CourseStatus> = {
  other: "available",
  mine: "enrolled",
  completed: "completed",
};

export default function CoursesView() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.courses as CoursesDict;

  const [tab, setTab] = useState<CourseTab>("other");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<CourseTypeFilter>("all");

  const items = useMemo<CourseItem[]>(() => {
    const texts = new Map(t.items.map((x) => [x.id, x]));
    return DASHBOARD_COURSES.flatMap((c) => {
      const text = texts.get(c.id);
      return text ? [{ ...c, ...text }] : [];
    });
  }, [t.items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((c) => {
      if (c.status !== TAB_STATUS[tab]) return false;
      if (type !== "all" && c.format !== type) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.teacher.toLowerCase().includes(q)
      );
    });
  }, [items, tab, type, query]);

  return (
    <>
      <DashTopbar title={t.title} />

      <main className="flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <CoursesTabs value={tab} labels={t.tabs} onChange={setTab} />
          <CoursesSearch
            value={query}
            placeholder={t.searchPlaceholder}
            ariaLabel={t.searchAria}
            onChange={setQuery}
          />
          <CourseTypeSelect
            value={type}
            labels={t.types}
            ariaLabel={t.typeAria}
            onChange={setType}
          />
        </div>

        {visible.length === 0 ? (
          <p className="py-10 text-center text-[13px] text-[#999]">{t.empty}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((course) => (
              <ProfileCourseCard key={course.id} course={course} t={t} locale={locale} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
