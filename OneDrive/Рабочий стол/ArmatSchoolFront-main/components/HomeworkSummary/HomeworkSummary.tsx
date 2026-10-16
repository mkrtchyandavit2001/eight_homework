"use client";

import { useLanguage } from "@/context/LanguageContext";

interface HomeworkSummaryProps {
  pending: number;
  submitted: number;
  graded: number;
  /** null — եթե դեռ ոչինչ չի հանձնվել */
  onTimeRate: number | null;
}

export default function HomeworkSummary({ pending, submitted, graded, onTimeRate }: HomeworkSummaryProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.homework;

  const rows = [
    { label: t.summary.pending, value: String(pending) },
    { label: t.summary.submitted, value: String(submitted) },
    { label: t.summary.graded, value: String(graded) },
    { label: t.summary.onTime, value: onTimeRate === null ? "—" : `${onTimeRate}%` },
  ];

  return (
    <section className="flex flex-col rounded-[22px] border-[0.67px] border-solid border-[#EDEDED] bg-white p-6">
      <h3 className="text-base font-semibold leading-[22px] text-[#2D2D2D]">{t.summaryTitle}</h3>

      <dl className="flex flex-col pt-4">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex items-start justify-between py-2.5 ${
              i < rows.length - 1 ? "border-b-[0.67px] border-solid border-[#EDEDED]" : ""
            }`}
          >
            <dt className="text-[13px] leading-5 text-[#666]">{label}</dt>
            <dd className="text-[13px] font-medium leading-5 text-[#2D2D2D]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}