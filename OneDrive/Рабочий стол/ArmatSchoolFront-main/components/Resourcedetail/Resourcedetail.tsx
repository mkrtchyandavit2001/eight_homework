"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { ResourceDetailProps } from "@/types/types";



export default function ResourceDetail({ item, onAction }: ResourceDetailProps) {
  const { locale, dict } = useLanguage();
  const t = dict.resourcesPage;
  const d = t.detail;
  const isPaid = !!item.price;

  const details = [
    { term: d.suitableFor, value: item.age },
    { term: d.level, value: item.level },
    item.language && { term: d.language, value: item.language },
    { term: d.fileFormat, value: item.format ?? "PDF", medium: true },
    item.pages && { term: d.pages, value: `${item.pages} ${d.pagesUnit}` },
    item.updatedAt && { term: d.lastUpdated, value: item.updatedAt },
  ].filter(Boolean) as { term: string; value: string; medium?: boolean }[];

  return (
    <section className="w-full border-b border-[#EDEDED] pt-5 pb-10">
      <div className="mx-auto flex w-full flex-col px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[13px] leading-5">
          <Link href={`/${locale}/blog`} className="font-medium text-[#999]">
            {dict.blog.pageTitle}
          </Link>
          <span className="text-[#DDD]">/</span>
          <Link href={`/${locale}/blog/resources`} className="font-medium text-[#999]">
            {t.breadcrumb}
          </Link>
          <span className="text-[#DDD]">/</span>
          <span className="max-w-[220px] truncate font-medium text-[#2D2D2D]">{item.title}</span>
        </nav>

        {/* Image | Text | Sidebar */}
        <div className="flex flex-col gap-5 pt-5 lg:flex-row lg:items-start">
          {/* Image: կլորացված միայն ձախ անկյունները */}
          <div className="relative h-[260px] w-full shrink-0 overflow-hidden rounded-[22px] bg-[#F5F5F5] sm:h-[334px] lg:w-[415px] lg:rounded-r-none">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 415px"
              className="object-cover"
            />
            <span className="absolute left-[9px] top-3 flex h-[23px] items-center rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase leading-[15px] tracking-[0.6px] text-[#F15A22]">
              {isPaid ? d.premium : d.free}
            </span>
          </div>

          {/* Text */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 lg:min-h-[334px]">
            <h1 className="text-[28px] font-medium leading-[150%] tracking-[-0.6px] text-[#2D2D2D]">
              {item.title}
            </h1>

            <p className="text-sm leading-[150%] text-[#666]">{item.description}</p>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-end gap-3">
                <span className="text-[28px] font-semibold leading-[42px] text-[#2D2D2D]">
                  {isPaid ? item.price : d.free}
                </span>
                {isPaid && (
                  <span className="pb-1 text-xs leading-[18px] text-[#999]">{d.oneTimePayment}</span>
                )}
              </div>

              <button
                type="button"
                onClick={onAction}
                className="flex h-11 w-full max-w-[250px] items-center justify-center rounded-lg border border-[#F15A22] px-6 py-3.5 text-sm font-semibold leading-[21px] text-[#F15A22] transition hover:bg-[#F15A22] hover:text-white"
              >
                {isPaid ? d.buy : d.download}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex w-full shrink-0 flex-col rounded-[22px] border border-[#EDEDED] bg-white p-6 lg:ml-10 lg:w-[360px]">
            <h3 className="text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">{d.detailsTitle}</h3>
            <dl className="flex flex-col pt-4">
              {details.map((row, i) => (
                <div
                  key={row.term}
                  className={`flex items-center justify-between gap-4 py-2.5 ${
                    i < details.length - 1 ? "border-b border-[#EDEDED]" : ""
                  }`}
                >
                  <dt className="text-[13px] leading-5 text-[#999]">{row.term}</dt>
                  <dd className={`text-right text-[13px] leading-5 text-[#2D2D2D] ${row.medium ? "font-medium" : ""}`}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}