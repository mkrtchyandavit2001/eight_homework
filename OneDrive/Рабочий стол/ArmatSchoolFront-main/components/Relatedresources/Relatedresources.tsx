"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Pagination from "../Pagination/Pagination";
import ResourceCard from "../Resource_card/Resourcecard";
import type { RelatedResourcesProps } from "@/types/types";



export default function RelatedResources({ items, pageSize = 2 }: RelatedResourcesProps) {
  const { locale, dict } = useLanguage();
  const t = dict.resourcesPage;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const visibleItems = items.slice(start, start + pageSize);

  if (items.length === 0) return null;

  return (
    <section className="flex w-full flex-col px-10 pt-10 pb-10">
      <h2 className="text-2xl font-semibold leading-[150%] text-[#2D2D2D]">{t.detail.youMayAlsoLike}</h2>

      <div className="grid max-w-[810px] grid-cols-1 gap-9 pt-4 sm:grid-cols-2">
        {visibleItems.map((item) => (
          <ResourceCard
            key={item.slug}
            item={item}
            href={`/${locale}/blog/resources/${item.slug}`}
            ctaLabel={t.viewResource}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </section>
  );
}