"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ShareMenu from "../ShareMenu/ShareMenu";
import { useLanguage } from "@/context/LanguageContext";
import type { ContentCardProps } from "@/types/types";
import { ArrowRightIcon, ArrowRightSizedIcon, HeartIcon, ShareIcon } from "../icons/Icons";



export default function ContentCard({
  href,
  image,
  imageAlt = "",
  imageHeight = 200,
  cornerBadge,
  category,
  date,
  tags,
  title,
  description,
  price,
  ctaLabel = "Read More",
  liked = false,
  onLikeToggle,
  onShare,
  padding = 28,
  className = "",
}: ContentCardProps) {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    onLikeToggle?.();
  };
  const { dict } = useLanguage();

  const t = dict.blog;

  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Փակել մենյուն դրսում սեղմելիս
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    if (shareOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    if (shareOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareOpen]);

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-[22px] border border-[#EDEDED] bg-white ${className}`}
    >
      {/* Image */}
      <div
        className="relative w-full flex-none"
        style={{ height: imageHeight }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {cornerBadge && (
          <span className="absolute right-3 top-3 rounded-lg border border-[#EDEDED] bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.5px] text-[#F15A22] backdrop-blur-sm">
            {cornerBadge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col" style={{ padding }}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#F15A22]">
            {category}
          </span>

          {date && <span className="text-xs text-[#BBBBBB]">{date}</span>}

          {tags?.map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span
                aria-hidden
                className="text-base leading-none text-[#DDDDDD]"
              >
                ·
              </span>
              <span className="text-[11px] text-[#999999]">{tag}</span>
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-base font-semibold leading-6 text-[#2D2D2D]">
          {title}
        </h3>

        <p className="mb-5 flex-1 text-[13px] leading-5 text-[#666666]">
          {description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* {price && (
              <span className="text-xl font-semibold text-[#F15A22]">
                {price}
              </span>
            )} */}

            <Link
              href={href}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#F15A22] hover:underline sm:text-base"
            >
              {ctaLabel}
              <ArrowRightSizedIcon />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLike}
              aria-label={isLiked ? "Unlike" : "Like"}
              aria-pressed={isLiked}
              className="flex h-[27px] w-[27px] items-center justify-center"
            >
              <HeartIcon filled={isLiked} />
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

export interface ContentCardGridProps {
  items: (ContentCardProps & { id?: string | number })[];
  className?: string;
  emptyState?: ReactNode;
}

export function ContentCardGrid({
  items,
  className = "",
  emptyState,
}: ContentCardGridProps) {
  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {items.map((item, i) => (
        <ContentCard key={item.id ?? i} {...item} />
      ))}
    </div>
  );
}
