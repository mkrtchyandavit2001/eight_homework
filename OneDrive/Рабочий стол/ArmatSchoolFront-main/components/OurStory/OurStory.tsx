"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HeartIcon, LightbulbIcon, TargetIcon } from "../icons/Icons";

const pillars = [
  { key: "mission", Icon: TargetIcon },
  { key: "vision", Icon: LightbulbIcon },
  { key: "values", Icon: HeartIcon },
] as const;

export function OurStory() {
  const { dict } = useLanguage();
  const t = dict.about.story;

  return (
    <section className="bg-white py-[60px]">
      <div className="mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
          <span className="text-[11px] font-semibold uppercase leading-4 tracking-[1.1px] text-orange-500">
            {t.label}
          </span>
        </div>

        <div className="flex flex-col gap-10 pt-5 lg:flex-row lg:gap-16">
          <h2 className="flex-1 text-4xl font-semibold leading-[1.1] tracking-[-1.5px] text-[#2D2D2D] md:text-[52px] md:leading-[57px]">
            {t.title}
          </h2>
          <div className="flex flex-1 flex-col justify-center text-[17px] leading-[30px] text-[#666666]">
            <p className="pb-4">{t.p1}</p>
            <p>{t.p2}</p>
          </div>
        </div>

        <div className="grid gap-8 pt-16 md:grid-cols-3">
          {pillars.map(({ key, Icon }) => (
            <article
              key={key}
              className="flex flex-col rounded-3xl border border-[#EDEDED] bg-white p-8"
            >
              {/* Icon-ը և վերնագիրը դրված են մեկ հորիզոնական գծի վրա (items-center) */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                  <Icon className="h-[22px] w-[22px] text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold leading-[30px] text-[#2D2D2D]">
                  {t.pillars[key].title}
                </h3>
              </div>
              
              <p className="pt-6 text-[15px] leading-[25px] text-[#666666]">
                {t.pillars[key].description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}