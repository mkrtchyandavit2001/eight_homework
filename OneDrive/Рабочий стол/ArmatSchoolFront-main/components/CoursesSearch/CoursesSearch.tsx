"use client";

import { CourseSearchIcon } from "../icons/Icons";


interface CoursesSearchProps {
  value: string;
  placeholder: string;
  ariaLabel: string;
  onChange: (value: string) => void;
}

export default function CoursesSearch({
  value,
  placeholder,
  ariaLabel,
  onChange,
}: CoursesSearchProps) {
  return (
    <label className="flex h-[34px] min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-[#EDEDED] bg-white px-3 py-1.5">
      <CourseSearchIcon size={16} className="shrink-0 text-[#AAA]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full bg-transparent text-[13px] leading-4 text-[#2D2D2D] outline-none placeholder:text-[#BBB]"
      />
    </label>
  );
}
