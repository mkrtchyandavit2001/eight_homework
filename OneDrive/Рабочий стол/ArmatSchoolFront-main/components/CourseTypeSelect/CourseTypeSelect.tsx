"use client";

import type { CourseTypeFilter } from "@/types/dashboard";
import { useEffect, useRef, useState } from "react";
import { CourseChevronDownIcon } from "../icons/Icons";


interface CourseTypeSelectProps {
  value: CourseTypeFilter;
  labels: Record<CourseTypeFilter, string>;
  ariaLabel: string;
  onChange: (value: CourseTypeFilter) => void;
}

const OPTIONS: CourseTypeFilter[] = ["all", "online", "offline"];

export default function CourseTypeSelect({
  value,
  labels,
  ariaLabel,
  onChange,
}: CourseTypeSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-2 rounded-lg border border-[#EDEDED] bg-white px-[13px] text-xs font-medium leading-[18px] text-[#444]"
      >
        <span>{labels[value]}</span>
        <CourseChevronDownIcon
          size={16}
          className={`text-[#AAA] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[36px] z-10 min-w-full overflow-hidden rounded-lg border border-[#EDEDED] bg-white py-1 shadow-md"
        >
          {OPTIONS.map((opt) => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium ${
                  opt === value ? "text-[#F15A22]" : "text-[#444] hover:bg-[#F7F7F7]"
                }`}
              >
                {labels[opt]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
