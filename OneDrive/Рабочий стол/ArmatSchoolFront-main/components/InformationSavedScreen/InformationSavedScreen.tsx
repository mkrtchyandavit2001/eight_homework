"use client";

import type { InformationSavedScreenProps } from "@/types/types";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleBig, LockIcon } from "../icons/Icons";


export default function InformationSavedScreen({ onOpenCalendly }: InformationSavedScreenProps) {
  const { dict } = useLanguage();
  const t = dict?.freeLesson?.savedScreen ?? {};

  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-[32px] border border-[#EDEDED] bg-white px-10 py-10 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF4EA] text-orange-500">
        <CheckCircleBig />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#2D2D2D]">{t.title}</h2>
        <p className="max-w-[366px] text-sm leading-relaxed text-[#666666]">{t.description}</p>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-[#999999]">
        <LockIcon />
        {t.secureNote}
      </p>

      <button
        type="button"
        onClick={onOpenCalendly}
        className="pt-1 text-base font-semibold text-[#F15A22] hover:opacity-80"
      >
        {t.openNow}
      </button>
    </div>
  );
}