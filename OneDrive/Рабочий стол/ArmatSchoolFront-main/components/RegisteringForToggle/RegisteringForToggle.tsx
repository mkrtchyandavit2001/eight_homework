"use client";

import type { RegisteringFor, RegisteringForToggleProps } from "@/types/types";
import { useLanguage } from "@/context/LanguageContext";


const ORDER: RegisteringFor[] = ["me", "child", "other"];

export default function RegisteringForToggle({ value, onChange }: RegisteringForToggleProps) {
  const { dict } = useLanguage();
  const labels: Record<string, string> = dict?.freeLesson?.steps?.personalInfo?.registeringFor ?? {};

  return (
    <div className="flex items-center  gap-2.5">
      {ORDER.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
              active ? "text-[#F15A22]" : "text-[#666666] hover:text-[#2D2D2D]",
            ].join(" ")}
          >
            {labels[opt] ?? opt}
          </button>
        );
      })}
    </div>
  );
}