"use client";

import Container from "@/components/Container";
import { ContentCardGrid } from "@/components/Contentcard/Contentcard";
import PageHero from "@/components/Pagehero/Pagehero";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useMemo, useState } from "react";

const guideImages = [
  "/images/alphabet-practice-sheet.jpg",
  "/images/intermediate-armenian.jpg",
  "/images/advanced-armenian_guites.jpg",
  "/images/individual-lessons.jpg",
  "/images/beginner-armenian.jpg",
  "/images/maintain-armenian-at-home.jpg",
];

const fallbackImage = "/images/hero.png";
const PAGE_SIZE = 6;

const FILTER_KEYS = [
  "all",
  "beginner",
  "intermediate",
  "advanced",
  "individual",
  "group",
] as const;

type FilterKey = (typeof FILTER_KEYS)[number];

function CourseGuides() {
  const { locale, dict } = useLanguage();
  const t = dict.courseGuidesPage;

  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const allGuides = useMemo(
    () =>
      t.guides.map((item: any, index: number) => ({
        id: index + 1,
        image: guideImages[index] ?? fallbackImage,
        category: item.category,
        title: item.title,
        description: item.description,
        href: `/${locale}/blog/courses_guites/${item.slug}`,
        ctaLabel: t.readMore,
        // language-independent filter key (added to each guide in the dictionary)
        filter: String(item.filter ?? "").toLowerCase(),
      })),
    [t, locale],
  );

  const filteredGuides = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allGuides.filter((guide: any) => {
      const matchesFilter =
        activeFilter === "all" || guide.filter === activeFilter;

      const matchesQuery =
        !q ||
        guide.title.toLowerCase().includes(q) ||
        guide.description.toLowerCase().includes(q) ||
        guide.category.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [allGuides, activeFilter, query]);

  // Go back to page 1 whenever the filter or search changes
  useEffect(() => {
    setPage(1);
  }, [activeFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filteredGuides.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedGuides = useMemo(
    () =>
      filteredGuides.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredGuides, currentPage],
  );

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="bg-white py-10">
        <Container>
          {/* Search + filters */}
          <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center">
            <label className="flex h-[47px] w-full items-center gap-1.5 rounded-2xl border border-[#EDEDED] bg-white px-4 md:w-80">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#AAAAAA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="5" />
                <path d="M14 14l-3.5-3.5" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder ?? "Search articles…"}
                className="w-full bg-transparent text-sm text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {FILTER_KEYS.map((key) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(key)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-white font-semibold text-[#F15A22] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                        : "font-medium text-[#666666] hover:text-[#2D2D2D]"
                    }`}
                  >
                    {t.filters?.[key] ?? key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Count */}
          <p className="text-[13px] leading-5 text-[#999999]">
            {filteredGuides.length} {t.guidesFound ?? "guides found"}
          </p>

          {/* Grid */}
          <div className="pt-6">
            {pagedGuides.length > 0 ? (
              <ContentCardGrid items={pagedGuides} />
            ) : (
              <p className="py-16 text-center text-sm text-[#666666]">
                {t.noResults ?? "No guides found"}
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="flex items-center justify-end gap-1 pt-5"
              aria-label="Pagination"
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#666666] transition hover:bg-[#F7F7F7] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 4l-4 4 4 4" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isActive = p === currentPage;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex h-9 min-w-10 items-center justify-center rounded-full bg-white px-3 text-[13px] font-semibold transition ${
                      isActive
                        ? "text-[#F15A22] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                        : "text-[#666666] hover:text-[#2D2D2D]"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#666666] transition hover:bg-[#F7F7F7] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </nav>
          )}
        </Container>
      </div>
    </main>
  );
}

export default CourseGuides;