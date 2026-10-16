"use client";

import { useLanguage } from "@/context/LanguageContext";
import { DashChevronLeftIcon, DashChevronRightIcon } from "../icons/Icons";


interface LessonsPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function LessonsPagination({ page, totalPages, onChange }: LessonsPaginationProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.lessons;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-end gap-1 pt-5">
      <button
        type="button"
        aria-label={t.prevAria}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-[22px] text-[#666] disabled:opacity-30"
      >
        <DashChevronLeftIcon size={16} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`flex h-9 w-10 items-center justify-center rounded-full text-[13px] font-semibold leading-5 ${
            p === page
              ? "bg-white text-[#F15A22] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
              : "text-[#666]"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label={t.nextAria}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-[22px] text-[#666] disabled:opacity-30"
      >
        <DashChevronRightIcon size={16} />
      </button>
    </nav>
  );
}