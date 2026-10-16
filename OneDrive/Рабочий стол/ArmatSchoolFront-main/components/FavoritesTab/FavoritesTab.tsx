"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FAVORITES } from "@/data/dashboardProfile";
import type { FavoriteFilter, FavoriteItem, FavoriteText } from "@/types/dashboard";
import FavoriteResourceCard from "../FavoriteResourceCard/FavoriteResourceCard";
import FavoriteGuideCard from "../FavoriteGuideCard/FavoriteGuideCard";


const FILTERS: { key: FavoriteFilter; label: "all" | "courses" | "events" | "articles" | "resources" }[] = [
  { key: "all", label: "all" },
  { key: "course", label: "courses" },
  { key: "event", label: "events" },
  { key: "article", label: "articles" },
  { key: "resource", label: "resources" },
];

export default function FavoritesTab() {
  const { dict } = useLanguage();
  const t = dict.dashboard.profile.favorites;
  const texts = t.items as FavoriteText[];

  const [filter, setFilter] = useState<FavoriteFilter>("all");
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  const items: FavoriteItem[] = useMemo(
    () =>
      FAVORITES.filter((f) => !removed.has(f.id)).map((f) => ({
        ...f,
        ...(texts.find((x) => x.id === f.id) as FavoriteText),
      })),
    [texts, removed]
  );

  const visible = filter === "all" ? items : items.filter((i) => i.type === filter);

  const remove = (id: string) => setRemoved((prev) => new Set(prev).add(id));

  return (
    <section className="flex flex-col gap-5 rounded-xl border-[0.67px] border-solid border-[#EDEDED] bg-white p-7">
      {/* Filters */}
      <div role="tablist" className="flex flex-wrap items-center gap-2">
        {FILTERS.map(({ key, label }) => {
          const active = key === filter;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 rounded-full bg-white text-xs leading-[18px] ${
                active
                  ? "px-5 py-2 font-medium text-[#F15A22] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                  : "px-3.5 py-[7px] text-[#666] hover:text-[#2D2D2D]"
              }`}
            >
              {t.filters[label]}
              {key === "all" && (
                <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-[5px] text-[10px] font-semibold leading-[15px] text-[#F15A22]">
                  {items.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      {visible.length === 0 ? (
        <p className="py-10 text-center text-[13px] text-[#999]">{t.empty}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) =>
            item.type === "resource" ? (
              <FavoriteResourceCard key={item.id} item={item} onRemove={() => remove(item.id)} />
            ) : (
              <FavoriteGuideCard key={item.id} item={item} onRemove={() => remove(item.id)} />
            )
          )}
        </div>
      )}
    </section>
  );
}