"use client";

import { useLanguage } from "@/context/LanguageContext";
import { intlLocaleOf } from "@/lib/calendar";
import type { LessonView } from "@/types/dashboard";

interface SelectedDayCardProps {
  dateKey: string;
  lessons: LessonView[];
}

export default function SelectedDayCard({
  dateKey,
  lessons,
}: SelectedDayCardProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard;
  const intlLocale = intlLocaleOf(locale);

  const heading = new Intl.DateTimeFormat(intlLocale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateKey}T00:00`));

  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: locale !== "hy",
    }).format(new Date(iso));

  return (
    <section className="flex flex-col rounded-[22px] border-[0.67px] border-[#EDEDED] bg-white px-4 py-6">
      <h3 className="text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">
        {heading}
      </h3>

      <div className="flex flex-col gap-3 pt-4">
        {lessons.length === 0 ? (
          <p className="text-[13px] leading-5 text-[#999]">
            {t.calendar.noLessons}
          </p>
        ) : (
          lessons.map((lesson) => {
            const upcoming = lesson.status === "upcoming";
            return (
              <article
                key={lesson.id}
                className="rounded-lg py-3 pl-4 pr-4"
                style={{
                  borderLeft: `4px solid ${upcoming ? "#F15A22" : "#DDDDDD"}`,
                }}
              >
                <p className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">
                  {lesson.title}
                </p>
                <p className="pt-0.5 text-xs leading-[18px] text-[#999]">
                  {lesson.teacher} · {formatTime(lesson.startsAt)}
                </p>

                {upcoming && (
                  <div className="pt-3">
                    <button
                      type="button"
                      className="rounded-full px-3 py-1.5 text-xs font-semibold leading-[18px] text-[#F15A22] hover:bg-[#F15A22]/10"
                    >
                      {t.lessons.join}
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
