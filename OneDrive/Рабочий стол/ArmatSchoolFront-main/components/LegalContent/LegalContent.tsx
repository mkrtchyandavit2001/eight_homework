import type { LegalContentProps } from "@/types/types";
import React from "react";



export default function LegalContent({ title, lastUpdated, sections }: LegalContentProps) {
  return (
    <div className="flex w-full max-w-[760px] flex-col">
      {/* Heading */}
      <div className="flex flex-col items-start">
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[44px] font-semibold leading-[66px] tracking-[-1.1px] text-[#2D2D2D]">
          {title}
        </h1>
        <p className="pt-3 font-['Plus_Jakarta_Sans',sans-serif] text-[13px] leading-[20px] text-[#999999]">
          {lastUpdated}
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-8 pt-12">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-semibold leading-[27px] text-[#2D2D2D]">
              {section.heading}
            </h2>
            <p className="pt-3 font-['Plus_Jakarta_Sans',sans-serif] text-[15px] leading-[24px] text-[#666666]">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}