"use client";

import { buildCourseFacts } from "@/lib/course-facts";
import type { CourseDetailData, CourseDetailDictionary, SchedulePreferences } from "@/types/course";
import { useState } from "react";
import { ScheduleSection } from "../Schedulesection/Schedulesection";
import { ArrowRightIcon } from "../icons/Icons";

interface Props {
  t: CourseDetailDictionary;
  data: CourseDetailData;
  level: string;
  format: string;
  totalLessons: number;
  onEnroll?: (payload: {
    schedule: SchedulePreferences;
    timeZone: string;
    promoCode: string;
  }) => void;
}

export function PricingCard({ t, data, level, format, totalLessons, onEnroll }: Props) {
  const [schedule, setSchedule] = useState<SchedulePreferences>({
    wednesday: { from: "16:00", to: "20:00" },
  });
  const [timeZone, setTimeZone] = useState("Asia/Yerevan");
  const [promo, setPromo] = useState("");

  const f = buildCourseFacts(t, data, level, format, totalLessons);

  // row-major՝ ձախ սյունակ / աջ սյունակ
  const facts = [
    f.lessonDuration, f.level,
    f.courseDuration, f.language,
    f.lessonsPerWeek, f.format,
    f.totalLessons, f.certificate,
  ];

  return (
    <div className="flex flex-col items-center rounded-3xl border border-[#EDEDED] bg-white px-7 pb-[30px] pt-5">
      {/* Price */}
      <div className="flex w-full flex-col items-center justify-center rounded-2xl p-4">
        <span className="text-[13px] font-semibold uppercase leading-[150%] tracking-[0.8px] text-[#999999]">
          {t.pricing.individualLesson}
        </span>
        <div className="flex items-center gap-2.5">
          <span className="text-4xl font-semibold leading-[150%] text-[#F15A22]">
            ${data.price.current}
          </span>
          <span className="text-sm leading-[150%] text-[#BBBBBB] line-through">
            ${data.price.old}
          </span>
        </div>
      </div>

      {/* Facts */}
      <dl className="grid w-full grid-cols-2 gap-2.5 py-5">
        {facts.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1.5 rounded-[14px] border border-[#EDEDED] bg-white p-3.5"
          >
            <dt className="text-[11px] leading-[15px] text-[#999999]">
              {item.label}
            </dt>
            <dd className="text-[13px] font-semibold leading-[18px] text-[#2D2D2D]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="w-full">
        <ScheduleSection
          t={t.schedule}
          value={schedule}
          onChange={setSchedule}
          timeZone={timeZone}
          onTimeZoneChange={setTimeZone}
        />
      </div>

      {/* Promo */}
      <div className="w-full pt-5">
        <div className="flex flex-col gap-1.5 rounded-2xl border border-[#EDEDED] bg-white p-4">
          <label
            htmlFor="promo"
            className="text-[13px] font-medium leading-[21px] text-[#2D2D2D]"
          >
            {t.promo.label}
          </label>
          <input
            id="promo"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder={t.promo.placeholder}
            className="w-full rounded-lg border border-[#EDEDED] bg-[#F7F7F7] px-4 py-2.5 text-xs font-medium uppercase text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50 focus:border-[#F15A22]"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="w-full pt-8">
        <button
          type="button"
          onClick={() => onEnroll?.({ schedule, timeZone, promoCode: promo })}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#F15A22] py-3 text-base font-medium leading-6 text-[#F15A22] transition-colors hover:bg-[#F15A22] hover:text-white"
        >
          {t.enroll}
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}