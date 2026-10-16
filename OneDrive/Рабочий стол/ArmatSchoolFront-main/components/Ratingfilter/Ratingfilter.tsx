"use client";

import type { RatingFilterProps, RatingFilterValue } from "@/types/types";


export default function RatingFilter({
  value,
  onChange,
  allLabel,
  options = [5, 4, 3, 2, 1],
}: RatingFilterProps) {
  const items: { key: RatingFilterValue; label: string }[] = [
    { key: "all", label: allLabel },
    ...options.map((n) => ({ key: n as RatingFilterValue, label: `${n} ★` })),
  ];

  return (
    <div className="mt-8 self-stretch overflow-x-auto rounded-2xl bg-surface p-4" role="tablist">
      <div className="flex gap-2">
        {items.map((item) => {
          const active = value === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(item.key)}
              className={
                active
                  ? "h-9 whitespace-nowrap rounded-full text-orange-500 bg-white px-5 text-[13px] font-medium leading-5 text-brand shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                  : "h-9 whitespace-nowrap rounded-lg px-4 text-[13px] font-medium leading-5 text-muted transition-colors hover:text-ink"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}