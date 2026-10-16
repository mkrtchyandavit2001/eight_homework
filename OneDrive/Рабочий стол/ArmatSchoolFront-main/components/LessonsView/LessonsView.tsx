"use client";

import { useMemo, useState } from "react";
import { LESSONS } from "@/data/dashboardLessons";
import type { LessonFilter, LessonText, LessonView } from "@/types/dashboard";
import { useLanguage } from "@/context/LanguageContext";
import DashTopbar from "../DashTopbar/DashTopbar";
import LessonTabs from "../LessonTabs/LessonTabs";
import LessonCard from "../LessonCard/LessonCard";
import LessonsPagination from "../LessonsPagination/LessonsPagination";


const PAGE_SIZE = 7;

export default function LessonsView() {
  const { dict } = useLanguage();
  const t = dict.dashboard;
  const [filter, setFilter] = useState<LessonFilter>("all");
  const [page, setPage] = useState(1);

  const lessons: LessonView[] = useMemo(() => {
    const texts = t.items as LessonText[];
    return LESSONS.map((l) => ({
      ...l,
      ...(texts.find((x) => x.id === l.id) as LessonText),
    }));
  }, [t.items]);

  const counts = useMemo(
    () => ({
      completed: lessons.filter((l) => l.status === "completed").length,
      upcoming: lessons.filter((l) => l.status === "upcoming").length,
    }),
    [lessons]
  );

  const filtered = filter === "all" ? lessons : lessons.filter((l) => l.status === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f: LessonFilter) => {
    setFilter(f);
    setPage(1);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col font-[family-name:var(--font-jakarta)]">
      <DashTopbar title={t.lessons.title} />

      <div className="px-2.5 py-5">
        <section className="rounded-[22px] bg-white px-5 pb-6">
          <LessonTabs active={filter} counts={counts} onChange={handleFilter} />

          <div className="flex flex-col gap-4 pt-6">
            {visible.length ? (
              visible.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)
            ) : (
              <p className="py-10 text-center text-[13px] text-[#999]">{t.lessons.empty}</p>
            )}
          </div>

          <LessonsPagination page={page} totalPages={totalPages} onChange={setPage} />
        </section>
      </div>
    </div>
  );
}