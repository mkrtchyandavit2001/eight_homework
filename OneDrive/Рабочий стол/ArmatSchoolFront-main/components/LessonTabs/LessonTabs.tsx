"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { LessonFilter } from "@/types/dashboard";

interface LessonTabsProps {
  active: LessonFilter;
  counts: { completed: number; upcoming: number };
  onChange: (filter: LessonFilter) => void;
}

export default function LessonTabs({ active, counts, onChange }: LessonTabsProps) {
  const { dict } = useLanguage();
  const tabs = dict.dashboard.lessons.tabs;

  const items: { key: LessonFilter; label: string }[] = [
    { key: "all", label: tabs.all },
    { key: "completed", label: `${tabs.completed} · ${counts.completed}` },
    { key: "upcoming", label: `${tabs.upcoming} · ${counts.upcoming}` },
  ];

  return (
    <div role="tablist" className="flex h-[54px] items-center">
      {items.map(({ key, label }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`h-full whitespace-nowrap border-b-2 px-4 text-[13px] font-semibold leading-5 ${
              isActive
                ? "border-[#F15A22] text-[#F15A22]"
                : "border-transparent text-[#666] hover:text-[#2D2D2D]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}