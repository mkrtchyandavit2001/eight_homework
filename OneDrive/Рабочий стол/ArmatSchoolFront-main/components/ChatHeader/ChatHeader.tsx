"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { intlLocaleOf } from "@/lib/calendar";
import { formatClock, gmtLabel } from "@/lib/time";
import { DashChevronDownIcon, DashGlobeIcon } from "../icons/Icons";

interface ChatHeaderProps {
  now: Date | null;
  teacherTz: string;
  tzOpen: boolean;
  onToggleTz: () => void;
}

// TODO: backend-ից հետո՝ ուսուցչի նկարը
const TEACHER_AVATAR: string | null = null;

export default function ChatHeader({ now, teacherTz, tzOpen, onToggleTz }: ChatHeaderProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.messages;
  const intlLocale = intlLocaleOf(locale);
  const name: string = t.teacher.name;

  return (
    <div className="flex items-center gap-4 border-b border-solid border-[#EDEDED] px-5 py-4">
      {TEACHER_AVATAR ? (
        <Image src={TEACHER_AVATAR} alt={name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F15A22] text-sm font-semibold text-white">
          {name.charAt(0)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-[21px] text-[#2D2D2D]">{name}</p>
        <p className="text-[11px] font-semibold leading-4 text-[#F15A22]">{t.online}</p>
      </div>

      <button
        type="button"
        onClick={onToggleTz}
        aria-expanded={tzOpen}
        className="flex items-center gap-2 rounded-xl bg-[#F7F7F7] px-3 py-2 text-left hover:bg-[#F0F0F0]"
      >
        <DashGlobeIcon size={16} className="text-[#666]" />
        <span className="flex flex-col">
          <span className="text-[10px] font-semibold leading-3 text-[#2D2D2D]">
            {t.timezone.teacherShort} {now ? formatClock(now, teacherTz, intlLocale, locale !== "hy") : "—"}
          </span>
          <span className="text-[9px] leading-[14px] text-[#AAA]">
            {t.timezone.teacherCity}
            {now ? ` · ${gmtLabel(now, teacherTz)}` : ""}
          </span>
        </span>
        <DashChevronDownIcon
          size={12}
          className={`text-[#999] transition-transform ${tzOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}