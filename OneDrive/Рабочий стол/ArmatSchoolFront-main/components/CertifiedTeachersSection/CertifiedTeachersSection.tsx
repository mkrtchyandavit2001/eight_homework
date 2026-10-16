"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

// Photo per teacher key (files in public/images/)
const IMAGES: Record<string, string> = {
  ani: "/images/ani-sargsyan.jpg",
  mariam: "/images/mariam-petrosyan.jpg",
  nare: "/images/narine-hovhannisyan.jpg",
  narine: "/images/narine-hovhannisyan.jpg",
};

export default function CertifiedTeachersSection() {
  const { dict } = useLanguage();
  const teachersDict = dict.teachers;

  const teachers = Object.entries(teachersDict.items ?? {}).map(
    ([key, value]) => ({
      key,
      ...(value as {
        name: string;
        role: string;
        students: string;
        experience: string;
        tags?: string[];
      }),
      image: IMAGES[key],
    })
  );

  return (
    <section className="w-full rounded-sm py-10 flex justify-center">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-14">
          {/* Header & Button Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
            <div className="flex flex-col gap-3 max-w-[484px]">
              <div className="flex items-center gap-2">
                <div className="w-[6px] h-[6px] bg-[#F15A22] rounded-full" />
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-[16px] tracking-[1.1px] uppercase text-[#F15A22]">
                  {teachersDict.sectionLabel}
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[36px] md:text-[52px] leading-[1.1] md:leading-[65px] tracking-[-1.3px] text-[#2D2D2D]">
                {teachersDict.heading}
              </h2>
            </div>

            <button className="box-border flex items-center justify-center py-3 px-6 gap-2.5 h-[49px] bg-white border border-[#EDEDED] rounded-full hover:border-[#F15A22] transition-colors group">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[15px] leading-[22px] text-[#2D2D2D]">
                {teachersDict.allTeachers}
              </span>
              <svg className="w-[15px] h-[15px] text-[#2D2D2D] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Teacher Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {teachers.map((teacher) => (
              <div
                key={teacher.key}
                className="bg-white border-l-4 border-[#F15A22] rounded-[16px_28px_28px_16px] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image Container */}
                <div className="w-full h-[220px] bg-[#F5F0EB] relative overflow-hidden">
                  {teacher.image && (
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-contain"
                    />
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[17px] leading-[26px] text-[#2D2D2D]">
                      {teacher.name}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] leading-[20px] text-[#666666] mt-0.5">
                      {teacher.role}
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-[#999999] text-[12px]">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{teacher.students}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{teacher.experience}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 pb-5">
                      {teacher.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-[11px] font-medium leading-[16px] text-[#666666] py-1 px-2.5 bg-[#F7F7F7] rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2.5 px-5 bg-white border border-[#EDEDED] hover:border-[#F15A22] rounded-2xl transition-colors mt-auto">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] text-[#F15A22]">
                      {teachersDict.viewProfile}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}