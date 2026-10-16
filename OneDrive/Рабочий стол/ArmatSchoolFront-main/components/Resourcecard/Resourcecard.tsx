"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { ResourcecardProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import ShareMenu from "../ShareMenu/ShareMenu";
import Link from "next/link";
import { DownloadIcon, HeartIcon, ShareIcon } from "../icons/Icons";


export default function ResourceCard({ resource }: ResourcecardProps) {
  const { dict } = useLanguage();
  const t = dict.blog.resources;

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
    <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#EDEDED] bg-white">
      <div className="relative h-[180px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${resource.image})` }}
          role="img"
          aria-label={resource.title}
        />

        <span className="absolute right-3 top-3 rounded-lg border border-[#EDEDED] bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.5px] text-[#F15A22] backdrop-blur-sm">
          {resource.format}
        </span>

        {resource.popular && (
          <span className="absolute left-3 top-3 rounded-full border border-[#FEF3C6] bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-[#E17100]">
            {t.popular}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#F15A22]">
            {t.filters[resource.category] ?? resource.category}
          </span>
          <span className="text-[11px] text-[#DDDDDD]">·</span>
          <span className="text-[11px] text-[#999999]">{resource.level}</span>
          <span className="text-[11px] text-[#DDDDDD]">·</span>
          <span className="text-[11px] text-[#999999]">{resource.age}</span>
        </div>

        <h3 className="mt-3 text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">
          {resource.title}
        </h3>

        <p className="mt-2 flex-1 text-[13px] leading-5 text-[#666666]">
          {resource.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href={resource.href}
            className="flex items-center gap-2 rounded-lg py-2 pr-3 text-[13px] font-semibold text-[#F15A22] hover:opacity-80"
          >
            <DownloadIcon className="h-[13px] w-[13px]" />
            {t.download}
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              aria-label={t.saveAria}
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