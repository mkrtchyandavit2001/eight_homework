"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { FavoriteItem } from "@/types/dashboard";
import { DashArrowRightIcon } from "../icons/Icons";
import FavoriteActions from "../FavoriteActions/FavoriteActions";


interface FavoriteGuideCardProps {
  item: FavoriteItem;
  onRemove: () => void;
}

export default function FavoriteGuideCard({ item, onRemove }: FavoriteGuideCardProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.favorites;
  const href = `/${locale}${item.href}`;

  return (
    <article className="flex min-h-[462px] flex-col overflow-hidden rounded-[22px] border border-solid border-[#EDEDED] bg-white">
      <div className="relative h-[200px] w-full shrink-0 bg-[#F7F7F7]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 303px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="pb-3 text-[11px] font-semibold uppercase leading-4 tracking-[0.6px] text-[#F15A22]">
          {item.category}
        </p>
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-[#2D2D2D]">{item.title}</h3>
        <p className="line-clamp-3 pt-3 text-[13px] leading-5 text-[#666]">{item.description}</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <Link
            href={href}
            className="flex items-center gap-2 text-[13px] font-semibold leading-5 text-[#F15A22] hover:underline"
          >
            {t.readMore}
            <DashArrowRightIcon size={13} />
          </Link>
          <FavoriteActions title={item.title} href={href} onRemove={onRemove} />
        </div>
      </div>
    </article>
  );
}