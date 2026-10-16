"use client";

import type { AllSetScreenProps } from "@/types/types";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleBig } from "../icons/Icons";


export default function AllSetScreen({ dateLabel, timeLabel, onReturnHome }: AllSetScreenProps) {
  const { dict } = useLanguage();
  const t = dict?.freeLesson?.allSet ?? {};

  return (
    <div className="flex w-full flex-col items-center gap-0 rounded-[32px] border border-[#EDEDED] bg-white px-10 py-10 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF4EA] text-orange-500">
        <CheckCircleBig />
      </div>

      <h2 className="pt-6 text-[28px] font-semibold text-[#2D2D2D]">{t.title}</h2>

      <div className="mt-3 mb-6 flex w-full max-w-[480px] flex-col items-center gap-1 rounded-2xl border border-[#EDEDED] bg-[#F7F7F7] px-5 py-5">
        <p className="text-[15px] font-semibold text-[#2D2D2D]">
          {dateLabel} · {timeLabel}
        </p>
        <p className="text-[13px] text-[#999999]">{t.duration}</p>
      </div>

      <button
        type="button"
        onClick={onReturnHome}
        className="w-full max-w-[480px] rounded-lg py-4 text-base font-semibold text-[#F15A22] hover:opacity-80"
      >
        {t.returnHome}
      </button>
    </div>
  );
}