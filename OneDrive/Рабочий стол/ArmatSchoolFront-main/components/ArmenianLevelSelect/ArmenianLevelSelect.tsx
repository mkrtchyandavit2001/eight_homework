"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useGetArmenianLevelsQuery } from "@/redux/slices/armenianLevelsSlice/armenianLevelsApi";
import { ChevronDownIcon } from "../icons/Icons";

interface ArmenianLevelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ArmenianLevelSelect({ value, onChange }: ArmenianLevelSelectProps) {
  const { locale, dict } = useLanguage();
  const t = dict?.freeLesson?.steps?.learningInfo?.armenianLevel ?? {};

  // Ստանում ենք մակարդակները բեքենդից
  const { data: levelsResponse, isLoading } = useGetArmenianLevelsQuery(locale || "hy");
  const levels = levelsResponse?.data ?? [];

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Գտնում ենք ընտրված մակարդակի վերնագիրը (title)
  const selectedLevel = levels.find((l) => l.code === value);

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-1.5">
      <label className="text-sm font-medium text-[#2D2D2D]">
        {t.label ?? "Հայերենի իմացության մակարդակ"}
        <span className="text-[#F15A22]"> *</span>
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left",
          open ? "border-[#F15A22] shadow-[0_0_0_2px_rgba(245,130,32,0.2)]" : "border-black/10",
        ].join(" ")}
      >
        <span className={`flex-1 text-sm font-medium ${value ? "text-[#2D2D2D]" : "text-[#C0C0C5]"}`}>
          {isLoading 
            ? "Բեռնվում է..." 
            : selectedLevel 
            ? selectedLevel.title 
            : (t.placeholder ?? "Ընտրեք մակարդակը")}
        </span>
        <ChevronDownIcon className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute top-full z-20 mt-1 w-full overflow-hidden rounded-lg bg-white shadow-lg">
          {isLoading && <p className="px-4 py-3 text-sm text-[#999999]">Բեռնվում է...</p>}
          {!isLoading && levels.map((lvl) => {
            const active = lvl.code === value;
            return (
              <button
                key={lvl.code}
                type="button"
                onClick={() => {
                  onChange(lvl.code); // Պահպանում ենք code-ը (օրինակ՝ "elementary", "can_read_write" և այլն)
                  setOpen(false);
                }}
                className={[
                  "flex w-full items-center justify-between border-b border-[#EDEDED] px-4 py-3 text-left text-sm font-medium last:border-b-0",
                  active ? "bg-[#FFF4EA] text-[#F15A22]" : "text-[#2D2D2D] hover:bg-[#F7F7F7]",
                ].join(" ")}
              >
                {lvl.title}
                {active && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                    <path d="M2.9 7.3 5.7 10 11.1 3.7" stroke="#F15A22" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}