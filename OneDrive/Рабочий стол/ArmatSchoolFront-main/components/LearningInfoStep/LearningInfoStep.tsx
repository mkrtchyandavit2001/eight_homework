"use client";

import type { FreeLessonFormData, LearningInfoStepProps } from "@/types/types";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/SocialIcons";
import ArmenianLevelSelect from "../ArmenianLevelSelect/ArmenianLevelSelect";
import TimePicker from "../TimePicker/TimePicker";
import DayChips from "../DayChips/DayChips";
import { useLanguage } from "@/context/LanguageContext";
import { BookIcon } from "../icons/ResoursesIcon";

export default function LearningInfoStep({ data, onChange, onBack, onSubmit }: LearningInfoStepProps) {
  const { dict } = useLanguage();
  const t = dict?.freeLesson?.steps?.learningInfo ?? {};

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex w-full flex-col gap-8 rounded-[32px] border border-[#EDEDED] bg-white p-10 shadow-sm"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 self-start text-base font-bold text-[#999999] hover:text-[#F15A22]"
      >
        <ArrowLeftIcon />
        {t.back}
      </button>

      <section className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEE8CF]">
          <BookIcon />
        </span>
        <h3 className="text-base font-bold text-[#2D2D2D]">{t.heading}</h3>
      </section>

      <ArmenianLevelSelect
        value={data.armenianLevel}
        onChange={(armenianLevel) => onChange({ armenianLevel })}
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex-1">
          <TimePicker value={data.preferredTime} onChange={(preferredTime) => onChange({ preferredTime })} />
        </div>
        <DayChips
          value={data.preferredDays}
          onChange={(preferredDays) => onChange({ preferredDays })}
        />
      </div>

      <section className="flex flex-col gap-5">
        <div>
          <h3 className="text-base font-bold text-[#2D2D2D]">{t.additionalInfoTitle}</h3>
          <p className="pt-0.5 text-xs text-[#666666]">{t.additionalInfoSubtitle}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#2D2D2D]">
            {t.disabilitiesLabel}
          </label>
          <textarea
            rows={3}
            value={data.learningDisabilities}
            onChange={(e) => onChange({ learningDisabilities: e.target.value })}
            placeholder={t.disabilitiesPlaceholder}
            className="w-full resize-none rounded-2xl border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:border-[#F15A22] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#2D2D2D]">{t.otherNotesLabel}</label>
          <textarea
            rows={3}
            value={data.otherNotes}
            onChange={(e) => onChange({ otherNotes: e.target.value })}
            placeholder={t.otherNotesPlaceholder}
            className="w-full resize-none rounded-2xl border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:border-[#F15A22] focus:outline-none"
          />
        </div>
      </section>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-base font-bold text-[#F15A22] transition-opacity hover:opacity-80"
      >
        {t.continue}
        <ArrowRightIcon />
      </button>
    </form>
  );
}