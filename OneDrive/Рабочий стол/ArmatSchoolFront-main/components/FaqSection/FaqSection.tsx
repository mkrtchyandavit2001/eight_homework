"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const FAQ_KEYS = [
  "ageGroups",
  "dialects",
  "lessonDuration",
  "platform",
  "reschedule",
  "commitment",
] as const;

export default function FaqSection() {
  const { dict } = useLanguage();
  const faq = dict.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default matching the design

  const faqList = FAQ_KEYS.map((key) => ({
    q: faq.items[key].question,
    a: faq.items[key].answer,
  }));

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-10 px-4 md:px-10 flex justify-center">
      <div className="w-full max-w-[1280px] flex flex-col items-center">
        
        {/* HomePage Container */}
        <div className="w-full max-w-[1000px] flex flex-col items-center">
          
          {/* SectionHead */}
          <div className="w-full flex flex-col items-center gap-3">
            {/* SectionLabel */}
            <div className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] bg-[#F15A22] rounded-full" />
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-[16px] tracking-[1.1px] uppercase text-[#F15A22]">
                {faq.sectionLabel}
              </span>
            </div>

            {/* Heading 2 */}
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[36px] md:text-[52px] leading-[1.1] md:leading-[65px] tracking-[-1.3px] text-[#2D2D2D] text-center">
              {faq.heading}
            </h2>
          </div>

          {/* Accordion List */}
          <div className="w-full flex flex-col gap-3 pt-16">
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="w-full bg-white border border-[#EDEDED] rounded-[16px] overflow-hidden transition-all"
                >
                  {/* Button / Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center py-5 px-6 text-left cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`font-['Plus_Jakarta_Sans'] font-semibold text-[15px] leading-[21px] transition-colors ${
                        isOpen ? "text-[#F15A22]" : "text-[#2D2D2D]"
                      }`}
                    >
                      {item.q}
                    </span>

                    <div
                      className={`w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors `}
                    >
                      <svg
                        className={`w-[14px] h-[14px] transition-transform duration-200 ${
                          isOpen ? "text-[#F15A22] rotate-180" : "text-[#999999]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content / Paragraph */}
                  {isOpen && (
                    <div className="px-6 pb-5 pt-0">
                      <p className="font-['Plus_Jakarta_Sans'] font-normal text-[15px] leading-[24px] text-[#666666]">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}