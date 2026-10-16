"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { PaginationProps } from "@/types/types";
import { ChevronIcon } from "../icons/Icons";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { dict } = useLanguage();
  const t = dict.blog.pagination;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-end gap-1 py-5"
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        aria-label={t.previousAria}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#666666] hover:text-[#2D2D2D] disabled:opacity-30 disabled:hover:text-[#666666]"
      >
        <ChevronIcon className="h-4 w-4 rotate-180" />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "flex h-9 w-10 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-[#F15A22] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                : "flex h-9 w-10 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-[#666666] hover:text-[#2D2D2D]"
            }
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        aria-label={t.nextAria}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#666666] hover:text-[#2D2D2D] disabled:opacity-30 disabled:hover:text-[#666666]"
      >
        <ChevronIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
