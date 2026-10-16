"use client";

import { useLanguage } from "@/context/LanguageContext";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FILTER_KEYS = [
  "all",
  "free",
  "paid",
  "worksheets",
  "grammar",
  "literature",
  "alphabet",
  "audio",
  "video",
  "forChildren",
  "forParents",
] as const;

export default function FilterTabs({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  const { dict } = useLanguage();
  const labels = (dict.blog.resources as { filters?: Record<string, string> })
    .filters;

  return (
    <div
      className="
        flex w-full gap-3 overflow-x-auto
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {FILTER_KEYS.map((key) => {
        const isActive = activeFilter === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-[#E5E5E5] bg-white text-[#F15A22] shadow-sm"
                : "border-[#E5E5E5] bg-white text-[#2D2D2D]  hover:text-[#F15A22]"
            }`}
          >
            {labels?.[key] ?? key}
          </button>
        );
      })}
    </div>
  );
}