"use client";

import { useLanguage } from "@/context/LanguageContext";
import { UPCOMING_LESSON } from "@/data/dashboardProfile";
import { intlLocaleOf } from "@/lib/calendar";
import { lessonRange, weekdayDate } from "@/lib/learning";
import SectionCard from "../SectionCard/SectionCard";
import { DashCalendarIcon } from "../icons/Icons";

export default function UpcomingLessonCard() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.learning;
  const intlLocale = intlLocaleOf(locale);

  return (
    <SectionCard title={t.upcomingTitle}>
      <div className="flex items-center gap-4 p-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-[#F15A22]">
          <DashCalendarIcon size={24} />
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="text-base font-semibold leading-6 text-[#2D2D2D]">
            {weekdayDate(UPCOMING_LESSON.startsAt, intlLocale, "long")}
          </p>
          <p className="text-sm leading-5 text-[#999]">
            {lessonRange(UPCOMING_LESSON.startsAt, UPCOMING_LESSON.durationMinutes, intlLocale)} ·{" "}
            {t.meetSuffix}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}