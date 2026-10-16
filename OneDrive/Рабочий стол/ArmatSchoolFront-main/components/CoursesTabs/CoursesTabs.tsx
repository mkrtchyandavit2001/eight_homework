"use client";

import type { CourseTab } from "@/types/dashboard";


interface CoursesTabsProps {
  value: CourseTab;
  labels: Record<CourseTab, string>;
  onChange: (tab: CourseTab) => void;
}

const ORDER: CourseTab[] = ["other", "mine", "completed"];

export default function CoursesTabs({ value, labels, onChange }: CoursesTabsProps) {
  return (
    <div
      role="tablist"
      className="flex h-10 shrink-0 items-center gap-1 rounded-[10px] border border-[#EDEDED] bg-white p-1"
    >
      {ORDER.map((tab) => {
        const active = tab === value;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab)}
            className={`flex h-[30px] items-center justify-center whitespace-nowrap rounded-[7px] px-3 text-xs font-medium leading-[18px] transition-colors ${
              active ? "bg-[#FEF0EA] text-[#F15A22]" : "text-[#666] hover:bg-[#F7F7F7]"
            }`}
          >
            {labels[tab]}
          </button>
        );
      })}
    </div>
  );
}
