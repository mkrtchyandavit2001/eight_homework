"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import { ContentCardGrid } from "@/components/Contentcard/Contentcard";
import PageHero from "@/components/Pagehero/Pagehero";
import { useLanguage } from "@/context/LanguageContext";
import { useResourceItems } from "@/hooks/useResourceItems";
import Pagination from "@/components/Pagination/Pagination";
import type { Format } from "@/types/types";

const PAGE_SIZE = 6;

function FilterSelect({
  label,
  allLabel,
  value,
  onChange,
  options,
}: {
  label: string;
  allLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#999999]">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[42px] rounded-xl border border-[#EDEDED] bg-white px-3.5 text-[13px] font-medium text-[#2D2D2D] outline-none"
      >
        <option value="all">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ResourcesPage() {
  const { locale, dict } = useLanguage();
  const t = dict.resourcesPage;
  const resourceItems = useResourceItems();

  const [search, setSearch] = useState("");
  const [format, setFormat] = useState<Format>("all");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [age, setAge] = useState("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(resourceItems.map((r) => r.category))),
    [resourceItems],
  );
  const levels = useMemo(
    () => Array.from(new Set(resourceItems.map((r) => r.level))),
    [resourceItems],
  );
  const ages = useMemo(
    () => Array.from(new Set(resourceItems.map((r) => r.age))),
    [resourceItems],
  );

  const filtered = useMemo(() => {
    return resourceItems.filter((r) => {
      const matchesSearch =
        !search.trim() ||
        `${r.title} ${r.description}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      const matchesFormat =
        format === "all" || (format === "paid" ? !!r.price : !r.price);
      const matchesCategory = category === "all" || r.category === category;
      const matchesLevel = level === "all" || r.level === level;
      const matchesAge = age === "all" || r.age === age;

      return (
        matchesSearch &&
        matchesFormat &&
        matchesCategory &&
        matchesLevel &&
        matchesAge
      );
    });
  }, [resourceItems, search, format, category, level, age]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const resources = paged.map((r) => ({
    id: r.id,
    href: `/${locale}/blog/resources/${r.slug}`,
    image: r.image,
    cornerBadge: "PDF",
    category: r.category,
    tags: [r.level, r.age],
    title: r.title,
    description: r.description,
    price: r.price,
    ctaLabel: t.viewResource,
    padding: 24 as const,
    imageHeight: 180,
  }));

  const foundLabel = filtered.length === 1 ? t.resourceFound : t.resourcesFound;

  return (
    <main>
      <PageHero
        breadcrumbs={[
          { label: dict.blog.pageTitle, href: `/${locale}/blog` },
          { label: t.breadcrumb },
        ]}
        title={t.title}
        description={t.description}
      />

      <div className="mt-10 bg-white py-10">
        <Container>
          {/* Search + Free/Paid toggle */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full max-w-[320px]">
              <svg
                aria-hidden
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                className="absolute left-4 top-1/2 -translate-y-1/2"
              >
                <circle
                  cx="6.2"
                  cy="6.2"
                  r="4.8"
                  stroke="#AAAAAA"
                  strokeWidth="1.25"
                />
                <path
                  d="M10.4 10.4 13 13"
                  stroke="#AAAAAA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={t.searchPlaceholder}
                className="h-[47px] w-full rounded-2xl border border-[#EDEDED] bg-white pl-10 pr-4 text-sm text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50"
              />
            </div>

            <div className="flex items-center gap-1 rounded-full border border-[#EDEDED] bg-white p-1">
              {(["all", "free", "paid"] as Format[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setFormat(opt);
                    setPage(1);
                  }}
                  className={`rounded-full px-5 py-2 text-[13px] font-semibold capitalize transition-colors ${
                    format === opt
                      ? "bg-white text-[#F15A22] shadow"
                      : "text-[#666666]"
                  }`}
                >
                  {opt === "all" ? t.all : opt === "free" ? t.free : t.paid}
                </button>
              ))}
            </div>
          </div>

          {/* Category / Level / Age filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <FilterSelect
              label={t.categoryLabel}
              allLabel={t.all}
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
              options={categories}
            />
            <FilterSelect
              label={t.levelLabel}
              allLabel={t.all}
              value={level}
              onChange={(v) => {
                setLevel(v);
                setPage(1);
              }}
              options={levels}
            />
            <FilterSelect
              label={t.ageLabel}
              allLabel={t.all}
              value={age}
              onChange={(v) => {
                setAge(v);
                setPage(1);
              }}
              options={ages}
            />
          </div>

          <p className="mb-6 text-[13px] text-[#999999]">
            {filtered.length} {foundLabel}
          </p>

          <ContentCardGrid
            items={resources}
            emptyState={
              <p className="py-16 text-center text-sm text-[#999999]">
                {t.noResults}
              </p>
            }
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Container>
      </div>
    </main>
  );
}
