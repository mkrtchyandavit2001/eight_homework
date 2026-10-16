"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { intlLocaleOf } from "@/lib/calendar";
import { formatClock, gmtLabel } from "@/lib/time";
import { DashCloseIcon } from "../icons/Icons";

interface TimezoneCardProps {
  now: Date;
  studentTz: string;
  teacherTz: string;
  onClose: () => void;
}

export default function TimezoneCard({ now, studentTz, teacherTz, onClose }: TimezoneCardProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.messages.timezone;
  const intlLocale = intlLocaleOf(locale);
  const hour12 = locale !== "hy";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="absolute right-5 top-[68px] z-10 w-[280px] rounded-2xl border border-solid border-[#EDEDED] bg-white p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold leading-[18px] text-[#2D2D2D]">{t.title}</h3>
        <button
          type="button"
          aria-label={t.closeAria}
          onClick={onClose}
          className="text-[#AAA] hover:text-[#666]"
        >
          <DashCloseIcon size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3">
        <div className="flex flex-col rounded-xl bg-[#F7F7F7] p-3">
          <span className="text-[9px] font-semibold uppercase leading-[14px] tracking-[0.45px] text-[#999]">
            {t.yourTime}
          </span>
          <span className="pt-1 text-base font-semibold leading-5 text-[#2D2D2D]">
            {formatClock(now, studentTz, intlLocale, hour12)}
          </span>
          <span className="pt-1 text-[10px] leading-[15px] text-[#666]">{t.studentCity}</span>
          <span className="text-[10px] leading-[15px] text-[#AAA]">{gmtLabel(now, studentTz)}</span>
        </div>

        <div className="flex flex-col rounded-xl bg-[#FFF5F2] p-3">
          <span className="text-[9px] font-semibold uppercase leading-[14px] tracking-[0.45px] text-[#F15A22]">
            {t.teacherTime}
          </span>
          <span className="pt-1 text-base font-semibold leading-5 text-[#2D2D2D]">
            {formatClock(now, teacherTz, intlLocale, hour12)}
          </span>
          <span className="pt-1 text-[10px] leading-[15px] text-[#666]">{t.teacherCity}</span>
          <span className="text-[10px] leading-[15px] text-[#AAA]">{gmtLabel(now, teacherTz)}</span>
        </div>
      </div>

      <p className="pt-2 text-center text-[10px] leading-[15px] text-[#AAA]">{t.note}</p>
    </div>
  );
}