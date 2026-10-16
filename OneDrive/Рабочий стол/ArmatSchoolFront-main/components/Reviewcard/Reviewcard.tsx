"use client";

import type { ReviewCardProps } from "@/types/types";
import { useState } from "react";
import StarRow from "../Starrow/Starrow";
import ReviewAuthor from "../Reviewauthor/Reviewauthor";



export default function ReviewCard({ review, labels, onOpenFull }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex min-h-[317px] flex-col gap-5 rounded-3xl bg-white border border-line border-gray-300 p-6 sm:p-[33px]">
      <StarRow rating={review.rating} size={14} />

      <div className="flex flex-1 flex-col">
        <p className={`text-base leading-[26px] text-ink ${expanded ? "" : "line-clamp-4"}`}>{review.text}</p>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-[13px] text-orange-500 font-medium leading-5 text-brand"
        >
          {expanded ? labels.showLess : labels.readMore}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line border-gray-300 pt-[17px]">
        <ReviewAuthor name={review.name} location={review.location} flag={review.flag} />
        <button
          type="button"
          onClick={() => onOpenFull?.(review)}
          className="rounded-md border border-brand text-orange-500 px-3 py-1 text-[11px] font-medium leading-4 text-brand transition-colors hover:bg-brand/10"
        >
          {labels.fullReview}
        </button>
      </div>
    </article>
  );
}