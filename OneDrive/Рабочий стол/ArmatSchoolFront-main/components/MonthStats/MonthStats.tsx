"use client";

import { useLanguage } from "@/context/LanguageContext";

interface MonthStatsProps {
  completed: number;
  remaining: number;
  homeworkSubmitted: number;
  /** null — եթե ավարտված դաս չկա */
  avgScore: number | null;
}

export default function MonthStats({
  completed,
  remaining,
  homeworkSubmitted,
  avgScore,
}: MonthStatsProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.calendar;

  const rows = [
    { label: t.stats.completed, value: String(completed) },
    { label: t.stats.remaining, value: String(remaining) },
    { label: t.stats.homework, value: String(homeworkSubmitted) },
    { label: t.stats.avgScore, value: avgScore === null ? "—" : `${avgScore}%` },
  ];

  return (
    <section className="flex flex-col rounded-[22px] border-[0.67px] border-[#EDEDED] bg-white p-6">
      <h3 className="text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">{t.thisMonth}</h3>

      <dl className="flex flex-col pt-4">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex items-start justify-between py-2.5 ${
              i < rows.length - 1 ? "border-b-[0.67px] border-[#EDEDED]" : ""
            }`}
          >
            <dt className="text-[13px] leading-5 text-[#666]">{label}</dt>
            <dd className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}