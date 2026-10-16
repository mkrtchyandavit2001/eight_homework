"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ClockIcon } from "../icons/SocialIcons";
import { TIME_SLOTS, type TimePickerProps } from "@/types/types";
import { useLanguage } from "@/context/LanguageContext";
import { SelectedCheckIcon } from "../icons/BookingIcons";

export default function TimePicker({ value, onChange }: TimePickerProps) {
  const { dict } = useLanguage();
  const t = dict?.freeLesson?.steps?.learningInfo?.timePicker ?? {};

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-1.5">
      <label className="text-sm font-medium text-[#2D2D2D]">{t.label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left",
          open ? "border-[#F15A22] shadow-[0_0_0_2px_rgba(245,130,32,0.2)]" : "border-[#EDEDED]",
        ].join(" ")}
      >
        <ClockIcon />
        <span className={`flex-1 text-sm font-medium ${value ? "text-[#2D2D2D]" : "text-[#C0C0C5]"}`}>
          {value || t.placeholder}
        </span>
        <ChevronDownIcon className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute top-full z-20 mt-1 max-h-[210px] w-full overflow-y-auto rounded-lg border border-black/10 bg-white shadow-lg">
          {TIME_SLOTS.map((slot) => {
            const active = slot === value;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  onChange(slot);
                  setOpen(false);
                }}
                className={[
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium",
                  active ? "bg-[#FFF4EA] text-[#F15A22]" : "text-[#2D2D2D] hover:bg-[#F7F7F7]",
                ].join(" ")}
              >
                {slot}
                {active && <SelectedCheckIcon />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}