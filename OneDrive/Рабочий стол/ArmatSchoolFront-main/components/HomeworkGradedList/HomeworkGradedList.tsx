"use client";

import { useLanguage } from "@/context/LanguageContext";
import { intlLocaleOf } from "@/lib/calendar";
import { fillTemplate } from "@/lib/homework";
import type { HomeworkItem } from "@/types/dashboard";

interface HomeworkGradedListProps {
  items: HomeworkItem[];
}

export default function HomeworkGradedList({ items }: HomeworkGradedListProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.homework;
  const intlLocale = intlLocaleOf(locale);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${new Intl.DateTimeFormat(intlLocale, { month: "long", day: "numeric" }).format(d)} · ${new Intl.DateTimeFormat(
      intlLocale,
      { hour: "2-digit", minute: "2-digit", hour12: locale !== "hy" }
    ).format(d)}`;
  };

  return (
    <section className="flex flex-col rounded-[22px] border-[0.67px] border-solid border-[#EDEDED] bg-white p-6">
      <div className="flex items-start justify-between border-b-[0.67px] border-solid border-[#EDEDED] pb-2.5">
        <h3 className="text-base font-semibold leading-5 text-[#2D2D2D]">{t.gradedTitle}</h3>
        <span className="text-sm font-medium leading-[21px] text-[#2D2D2D]">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="pt-4 text-[13px] leading-5 text-[#999]">{t.gradedEmpty}</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 py-4 ${
                i < items.length - 1 ? "border-b border-solid border-[#EDEDED]" : ""
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-[13px] font-medium leading-5 text-[#2D2D2D]">{item.title}</p>
                {item.submittedAt && (
                  <p className="text-xs font-medium leading-[18px] text-[#999]">
                    {fillTemplate(t.gradedSubmitted, { date: formatDate(item.submittedAt) })}
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#F0F0F0] px-1.5 py-px text-[10px] leading-[15px] text-[#888]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="shrink-0 text-sm leading-4 text-[#F15A22]">{item.score}/100</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}