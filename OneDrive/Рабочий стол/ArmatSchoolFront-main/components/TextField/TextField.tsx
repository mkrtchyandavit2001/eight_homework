"use client";

import type { SettingsIcon } from "@/types/settings";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import FieldLabel from "../FieldLabel/FieldLabel";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
  icon?: SettingsIcon;
  value: string;
  onChange: (value: string) => void;
}

export default function TextField({
  label,
  icon,
  value,
  onChange,
  disabled,
  className = "",
  ...props
}: TextFieldProps) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-3 py-[14px] ${className}`}>
      <FieldLabel htmlFor={id} icon={icon}>
        {label}
      </FieldLabel>
      <input
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[47px] w-full rounded-xl border bg-white px-3 text-[14px] font-medium leading-[21px] outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-[#F15A22] ${
          disabled
            ? "cursor-not-allowed border-[#EDEDED] text-[#999999]"
            : "border-[#EDEDED] text-[#2D2D2D]"
        }`}
        {...props}
      />
    </div>
  );
}
