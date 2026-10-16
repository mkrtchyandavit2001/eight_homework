"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useLessons } from "@/hooks/useLessons";
import { MONTH_HOMEWORK_SUBMITTED } from "@/data/dashboardLessons";
import { groupByDay, pad } from "@/lib/calendar";
import DashTopbar from "../DashTopbar/DashTopbar";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import SelectedDayCard from "../SelectedDayCard/SelectedDayCard";
import MonthStats from "../MonthStats/MonthStats";

// TODO: ժամանակավոր՝ Figma-ի "այսօրը"։ Backend-ից հետո՝ new Date()-ից։
const MOCK_TODAY = "2026-07-21";

export default function CalendarView() {
  const { dict } = useLanguage();
  const t = dict.dashboard;
  const lessons = useLessons();

  const [cursor, setCursor] = useState(() => {
    const [y, m] = MOCK_TODAY.split("-").map(Number);
    return { year: y, month: m - 1 };
  });
  const [selectedKey, setSelectedKey] = useState(MOCK_TODAY);

  const byDay = useMemo(() => groupByDay(lessons), [lessons]);
  const lessonDays = useMemo(() => new Set(Object.keys(byDay)), [byDay]);

  const stats = useMemo(() => {
    const prefix = `${cursor.year}-${pad(cursor.month + 1)}`;
    const inMonth = lessons.filter((l) => l.startsAt.startsWith(prefix));
    const done = inMonth.filter((l) => l.status === "completed");
    const scores = done.map((l) => l.score).filter((s): s is number => typeof s === "number");

    return {
      completed: done.length,
      remaining: inMonth.length - done.length,
      avgScore: scores.length
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : null,
    };
  }, [lessons, cursor]);

  const shiftMonth = (delta: number) =>
    setCursor(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  return (
    <div className="flex min-w-0 flex-1 flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <DashTopbar title={t.calendar.title} />

      {/* Տեղավորում ենք օրացույցն ու sidebar-ը կողք կողքի՝ սահմանափակելով լայնությունը */}
      <div className="flex flex-col items-start gap-6 p-5 lg:flex-row">
        <CalendarGrid
          year={cursor.year}
          month={cursor.month}
          todayKey={MOCK_TODAY}
          selectedKey={selectedKey}
          lessonDays={lessonDays}
          onSelect={setSelectedKey}
          onPrev={() => shiftMonth(-1)}
          onNext={() => shiftMonth(1)}
        />

        <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[292px]">
          <SelectedDayCard dateKey={selectedKey} lessons={byDay[selectedKey] ?? []} />
          <MonthStats
            completed={stats.completed}
            remaining={stats.remaining}
            homeworkSubmitted={MONTH_HOMEWORK_SUBMITTED}
            avgScore={stats.avgScore}
          />
        </aside>
      </div>
    </div>
  );
}