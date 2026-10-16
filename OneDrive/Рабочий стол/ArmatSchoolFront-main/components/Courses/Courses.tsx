"use client";

import { useLanguage } from "@/context/LanguageContext";
import React from "react";
import Image from "next/image";
import { ArrowRightIcon, BookFilledIcon, BookOpenIcon, DesktopIcon, LevelIcon } from "../icons/Icons";

const DEFAULT_COURSES = {
  sectionLabel: "Our Courses",
  heading: "Start Learning",
  items: {
    beginner: {
      title: "Beginner Armenian",
      description: "Designed for complete beginners and heritage learners rediscovering their roots.",
      lessons: "12 Lessons",
      level: "Beginner",
      mode: "Online",
      price: "$128",
      oldPrice: "$180",
    },
    intermediate: {
      title: "Intermediate Armenian",
      description: "For learners who know the basics and want to build fluency. Deepen grammar,...",
      lessons: "12 Lessons",
      level: "Standard",
      mode: "Online",
      price: "$200",
      oldPrice: "$250",
    },
    advanced: {
      title: "Advanced Armenian",
      description: "For confident speakers aiming for near-native fluency. Tackle complex grammar...",
      lessons: "12 Lessons",
      level: "Advance",
      mode: "Online",
      price: "$280",
      oldPrice: "$360",
    },
  },
  cta: "View Course",
};

const COURSE_KEYS = ["beginner", "intermediate", "advanced"] as const;

const COURSE_IMAGES: Record<string, string> = {
  beginner: "/images/beginner-armenian.jpg", 
  intermediate: "/images/intermediate-armenian.jpg",
  advanced: "/images/advanced-armenian.jpg",
};

export default function Courses() {
  const { dict } = useLanguage();
  const t = dict?.home?.courses ?? DEFAULT_COURSES;

  return (
    <section className="flex flex-col items-center w-full py-10 bg-white">
      <div className="flex flex-col items-center w-full mx-auto max-w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center w-full gap-2">
          <div className="flex flex-row items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-4 tracking-[1.1px] uppercase text-orange-500">
              {t.sectionLabel ?? DEFAULT_COURSES.sectionLabel}
            </span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[32px] sm:text-[42px] lg:text-[52px] leading-[150%] tracking-[-1.3px] text-center text-[#2D2D2D]">
            {t.heading ?? DEFAULT_COURSES.heading}
          </h2>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full pt-10">
          {COURSE_KEYS.map((key) => {
            const course = t.items?.[key] ?? DEFAULT_COURSES.items[key];
            const imageSrc = COURSE_IMAGES[key];

            return (
              <div
                key={key}
                className="box-border flex flex-col w-full bg-white border border-[#EDEDED] shadow-[0px_4px_22.2px_rgba(0,0,0,0.15)] rounded-[16px] overflow-hidden"
              >
                {/* Course Image */}
                <div className="relative w-full h-[170px] bg-[#F9F9F9]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-gray-400 text-sm">
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                {/* Course Body */}
                <div className="flex flex-col p-5 justify-between flex-grow">
                  <div className="flex flex-col">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[22px] leading-[30px] tracking-[-0.5px] text-[#2D2D2D]">
                      {course.title}
                    </h3>
                    
                    <div className="py-[10px] border-b border-[#EDEDED] mt-2">
                      <p className="font-['Plus_Jakarta_Sans'] font-normal text-sm leading-[150%] text-[#2D2D2D] line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-row items-center justify-between py-4 text-[10px] text-[#000000]">
                      <div className="flex items-center gap-1.5 text-orange-500">
                        <BookOpenIcon className="text-orange-500" />
                        <span className="text-[#000000]">{course.lessons}</span>
                      </div>

                      <div className="w-[1px] h-[18px] bg-[#EDEDED]" />

                      <div className="flex items-center gap-1.5">
                        <LevelIcon className="text-orange-500" />
                        <span className="text-[#000000]">{course.level}</span>
                      </div>

                      <div className="w-[1px] h-[18px] bg-[#EDEDED]" />

                      <div className="flex items-center gap-1.5">
                        <DesktopIcon className="text-orange-500" />
                        <span className="text-[#000000]">{course.mode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex flex-row items-center justify-between pt-4 border-t border-[#EDEDED]">
                    <div className="flex items-end gap-1.5">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[26px] leading-[150%] text-orange-500">
                        {course.price}
                      </span>
                      {course.oldPrice && (
                        <span className="font-['Plus_Jakarta_Sans'] font-normal text-[13px] leading-[150%] text-[#BBBBBB] line-through mb-1">
                          {course.oldPrice}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-['Plus_Jakarta_Sans'] font-medium text-[13px] leading-5 text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <span>{t.cta ?? DEFAULT_COURSES.cta}</span>
                      <ArrowRightIcon className="w-4 h-4 text-orange-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}