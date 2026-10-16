"use client";

import { useEffect, useRef, useState } from "react";
import ShareMenu from "../ShareMenu/ShareMenu";
import type { ArticleShareBarProps } from "@/types/types";
import { HeartIcon, ShareIcon } from "../icons/Icons";



export default function ArticleShareBar({
  shareLabel,
  likeAria,
  shareAria,
}: ArticleShareBarProps) {
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Փակել մենյուն դրսում սեղմելիս
  useEffect(() => {
    if (!shareOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareOpen]);

  return (
    <div className="mt-10 flex items-center justify-between border-t border-[#EDEDED] pt-6">
      <span className="text-[13px] font-semibold text-[#2D2D2D]">
        {shareLabel}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={likeAria}
          className="rounded p-1.5"
        >
          <HeartIcon
            filled={liked}
            className={`h-4 w-4 ${liked ? "text-[#F15A22]" : "text-[#BBBBBB]"}`}
          />
        </button>

        <div ref={shareRef} className="relative">
          <button
            type="button"
            onClick={() => setShareOpen((v) => !v)}
            aria-label={shareAria}
            aria-expanded={shareOpen}
            className="rounded p-1.5"
          >
            <ShareIcon className="h-[15px] w-[15px]" />
          </button>

          {shareOpen && (
            <div className="absolute right-0 bottom-7 z-50 mt-2">
              <ShareMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}