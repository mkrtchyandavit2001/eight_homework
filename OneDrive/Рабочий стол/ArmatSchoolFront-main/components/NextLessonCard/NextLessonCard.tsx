"use client";

import { useLanguage } from "@/context/LanguageContext";
import { UPCOMING_LESSON } from "@/data/dashboardProfile";
import { intlLocaleOf } from "@/lib/calendar";
import { lessonRange, weekdayDate } from "@/lib/learning";
import { DashCalendarIcon } from "../icons/Icons";

export default function NextLessonCard() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.learning;
  const intlLocale = intlLocaleOf(locale);

  return (
    <section className="flex flex-col rounded-2xl border-[0.67px] border-solid border-[#EDEDED] bg-white p-5">
      <p className="text-xs font-semibold uppercase leading-4 tracking-[0.3px] text-[#999]">
        {t.nextLesson}
      </p>

      <div className="flex items-center gap-3 pt-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-[#F15A22]">
          <DashCalendarIcon size={20} />
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="text-sm font-semibold leading-5 text-[#2D2D2D]">
            {weekdayDate(UPCOMING_LESSON.startsAt, intlLocale, "short")}
          </p>
          <p className="text-xs leading-4 text-[#999]">
            {lessonRange(UPCOMING_LESSON.startsAt, UPCOMING_LESSON.durationMinutes, intlLocale)}
          </p>
        </div>
      </div>
    </section>
  );
}