"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { buildMonth, intlLocaleOf, weekdayLabels } from "@/lib/calendar";
import { DashChevronLeftIcon, DashChevronRightIcon } from "../icons/Icons";

interface CalendarGridProps {
  year: number;
  month: number; // 0-based
  todayKey: string;
  selectedKey: string;
  /** "YYYY-MM-DD" ամսաթվեր, որոնց օրը դաս կա */
  lessonDays: Set<string>;
  onSelect: (key: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarGrid({
  year,
  month,
  todayKey,
  selectedKey,
  lessonDays,
  onSelect,
  onPrev,
  onNext,
}: CalendarGridProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.calendar;
  const intlLocale = intlLocaleOf(locale);

  const cells = useMemo(() => buildMonth(year, month), [year, month]);
  const weekdays = useMemo(() => weekdayLabels(intlLocale), [intlLocale]);
  const title = new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  const navBtn =
    "flex h-8 w-8 items-center justify-center rounded-[22px] text-[#2D2D2D] hover:bg-[#F7F7F7]";

  return (
    <section className="flex flex-1 flex-col self-start rounded-[22px] border-[0.67px] border-[#EDEDED] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b-[0.67px] border-[#EDEDED] px-6 py-5">
        <div className="flex items-center gap-2">
          <button type="button" aria-label={t.prevMonthAria} onClick={onPrev} className={navBtn}>
            <DashChevronLeftIcon size={16} />
          </button>
          <h2 className="min-w-[77px] text-center text-[17px] font-semibold capitalize leading-[26px] text-[#2D2D2D]">
            {title}
          </h2>
          <button type="button" aria-label={t.nextMonthAria} onClick={onNext} className={navBtn}>
            <DashChevronRightIcon size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays + days */}
      <div className="p-5">
        <div className="grid grid-cols-7">
          {weekdays.map((w, i) => (
            <div
              key={i}
              className="flex justify-center py-2 text-[11px] font-semibold uppercase leading-4 text-[#AAA]"
            >
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1 pt-2">
          {cells.map((cell, i) => {
            if (!cell) return <div key={`empty-${i}`} className="h-10" />;

            const isToday = cell.key === todayKey;
            const isSelected = cell.key === selectedKey;
            const hasLesson = lessonDays.has(cell.key);

            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => onSelect(cell.key)}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                className={`mx-auto flex h-10 w-full flex-col items-center justify-center gap-0.5 ${
                  isToday
                    ? "border-b border-[#F15A22] text-sm font-semibold leading-[21px] text-[#F15A22] shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                    : `rounded-[22px] text-xs leading-[18px] text-[#666] hover:bg-[#F7F7F7] ${
                        isSelected ? "bg-[#FFF3EE] font-semibold text-[#F15A22]" : ""
                      }`
                }`}
              >
                <span>{cell.day}</span>
                {hasLesson && !isToday && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F15A22]/60" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 border-t-[0.67px] border-[#EDEDED] px-6 py-4">
        <span className="flex items-center gap-1.5 text-xs leading-[18px] text-[#999]">
          <span className="h-2 w-2 rounded-full bg-[#F15A22]/60" />
          {t.legendScheduled}
        </span>
        <span className="flex items-center gap-1.5 text-xs leading-[18px] text-[#999]">
          <span className="h-2 w-2 rounded-full bg-[#F15A22]" />
          {t.legendToday}
        </span>
      </div>
    </section>
  );
}