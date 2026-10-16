"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { FavoriteItem } from "@/types/dashboard";
import FavoriteActions from "../FavoriteActions/FavoriteActions";

interface FavoriteResourceCardProps {
  item: FavoriteItem;
  onRemove: () => void;
}

export default function FavoriteResourceCard({ item, onRemove }: FavoriteResourceCardProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.favorites;
  const href = `/${locale}${item.href}`;

  const meta = [item.category, item.level, item.age].filter(Boolean) as string[];

  return (
    <article className="flex min-h-[462px] flex-col overflow-hidden rounded-[22px] border border-solid border-[#EDEDED] bg-white">
      <div className="relative h-[180px] w-full shrink-0 bg-[#F7F7F7]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 303px, 100vw"
          className="object-cover"
        />
        {item.format && (
          <span className="absolute right-3 top-3 rounded-lg border border-solid border-[#EDEDED] bg-white/90 px-2.5 py-1 text-[10px] font-semibold leading-[15px] tracking-[0.5px] text-[#F15A22] backdrop-blur-sm">
            {item.format}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 pb-3 text-[11px] leading-4 text-[#999]">
          {meta.map((part, i) => (
            <span key={`${part}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-base text-[#DDD]">·</span>}
              <span
                className={
                  i === 0
                    ? "text-[10px] font-semibold uppercase leading-[15px] tracking-[0.6px] text-[#F15A22]"
                    : ""
                }
              >
                {part}
              </span>
            </span>
          ))}
        </p>

        <h3 className="line-clamp-2 pb-2 text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">
          {item.title}
        </h3>
        <p className="line-clamp-4 text-[13px] leading-5 text-[#666]">{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <div className="flex items-center gap-2">
            {typeof item.price === "number" && (
              <span className="text-xl font-semibold leading-[30px] text-[#F15A22]">${item.price}</span>
            )}
            <Link href={href} className="text-base font-semibold leading-6 text-[#F15A22] hover:underline">
              {t.viewResource}
            </Link>
          </div>
          <FavoriteActions title={item.title} href={href} onRemove={onRemove} />
        </div>
      </div>
    </article>
  );
}