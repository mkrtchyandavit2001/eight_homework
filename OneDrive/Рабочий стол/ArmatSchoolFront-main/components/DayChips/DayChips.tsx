"use client";

import { WEEKDAYS, type DayChipsProps, type Weekday } from "@/types/types";
import { useLanguage } from "@/context/LanguageContext";



export default function DayChips({ value, onChange }: DayChipsProps) {
  const { dict } = useLanguage();
  const labels: Record<string, string> = dict?.freeLesson?.steps?.learningInfo?.dayChips?.labels ?? {};

  function toggle(day: Weekday) {
    onChange(value.includes(day) ? value.filter((d) => d !== day) : [...value, day]);
  }

  return (
    <div className="flex flex-col gap-2">
      {WEEKDAYS.map((day) => {
        const active = value.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggle(day)}
            className={[
              "w-[62px] rounded-[18px] border py-2 text-center text-sm font-medium transition-colors",
              active
                ? "border-transparent bg-[#FFF4EA] text-[#F15A22]"
                : "border-[#EDEDED] bg-white text-[#666666] hover:border-[#F15A22]/40",
            ].join(" ")}
          >
            {labels[day] ?? day}
          </button>
        );
      })}
    </div>
  );
}