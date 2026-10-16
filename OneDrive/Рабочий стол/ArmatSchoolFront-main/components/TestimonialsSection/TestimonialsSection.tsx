"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightSizedIcon } from "../icons/Icons";

const TESTIMONIAL_KEYS = ["sarah", "armen", "lena"] as const;

// Helper to get country code for flag images
const getCountryCode = (key: string, location: string) => {
  if (key === "sarah" || location?.toLowerCase().includes("usa")) return "us";
  if (key === "armen" || location?.toLowerCase().includes("australia"))
    return "au";
  if (key === "lena" || location?.toLowerCase().includes("france")) return "fr";
  return "us";
};

export default function TestimonialsSection() {
  const { dict, locale } = useLanguage();
  const testimonialsDict = dict.testimonials;

  const testimonials = TESTIMONIAL_KEYS.map((key) => {
    const item = testimonialsDict.items[key];
    return {
      key,
      ...item,
      countryCode: getCountryCode(key, item.location),
    };
  });

  return (
    <section className="w-full bg-white py-10 flex justify-center">
      {/* Container */}
      <div className="w-full flex flex-col items-center">
        {/* SectionHead */}
        <div className="w-full flex flex-col items-center gap-4">
          {/* SectionLabel */}
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-[#F15A22] rounded-full" />
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-[16px] tracking-[1.1px] uppercase text-[#F15A22]">
              {testimonialsDict.sectionLabel}
            </span>
          </div>

          {/* Heading 2 */}
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[36px] md:text-[52px] leading-[1.1] md:leading-[65px] tracking-[-1.3px] text-[#2D2D2D] text-center max-w-[800px]">
            {testimonialsDict.heading}
          </h2>
        </div>

        {/* HomePage:margin */}
        <div className="w-full flex flex-col justify-center items-end pt-5">
          {/* OBtn - Read More Reviews */}
          <Link
            href={`/${locale}/home/reviews`}
            className="group flex flex-row justify-center items-center gap-[10px] px-6 py-3 mb-0 font-['Plus_Jakarta_Sans'] font-semibold text-[15px] leading-[22px] text-center text-[#F15A22] hover:opacity-80 transition-opacity"
          >
            <span>{testimonialsDict.readMore}</span>

            <ArrowRightSizedIcon/>
          </Link>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {testimonials.map((item) => (
              <div
                key={item.key}
                className="bg-white border border-[#EDEDED] rounded-[24px] p-8 flex flex-col justify-between h-[259px] box-border shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top content (Stars & Paragraph) */}
                <div className="flex flex-col gap-5">
                  {/* StarRow */}
                  <div className="flex items-center gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-[14px] h-[14px] text-[#F15A22]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Paragraph */}
                  <p className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[26px] text-[#2D2D2D] line-clamp-3">
                    {item.quote}
                  </p>
                </div>

                {/* Container (Author Info) */}
                <div className="pt-4 border-t border-[#EDEDED] flex items-center gap-3">
                  {/* Avatar Initials Badge */}
                  <div className="w-[44px] h-[44px] bg-[#F15A22] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] text-white">
                      {item.initials}
                    </span>
                  </div>

                  {/* Name & Location with Flag Image */}
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#2D2D2D]">
                      {item.name}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-[12px] leading-[18px] text-[#999999] flex items-center gap-1.5">
                      <Image
                        src={`https://flagcdn.com/w20/${item.countryCode}.png`}
                        alt="flag"
                        width={18}
                        height={13}
                        className="w-[18px] h-[13px] object-cover rounded-[2px]"
                      />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}