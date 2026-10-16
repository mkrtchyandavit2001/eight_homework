"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { FeaturedArticleProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import ShareMenu from "../ShareMenu/ShareMenu";
import Container from "../Container";
import Link from "next/link";
import { ArrowRightIcon, HeartIcon, SearchIcon, ShareIcon } from "../icons/Icons";
import Image from "next/image";


export default function FeaturedArticle({
  article,
  viewAllHref,
  activeCategory = "all",
  onCategoryChange,
  onSearch,
}: FeaturedArticleProps) {
  const { dict, locale } = useLanguage();
  const t = dict.blog;
  const resolvedViewAllHref = viewAllHref ?? `/${locale}/blog/resources`;

  const [liked, setLiked] = useState(article.liked ?? false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close share menu when clicking outside
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

  const [query, setQuery] = useState("");

  const categories = [
    { id: "all", label: t.categories.all },
    { id: "parentingTips", label: t.categories.parentingTips },
    { id: "languageGuide", label: t.categories.languageGuide },
    { id: "research", label: t.categories.research },
    { id: "culture", label: t.categories.culture },
  ];

  return (
    <div className=" w-full overflow-hidden rounded-[22px] bg-white">
      <Container>
      <div className="mt-4 flex w-full flex-wrap items-center pb-10 gap-4">
        <label className="flex h-[47px] w-80 shrink-0 items-center gap-1.5 rounded-2xl border border-[#EDEDED] bg-white px-4 mx-10">
          <SearchIcon className="h-[15px] w-[15px] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-sm text-[#2D2D2D] placeholder:text-[#2D2D2D]/50 outline-none"
          />
        </label>

        <div className="flex flex-1 flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange?.(category.id)}
                className={
                  isActive
                    ? "rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#F15A22] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                    : "rounded-full px-4 py-2 text-sm font-medium text-[#666666] transition-colors hover:text-[#2D2D2D]"
                }
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex">
        <Image
          className="hidden w-[480px] h-[320px] object-cover object-top shrink-0 md:block"
          src={article.image || "/images/authentic-armenia.png"}
          alt={article.title}
          width={480}
          height={320}
          sizes="480px"
        />

        <div className="flex w-full flex-col items-end justify-between px-8 py-[30px]">
          <Link
            href={resolvedViewAllHref}
            className="flex items-center gap-2 self-end text-sm font-semibold text-[#F15A22] hover:opacity-80"
          >
            {t.viewAll}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>

          <div className="w-full">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#F15A22]">
                {t.categories[article.category] ?? article.category}
              </span>
              <span className="text-xs text-[#BBBBBB]">{article.date}</span>
            </div>

            <h2 className="mt-4 max-w-[654px] text-2xl font-semibold leading-[34px] text-[#2D2D2D]">
              {article.title}
            </h2>

            <p className="mt-3 max-w-[520px] text-sm leading-[22px] text-[#666666]">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href={article.href}
                className="flex flex-1 items-center gap-2 text-[13px] font-semibold text-[#F15A22] hover:opacity-80"
              >
                {t.readArticle}
                <ArrowRightIcon className="h-[13px] w-[13px]" />
              </Link>

              <button
                type="button"
                onClick={() => setLiked((v) => !v)}
                aria-pressed={liked}
                aria-label={t.likeAria}
                className="rounded p-1.5"
              >
                <HeartIcon
                  className={`h-4 w-4 ${liked ? "text-[#F15A22]" : "text-[#DDDDDD]"}`}
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
      </Container>
    </div>
  );
}