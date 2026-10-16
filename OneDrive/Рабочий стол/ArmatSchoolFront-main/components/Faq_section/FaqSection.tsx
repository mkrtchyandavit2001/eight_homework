import React from "react";
import Image from "next/image";
import type { FaqSectionProps } from "@/types/types";
import { ChevronArrow, ChevronDownIcon, ChevronIcon } from "../icons/Icons";



export default function FaqSection({ faqItems, openFaqIndex, onToggleFaq, imageAlt }: FaqSectionProps) {
  return (
    <div className="flex flex-col gap-[24px] w-full lg:w-[332px] shrink-0">
      <div className="bg-white rounded-[12px] p-[16px] flex flex-col gap-[8px]">
        {faqItems.map((item, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <button
              key={item.q}
              type="button"
              onClick={() => onToggleFaq(index)}
              className={`w-full text-left px-[16px] py-[14px] rounded-[8px] border transition-colors ${
                isOpen ? "bg-gray-25 border-gray-100" : "border-gray-100 hover:border-orange-500/40"
              }`}
            >
              <div className="flex items-center justify-between gap-[12px]">
                <span
                  className={`text-[14px] font-medium leading-[20px] ${
                    isOpen ? "text-orange-500" : "text-gray-800"
                  }`}
                >
                  {item.q}
                </span>
                <ChevronDownIcon open={isOpen} />
              </div>
              {isOpen && <p className="text-[14px] leading-[23px] text-gray-600 pt-[8px]">{item.a}</p>}
            </button>
          );
        })}
      </div>

      <div className="relative w-full h-[233px] rounded-[16px] overflow-hidden bg-gray-50">
        <Image src="/images/book-lesson-calendar.jpg" alt={imageAlt ?? "Free trial lesson"} fill className="object-cover" />
      </div>
    </div>
  );
}