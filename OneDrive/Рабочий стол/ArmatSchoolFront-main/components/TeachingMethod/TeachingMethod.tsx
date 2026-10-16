"use client";

import { useLanguage } from "@/context/LanguageContext";

const methodKeys = [
  "assessment",
  "learningPlan",
  "liveLessons",
  "homework",
  "teacherFeedback",
  "progressReports",
  "certification",
] as const;

export function TeachingMethod() {
  const { dict } = useLanguage();
  const t = dict.about.method;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto flex w-full flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="lg:w-[340px] lg:shrink-0">
          <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
          <span className="text-[11px]  font-semibold text-orange-500 uppercase leading-4 tracking-[1.1px] text-primary">
              {t.label}
            </span>
          </div>
          <h2 className="pt-5 text-4xl font-semibold leading-[1.1] tracking-[-1.5px] text-[#2D2D2D] md:text-[44px] md:leading-[48px]">
            {t.title}
          </h2>
          <p className="pt-6 text-base leading-7 text-[#666666]">{t.description}</p>
        </div>

        <ol className="flex-1">
          {methodKeys.map((key, i) => {
            const isLast = i === methodKeys.length - 1;
            return (
              <li key={key} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-orange-500 text-[13px] font-semibold leading-5 text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {!isLast && <div className="my-1 w-px flex-1 bg-[#EDEDED]" />}
                </div>
                <div className="pb-10">
                  <h3 className="pt-1.5 text-[17px] font-semibold leading-[26px] text-[#2D2D2D]">
                    {t.steps[key].title}
                  </h3>
                  <p className="pt-2 text-sm leading-6 text-[#666666]">
                    {t.steps[key].description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}