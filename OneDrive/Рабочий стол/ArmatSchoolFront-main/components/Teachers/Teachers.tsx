"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface TeacherItem {
  name: string;
  role: string;
  experience: string;
  languages: string;
  bio: string;
}

// Ուսուցչի ինդեքս -> նկարի ճանապարհ (public/images-ից)
// Եթե ուզում ես այլ ուսուցչի վրա դնել, փոխիր ինդեքսը (0, 1, 2)
const TEACHER_PHOTOS: Record<number, string> = {
  0: "/images/ani-sargsyan.jpg",
};

export function Teachers() {
  const { dict } = useLanguage();
  const t = dict.teachers;
  const teachers = Object.values(t.items) as TeacherItem[];

  return (
    <section className="bg-white py-[60px]">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 self-start">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[11px] font-semibold text-orange-500 uppercase leading-4 tracking-[1.1px] text-primary">
              {t.sectionLabel}
            </span>
          </div>
          <h2 className="pt-5 text-4xl font-semibold tracking-[-1.5px] text-[#2D2D2D] md:text-5xl md:leading-[72px]">
            {t.heading}
          </h2>
          <p className="max-w-[576px] pt-4 text-[17px] leading-[26px] text-[#666666]">
            {t.description}
          </p>
        </div>

        <div className="grid gap-8 pt-16 md:grid-cols-3">
          {teachers.map((item, index) => {
            const photo = TEACHER_PHOTOS[index];

            return (
              <article
                key={item.name}
                className="flex flex-col overflow-hidden rounded-3xl border border-[#EDEDED] bg-white"
              >
                <div className="relative flex h-[220px] items-center justify-center bg-[linear-gradient(135deg,#FFF3EE_0%,#FFE0D0_100%)]">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-[32px] font-semibold leading-[48px] text-white">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-7">
                  <h3 className="text-[19px] font-semibold leading-7 text-[#2D2D2D]">{item.name}</h3>
                  <p className="pt-0.5 text-[13px] font-semibold leading-5 text-orange-500">{item.role}</p>

                  <div className="flex flex-col items-start gap-3 pt-2">
                    <span className="rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-medium leading-[18px] text-[#666666]">
                      {item.experience}
                    </span>
                    <span className="rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-medium leading-[18px] text-[#666666]">
                      {item.languages}
                    </span>
                  </div>

                  <p className="pt-4 text-sm leading-[24px] text-[#666666]">{item.bio}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}