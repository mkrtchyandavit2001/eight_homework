"use client";

import type { AdditionalInfoSectionProps } from "@/types/types";
import ArmenianLevelSelect from "../ArmenianLevelSelect/ArmenianLevelSelect";
import { useLanguage } from "@/context/LanguageContext";



export default function AdditionalInfoSection({ data, onChange, isForMe }: AdditionalInfoSectionProps) {
  const { dict } = useLanguage();
  const tLearning = dict?.freeLesson?.steps?.learningInfo ?? {};

  return (
    <section className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-semibold text-[#2D2D2D]">{tLearning.additionalInfoTitle}</h3>
        <p className="pt-0.5 text-xs text-[#666666]">{tLearning.additionalInfoSubtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        {isForMe ? (
          // 1-ից ուղիղ 3-րդ քայլ՝ ընտրում ենք հայերենի մակարդակը
          <ArmenianLevelSelect
            value={data.armenianLevel}
            onChange={(armenianLevel) => onChange({ armenianLevel })}
          />
        ) : (
          // Students քայլով անցած դեպքում՝ նախկին դաշտը
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium leading-5 text-[#2D2D2D]">
              {tLearning.disabilitiesLabel}
            </label>
            <textarea
              rows={3}
              value={data.learningDisabilities}
              onChange={(e) => onChange({ learningDisabilities: e.target.value })}
              placeholder={tLearning.disabilitiesPlaceholder}
              className="w-full resize-none rounded-2xl border border-[#EDEDED] bg-white px-4 py-3 text-sm leading-5 text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:border-[#F15A22] focus:outline-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-[#2D2D2D]">{tLearning.otherNotesLabel}</label>
          <textarea
            rows={3}
            value={data.otherNotes}
            onChange={(e) => onChange({ otherNotes: e.target.value })}
            placeholder={tLearning.otherNotesPlaceholder}
            className="w-full resize-none rounded-2xl border border-[#EDEDED] bg-white px-4 py-3 text-sm leading-5 text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:border-[#F15A22] focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
}