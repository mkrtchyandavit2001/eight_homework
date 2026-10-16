"use client";

import { useLanguage } from "@/context/LanguageContext";

const statKeys = ["lessonsDone", "countries", "satisfaction"] as const;

export function Statistics() {
  const { dict } = useLanguage();
  const t = dict.home.stats;

  return (
    <section className="bg-[#F4F4F4] py-12 lg:py-16">
      {/* max-w-7xl-ը և px--ը ապահովում են անհրաժեշտ տարածություն կողքերից */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[11px] font-semibold uppercase leading-4 tracking-[1.1px] text-orange-500">
              {t.sectionLabel}
            </span>
          </div>
          <h2 className="pt-3 text-3xl font-semibold tracking-[-1.5px] text-[#2D2D2D] md:text-4xl lg:text-5xl lg:leading-[60px]">
            {t.heading}
          </h2>
        </div>

        <div className="pt-8">
          <div className="grid overflow-hidden rounded-2xl bg-[#EDEDED] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] md:grid-cols-3">
            {statKeys.map((key, i) => (
              <div
                key={key}
                className={`flex flex-col items-center justify-center bg-white p-8 ${
                  i < statKeys.length - 1
                    ? "border-b border-[#EDEDED] md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <span className="text-4xl font-semibold leading-[60px] tracking-[-1.2px] text-orange-500 md:text-5xl">
                  {t.items[key].value}
                </span>
                <span className="pt-1 text-center text-sm leading-[21px] text-[#666666]">
                  {t.items[key].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}