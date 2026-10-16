"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { ArticleCardProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import ShareMenu from "../ShareMenu/ShareMenu";
import Image from "next/image";
import { ArrowRightSizedIcon, HeartIcon, ShareIcon } from "../icons/Icons";

export default function ArticleCard({ article }: ArticleCardProps) {
  const { dict } = useLanguage();
  const t = dict.blog;

  const [liked, setLiked] = useState(article.liked ?? false);
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
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-[22px] border border-[#EDEDED] bg-white">
      {article.image ? (
        <Image
          src={article.image}
          alt={article.title}
          width={400}
          height={200}
          className="h-[200px] w-full object-cover object-center"
        />
      ) : (
        <div className="h-[200px] w-full bg-[#F5F5F5]" />
      )}

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#F15A22]">
            {t.categories[article.category] ?? article.category}
          </span>
          <span className="text-xs text-[#BBBBBB]">{article.date}</span>
        </div>

        <h3 className="mt-3.5 text-base font-semibold leading-6 text-[#2D2D2D]">
          {article.title}
        </h3>

        <p className="mt-2.5 flex-1 text-[13px] leading-5 text-[#666666]">
          {article.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href={article.href}
            className="flex items-center gap-2.5 text-[13px] font-semibold text-[#F15A22] hover:opacity-80"
          >
            {t.readMore}
            <ArrowRightSizedIcon className="h-3.5 w-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              aria-label={t.likeAria}
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
                aria-label={t.shareAria}
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
      </div>
    </div>
  );
}