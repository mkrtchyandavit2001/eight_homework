"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CURRENT_COURSE } from "@/data/dashboardProfile";
import { intlLocaleOf } from "@/lib/calendar";
import { fillTemplate } from "@/lib/homework";
import { monthYear } from "@/lib/learning";
import SectionCard from "../SectionCard/SectionCard";

export default function CurrentLearningCard() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.learning;
  const intlLocale = intlLocaleOf(locale);

  const items = [
    { label: t.currentCourse, value: t.courseValue },
    { label: t.teacher, value: t.teacherName },
    {
      label: t.lessonDuration,
      value: fillTemplate(t.hours, { n: CURRENT_COURSE.lessonDurationHours }),
    },
    {
      label: t.courseDuration,
      value: `${monthYear(CURRENT_COURSE.startsOn, intlLocale)} — ${monthYear(
        CURRENT_COURSE.endsOn,
        intlLocale
      )}`,
    },
  ];

  return (
    <SectionCard title={t.title}>
      <dl className="grid gap-x-6 gap-y-4 p-6 sm:grid-cols-2">
        {items.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-xs font-medium uppercase leading-4 tracking-[0.3px] text-[#999]">
              {label}
            </dt>
            <dd className="text-sm font-medium leading-5 text-[#2D2D2D]">{value}</dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}