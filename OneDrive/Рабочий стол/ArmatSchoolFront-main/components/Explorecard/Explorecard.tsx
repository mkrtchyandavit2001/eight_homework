"use client";

import { useLanguage } from "@/context/LanguageContext";
import { AlphabetIcon, ArrowRightIcon, BookIcon, ParentsIcon } from "../icons/Icons";
import type { ExploreCardProps } from "@/types/types";

const ICONS = {
  alphabet: AlphabetIcon,
  book: BookIcon,
  parents: ParentsIcon,
};



export default function ExploreCard({ category }: ExploreCardProps) {
  const { dict } = useLanguage();
  const Icon = ICONS[category.icon];

  return (
    <div className="flex flex-1 flex-col rounded-[22px] border border-[#EDEDED] bg-white p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F7F7]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-5 text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">
        {category.title}
      </h3>

      <p className="mt-2 flex-1 text-[13px] leading-5 text-[#666666]">
        {category.description}
      </p>

      <a
        href={category.href}
        className="mt-5 flex items-center gap-2 text-[13px] font-medium text-[#F15A22] hover:opacity-80"
      >
        {dict.blog.moreToExplore.explore}
        <ArrowRightIcon className="h-[13px] w-[13px]" />
      </a>
    </div>
  );
}
