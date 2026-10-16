"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import { ContentCardGrid } from "@/components/Contentcard/Contentcard";

import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/Pagehero/Pagehero";

const articleImages = [
  "/images/maintain-armenian-at-home.jpg",
  "/images/bilingual-education-science.jpg",
  "/images/motivation.jpg",
  "/images/tracking-progress.jpg",
  "/images/individual-lessons.jpg",
  "/images/vocabulary-flashcards.jpg",
];

const PAGE_SIZE = 6;

function ForParents() {
  const { locale, dict } = useLanguage();
  const t = dict.forParentsPage;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  // t.articles-ը գալիս է բառարանից (en.json / hy.json), որպեսզի հոդվածների
  // բովանդակությունը թարգմանվի ընթացիկ լեզվով։
  const parentArticles = useMemo(
    () =>
      t.articles.map((a: any, index: number) => ({
        id: index + 1,
        slug: a.slug,
        image: articleImages[index],
        category: a.category,
        date: a.date,
        title: a.title,
        description: a.description,
      })),
    [t.articles],
  );

  const categories = useMemo(
    () => Array.from(new Set(parentArticles.map((a) => a.category))),
    [parentArticles],
  );

  const filtered = useMemo(() => {
    return parentArticles.filter((a) => {
      const matchesSearch =
        !search.trim() ||
        `${a.title} ${a.description}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      const matchesCategory = category === "all" || a.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [parentArticles, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const articles = paged.map((a) => ({
    id: a.id,
    href: `/${locale}/for-parents/${a.slug}`,
    image: a.image,
    category: a.category,
    date: a.date,
    title: a.title,
    description: a.description,
    ctaLabel: t.readMore,
  }));

  const foundLabel = filtered.length === 1 ? t.articleFound : t.articlesFound;

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
          {/* Search + category dropdown */}
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
                className="h-11 w-full rounded-2xl border border-[#EDEDED] bg-white pl-10 pr-4 text-sm text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50"
              />
            </div>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="h-11 w-[268px] rounded-xl border border-[#EDEDED] bg-white px-4 text-[13px] text-[#666666] outline-none"
            >
              <option value="all">{t.allCategories}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <p className="mb-6 text-[13px] text-[#999999]">
            {filtered.length} {foundLabel}
          </p>

          <ContentCardGrid
            items={articles}
            emptyState={
              <p className="py-16 text-center text-sm text-[#999999]">
                {t.noResults}
              </p>
            }
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-end gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full disabled:opacity-30"
                aria-label={dict.blog.pagination.previousAria}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`flex h-9 w-10 items-center justify-center rounded-full text-[13px] font-semibold ${
                    n === currentPage
                      ? "bg-white text-[#F15A22] shadow"
                      : "text-[#666666]"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full disabled:opacity-30"
                aria-label={dict.blog.pagination.nextAria}
              >
                ›
              </button>
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}

export default ForParents;
