"use client";

import React from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Globe,
  Users,
  Hourglass,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CursorIcon from "../icons/SocialIcons";

export default function HomeBanner() {
  const { dict } = useLanguage();
  const t = dict.home.eventsBanner;

  return (
    <section className="w-full bg-white border-t border-[#EDEDED] flex justify-center py-8 mt-16">
      <div className="w-full max-w-[1280px] flex flex-col items-start px-5 gap-6">
        {/* Top Header / Hero Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left Text Block */}
          <div className="flex flex-col items-start gap-2 max-w-[620px] relative pt-6">
            {/* Hand-drawn style floating label */}
            <div className="hidden lg:flex absolute top-30 right-0 rotate-[8deg] items-center gap-1 pointer-events-none z-10">
              <span className="font-cursive text-[13px] leading-[16px] text-[#F26438] whitespace-nowrap">
                {t.handDrawnLabel}
              </span>

              <svg
                width="144"
                height="80"
                viewBox="0 0 144 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.0655 34.5694C52.4668 18.9865 90.4234 23.0417 125.89 39.9044"
                  stroke="#F26438"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                />
                <path
                  d="M122.454 44.0099C122.337 44.0376 122.263 44.1831 122.288 44.3349C122.314 44.4867 122.429 44.5873 122.546 44.5596L122.5 44.2847L122.454 44.0099ZM128.896 42.7679L128.942 43.0428C129.05 43.0173 129.123 42.8918 129.112 42.7505L128.896 42.7679ZM128.501 34.5522C128.49 34.3982 128.384 34.2811 128.265 34.2908C128.145 34.3004 128.058 34.433 128.07 34.5871L128.285 34.5696L128.501 34.5522ZM122.5 44.2847L122.546 44.5596L128.942 43.0428L128.896 42.7679L128.85 42.4931L122.454 44.0099L122.5 44.2847ZM128.896 42.7679L129.112 42.7505L128.501 34.5522L128.285 34.5696L128.07 34.5871L128.681 42.7853L128.896 42.7679Z"
                  fill="#F26438"
                />
              </svg>
            </div>

            <span className="font-semibold text-[12px] leading-[16px] tracking-[2.16px] uppercase text-[#F26438]">
              {t.badge}
            </span>

            <h2 className="font-semibold text-[48px] leading-[50px] text-[#2D2D2D]">
              {t.title}
            </h2>

            <p className="font-normal text-[16px] leading-[26px] text-[#666666]">
              {t.description}
            </p>
          </div>

          {/* Right Header Image Block */}
          <div className="relative w-full md:w-[560px] h-[181px] rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src="/images/armat-school-events-armenian-language-activities.jpg"
              alt={t.badge}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Event Card Row */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 pt-2">
          {/* Left: Event Main Image */}
          <div className="relative w-full lg:w-[540px] h-[254px] rounded-xl overflow-hidden flex-shrink-0 flex flex-col justify-end p-4">
            <Image
              src="/images/armenian-language-game-for-children.jpg"
              alt={t.event.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(241,90,34,0.18)] via-[rgba(54,42,38,0.438)] to-[rgba(0,0,0,0.6)]" />

            <div className="relative z-10 flex flex-col gap-2 px-2 pb-2">
              <h3 className="font-medium text-[32px] md:text-[38px] leading-[120%] tracking-[-1px] text-white">
                {t.event.title}
              </h3>

              <p className="font-normal text-[15px] leading-[150%] text-white">
                {t.event.description}
              </p>
            </div>
          </div>

          {/* Middle: Event Meta Details */}
          <div className="flex flex-col justify-center gap-1.5 w-full lg:w-[220px] py-2">
            <div className="flex items-center gap-[9px] py-1 px-1.5">
              <Calendar className="w-4 h-4 text-[#F15A22] flex-shrink-0" />
              <span className="font-medium text-[14px] text-[#F15A22]">
                {t.event.date}
              </span>
            </div>

            <div className="flex items-center gap-[9px] py-1 px-1.5">
              <Clock className="w-4 h-4 text-[#F15A22] flex-shrink-0" />
              <span className="font-medium text-[14px] text-[#F15A22]">
                {t.event.time}
              </span>
            </div>

            <div className="flex items-center gap-[9px] py-1 px-1.5">
              <Globe className="w-4 h-4 text-[#F15A22] flex-shrink-0" />
              <span className="font-medium text-[14px] text-[#F15A22]">
                {t.event.location}
              </span>
            </div>

            <div className="flex items-center gap-[9px] py-1 px-1.5">
              <Users className="w-4 h-4 text-[#F15A22] flex-shrink-0" />
              <span className="font-medium text-[14px] text-[#F15A22]">
                {t.event.spots}
              </span>
            </div>

            <div className="flex items-center gap-[9px] py-1 px-1.5">
              <Hourglass className="w-4 h-4 text-[#F15A22] flex-shrink-0" />
              <span className="font-medium text-[14px] text-[#F15A22]">
                {t.event.duration}
              </span>
            </div>
          </div>

          {/* Hand-Drawn Cursor */}
          <div className="hidden xl:flex flex-col items-center justify-center self-center pointer-events-none -mx-2 text-orange-500">
            <CursorIcon />
          </div>

          {/* Right: Pricing & Registration Actions */}
          <div className="flex flex-col gap-3.5 w-full lg:w-[380px]">
            {/* Student Free Badge Box */}
            <div className="flex items-start p-3.5 bg-[rgba(229,145,127,0.1)] rounded-[12px] gap-3 w-full">
              <div className="w-[36px] h-[36px] bg-[rgba(241,90,34,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-[18px] h-[18px] text-[#F26438]" />
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-[14px] text-[#F26438]">
                  {t.studentBadge.title}
                </span>

                <p className="font-normal text-[12px] leading-[18px] text-[rgba(241,90,34,0.8)] mt-0.5">
                  {t.studentBadge.description}
                </p>
              </div>
            </div>

            {/* Other Participants Paid Box */}
            <div className="flex items-center justify-between p-3.5 border border-[#EDEDED] rounded-[12px] w-full">
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] bg-[rgba(237,237,237,0.5)] rounded-full flex items-center justify-center flex-shrink-0">
                  <UsersRound className="w-[18px] h-[18px] text-[#666666]" />
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-[14px] text-[#2D2D2D]">
                    {t.otherParticipants.title}
                  </span>

                  <span className="font-normal text-[12px] text-[#666666]">
                    {t.otherParticipants.subtitle}
                  </span>
                </div>
              </div>

              <span className="font-medium text-[20px] text-[#2D2D2D]">
                {t.otherParticipants.price}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full pt-1">
              <button className="flex-1 py-[11px] border border-[#F26438] rounded-[8px] font-semibold text-[14px] text-[#F26438] text-center hover:bg-[#F26438]/5 transition-colors">
                {t.actions.viewEvent}
              </button>

              <button className="flex-1 py-[11px] bg-[#F26438] rounded-[8px] font-semibold text-[14px] text-white text-center hover:bg-[#d95325] transition-colors shadow-sm">
                {t.actions.registerNow}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}