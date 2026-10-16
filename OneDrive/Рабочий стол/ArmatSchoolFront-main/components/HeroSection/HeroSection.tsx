import type { HeroSectionProps } from "@/types/types";
import React from "react";



export default function HeroSection({ titleLine1, titleLine2, badge, subtitle }: HeroSectionProps) {
  return (
    <section className="rounded-[12px] bg-[linear-gradient(7.8deg,rgba(241,90,34,0.17)_6%,rgba(255,255,255,0.27)_94%)] px-[60px] py-[20px] flex items-center justify-between gap-[24px] flex-wrap">
      <h1 className="text-[56px] leading-[150%] font-semibold text-gray-800">
        {titleLine1 ?? "Choose Your"}
        <br />
        <span className="text-orange-500">{titleLine2 ?? "Free Trial Lesson"}</span>
      </h1>

      <div className="flex flex-col gap-[12px] max-w-[380px]">
        <span className="text-[12px] font-semibold text-orange-500">
          {badge ?? "Free Trial Lesson"}
        </span>
        <p className="text-[16px] leading-[26px] font-semibold text-gray-800">
          {subtitle ??
            "Your application has been successfully received. Now simply select a convenient date and time to reserve your lesson."}
        </p>
      </div>
    </section>
  );
}