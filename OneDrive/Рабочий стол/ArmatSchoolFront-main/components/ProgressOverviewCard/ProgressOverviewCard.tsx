"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LEARNING_PROGRESS } from "@/data/dashboardProfile";
import SectionCard from "../SectionCard/SectionCard";

export default function ProgressOverviewCard() {
  const { dict } = useLanguage();
  const t = dict.dashboard.profile.learning;

  const rows = [
    { label: t.learningProgress, value: LEARNING_PROGRESS.learning, color: "#F15A22" },
    { label: t.homeworkCompletion, value: LEARNING_PROGRESS.homework, color: "#F26438" },
    { label: t.attendanceRate, value: LEARNING_PROGRESS.attendance, color: "#ED805F" },
  ];

  return (
    <SectionCard title={t.progressTitle}>
      <div className="flex flex-col gap-5 p-6">
        {rows.map(({ label, value, color }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium leading-5 text-[#2D2D2D]">{label}</span>
              <span className="text-sm font-semibold leading-5" style={{ color }}>
                {value}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={label}
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 w-full overflow-hidden rounded-full bg-[#F4F4F4]"
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${value}%`, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}