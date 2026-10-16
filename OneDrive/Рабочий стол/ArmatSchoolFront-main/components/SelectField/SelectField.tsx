import { useState, useRef, useEffect } from "react";
import type { SelectFieldProps } from "@/types/types";
import { ChevronDownIcon } from "../icons/Icons";

export default function SelectField({
  label,
  required,
  icon,
  placeholder,
  value,
  options,
  onChange,
  helperText,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Գտնում ենք ընտրված տարբերակի ցուցադրվող անունը (label-ը)
  const selectedOption = options.find((opt) => 
    typeof opt === "object" && opt !== null ? opt.value === value : opt === value
  );
  
  const displayValue = selectedOption 
    ? (typeof selectedOption === "object" ? selectedOption.label : selectedOption) 
    : value;

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-1.5">
      <label className="text-sm font-medium text-[#2D2D2D]">
        {label}
        {required && <span className="text-[#F15A22]"> *</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 rounded-2xl border border-[#EDEDED] bg-white px-4 py-3 text-left"
      >
        {icon}
        <span className={`flex-1 text-sm font-medium ${value ? "text-[#2D2D2D]" : "text-[#C0C0C5]"}`}>
          {displayValue || placeholder}
        </span>
        <ChevronDownIcon className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      {helperText && <p className="pt-1 text-xs text-[#999999]">{helperText}</p>}

      {open && (
        <div className="absolute top-full z-20 mt-1 max-h-52 w-full overflow-y-auto rounded-lg border border-black/10 bg-white shadow-lg">
          {options.map((opt) => {
            const optValue = typeof opt === "object" && opt !== null ? opt.value : opt;
            const optLabel = typeof opt === "object" && opt !== null ? opt.label : opt;
            const isSelected = optValue === value;

            return (
              <button
                key={optValue}
                type="button"
                onClick={() => {
                  onChange(optValue);
                  setOpen(false);
                }}
                className={[
                  "block w-full px-4 py-2.5 text-left text-sm font-medium",
                  isSelected ? "bg-[#FFF4EA] text-[#F15A22]" : "text-[#2D2D2D] hover:bg-[#F7F7F7]",
                ].join(" ")}
              >
                {optLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}