"use client";

import { useLanguage } from "@/context/LanguageContext";
import React from "react";

export default function StatsSection() {
  const { dict } = useLanguage();
  const t = dict.home.stats;

  const stats = [
    { key: "lessonsDone" },
    { key: "countries" },
    { key: "satisfaction" },
  ] as const;

  return (
    <section className="flex flex-col items-start w-full py-16 bg-white">
      <div className="flex flex-col items-center w-full mx-auto">
        {/* ===== Section label ===== */}
          <div className="flex flex-row items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-4 tracking-[1.1px] uppercase text-orange-500">
              {t.sectionLabel}
            </span>
          </div>

        {/* ===== Heading ===== */}
        <h2 className="w-full max-w-[715px] pt-4 font-['Plus_Jakarta_Sans'] font-semibold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.25] tracking-[-1.3px] text-center text-[#2D2D2D]">
          {t.heading}
        </h2>

        {/* ===== Stat row ===== */}
        <div className="flex flex-col sm:flex-row items-stretch w-full mt-16 bg-[#EDEDED] rounded-2xl shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
          {stats.map(({ key }, i) => {
            const stat = t.items[key];
            return (
              <div
                key={key}
                className={`flex-1 flex flex-col justify-center items-center px-8 py-8 bg-white transition-colors duration-300 hover:bg-[#FFF3EE] ${
                  i < stats.length - 1
                    ? "sm:border-r border-b sm:border-b-0 border-[#EDEDED]"
                    : ""
                }`}
              >
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[40px] sm:text-[48px] leading-[1.5] tracking-[-1.2px] text-center text-orange-500">
                  {stat.value}
                </span>
                <span className="pt-1 font-['Plus_Jakarta_Sans'] text-sm leading-[21px] text-center text-[#666666]">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}