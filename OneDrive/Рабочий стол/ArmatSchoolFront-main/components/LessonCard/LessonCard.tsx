"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { LessonView } from "@/types/dashboard";
import { DashCalendarIcon } from "../icons/Icons";

interface LessonCardProps {
  lesson: LessonView;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.lessons;
  const isCompleted = lesson.status === "completed";

  // Ստեղծում ենք state-ներ ամսաթվի և ժամի համար, որոնք սկզբում դատարկ են
  const [datePart, setDatePart] = useState<string>("");
  const [timePart, setTimePart] = useState<string>("");

  useEffect(() => {
    // Այս լոգիկան կաշխատի միայն բրաուզերում (Client-side), 
    // ինչի շնորհիվ սերվերային և հաճախորդային HTML-ները լիովին կհամընկնեն։
    const date = new Date(lesson.startsAt);
    const intlLocale = locale === "hy" ? "hy-AM" : "en-US";
    
    setDatePart(
      new Intl.DateTimeFormat(intlLocale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date)
    );

    setTimePart(
      new Intl.DateTimeFormat(intlLocale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: locale !== "hy",
      }).format(date)
    );
  }, [lesson.startsAt, locale]);

  return (
    <article className="flex items-start gap-5 rounded-xl border-[0.67px] border-[#EDEDED] bg-white p-5">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          {/* Title + date */}
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">
              {lesson.title}
            </h3>
            <p className="flex items-center gap-1 pt-0.5 text-xs leading-[18px] text-[#999]">
              <DashCalendarIcon size={11} />
              <span>
                {/* Մինչև client-ում հաշվարկվելը ցույց է տալիս կամ ֆորմատավորված տեքստը, կամ չհարմարեցված տարբերակը */}
                {datePart && timePart 
                  ? `${datePart} ${t.at} ${timePart}` 
                  : lesson.startsAt} · {lesson.teacher}
              </span>
            </p>
          </div>

          {/* Status */}
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#F15A22]/10 px-2.5 py-1 text-[11px] font-semibold leading-4 text-[#F15A22]">
                {t.completed}
              </span>
              <span className="text-[13px] font-semibold leading-5 text-[#F15A22]">
                {lesson.score}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-2.5 text-[11px] font-semibold leading-4 text-[#666]/70">
                {t.upcoming}
              </span>
              <button
                type="button"
                className="rounded-full px-3 text-xs font-semibold leading-[18px] text-[#F15A22] hover:bg-[#F15A22]/10"
              >
                {t.join}
              </button>
            </div>
          )}
        </div>

        {isCompleted && lesson.feedback && (
          <div className="pt-2">
            <p className="rounded-lg bg-[#F7F7F7] p-3 text-[13px] leading-5 text-[#666]">
              {lesson.feedback}
            </p>
          </div>
        )}
      </div>

      {isCompleted && (
        <button
          type="button"
          className="px-3 py-1.5 text-xs font-semibold leading-[18px] text-[#999] hover:text-[#F15A22]"
        >
          {t.review}
        </button>
      )}
    </article>
  );
}