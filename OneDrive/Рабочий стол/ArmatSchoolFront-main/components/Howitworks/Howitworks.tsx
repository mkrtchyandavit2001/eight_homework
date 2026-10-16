"use client";

import { useLanguage } from "@/context/LanguageContext";
import React from "react";
import Link from "next/link";
import {
  ArrowRightSizedIcon,
  AwardIcon,
  BookOpenIcon,
  CalendarIcon,
  ChartIcon,
  DocumentIcon,
  UsersIcon,
  VideoIcon,
} from "../icons/Icons";

export default function HowItWorks() {
  const { dict, locale } = useLanguage();
  const t = dict.home.howItWorks;

  const steps = [
    { key: "bookTrial", icon: <CalendarIcon className="text-primary" /> },
    { key: "choosePackage", icon: <BookOpenIcon className="text-primary" /> },
    { key: "meetTeacher", icon: <UsersIcon className="text-primary" /> },
    { key: "attendLessons", icon: <VideoIcon className="text-primary" /> },
    {
      key: "completeHomework",
      icon: <DocumentIcon className="text-primary" />,
    },
    { key: "trackProgress", icon: <ChartIcon className="text-primary" /> },
    { key: "receiveCertificate", icon: <AwardIcon className="text-primary" /> },
  ] as const;

  return (
    <section className="box-border flex w-full flex-col items-start border-t border-[#EDEDED] bg-white py-10 lg:py-14">
      <div className="mx-auto flex w-full flex-col items-center">
        {/* Section label */}
        <div className="flex flex-row items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase leading-4 tracking-[1.1px] text-[var(--orange-500)]">
            {t.sectionLabel}
          </span>
        </div>

        {/* Heading */}
        <h2 className="pt-1.5 text-center font-['Plus_Jakarta_Sans'] text-[28px] font-semibold leading-[1.3] tracking-[-1px] text-[#2D2D2D] sm:text-[40px] sm:leading-[1.4] lg:text-[52px] lg:leading-[1.5] lg:tracking-[-1.3px]">
          {t.heading}
        </h2>

        {/* Subtitle */}
        <p className="w-full max-w-[538px] pt-2 text-center font-['Plus_Jakarta_Sans'] text-base leading-[1.5] text-[#666666] sm:text-lg lg:pt-0">
          {t.subtitle}
        </p>

        {/* ===== Steps ===== */}
        <div className="w-full pt-10 lg:pt-16">
          <ol className="relative mx-auto flex w-full max-w-[420px] flex-col gap-8 sm:max-w-[480px] lg:max-w-none lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:px-7">
            {/* Desktop: հորիզոնական գիծ - ճշգրիտ սկսվում է 1-ին շրջանի կենտրոնից և միանում վերջինին */}
            <div
              aria-hidden="true"
              className="absolute left-[36px] right-[36px] top-[36px] z-0 hidden h-0.5 bg-orange-500 lg:block"
            />
            {/* Mobile/Tablet: ուղղահայաց գիծ - ճշգրիտ սկսվում է 1-ին շրջանից և միանում վերջինին */}
            <div
              aria-hidden="true"
              className="absolute bottom-[36px] left-[35px] top-[36px] z-0 w-0.5 bg-orange-500 lg:hidden"
            />

            {steps.map(({ key, icon }, i) => {
              const step = t.steps[key];
              return (
                <li
                  key={key}
                  className="relative z-10 flex flex-row items-start gap-4 lg:w-[146px] lg:shrink-0 lg:flex-col lg:items-center lg:gap-0"
                >
                  {/* Icon + number */}
                  <div className="relative flex h-[72px] w-[72px] shrink-0 flex-row items-center justify-center rounded-full border-2 border-[#EDEDED] bg-white text-orange-500">
                    {icon}
                    <div className="absolute -top-1.5 left-12 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-orange-500 shadow-sm">
                      <span className="text-center font-['Plus_Jakarta_Sans'] text-[10px] font-semibold leading-[15px] text-white">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex min-w-0 flex-1 flex-col pt-3 text-left lg:flex-none lg:items-center lg:pt-0 lg:text-center">
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[15px] font-semibold leading-[150%] tracking-[-0.3px] text-[#2D2D2D] lg:pt-5 lg:text-sm lg:tracking-[-0.5px]">
                      {step.title}
                    </h3>
                    <p className="pt-1 font-['Plus_Jakarta_Sans'] text-[13px] leading-5 text-[#999999] lg:max-w-[146px] lg:text-[11px] lg:leading-4">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ===== CTA ===== */}
        <div className="flex w-full flex-col items-center justify-center pt-8 lg:pt-10">
          <Link
            href={`/${locale}/free-trial`}
            className="flex flex-row items-center justify-center gap-2.5 rounded-md px-8 py-4 font-['Plus_Jakarta_Sans'] text-base font-semibold leading-6 text-orange-500 transition-colors hover:text-primary/80"
          >
            {t.cta}
            <ArrowRightSizedIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}