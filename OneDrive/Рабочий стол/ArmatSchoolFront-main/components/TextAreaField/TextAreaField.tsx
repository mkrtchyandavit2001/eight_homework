"use client";

import { useId } from "react";

interface TextAreaFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  rows?: number;
}

export default function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
  rows = 2,
}: TextAreaFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-[12px] font-semibold uppercase leading-[18px] tracking-[1.2px] text-[#999999]"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full resize-none rounded-[14px] border border-[#EDEDED] bg-[#F7F7F7] p-4 text-[14px] leading-[23px] text-[#2D2D2D] outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-[#F15A22] focus:bg-white"
      />
    </div>
  );
}
