"use client";

import ArticleGrid from "@/components/Articlegrid/Articlegrid";
import FeaturedArticle from "@/components/Featuredarticle/Featuredarticle";
import MoreToExplore from "@/components/Moretoexplore/Moretoexplore";
import ResourcesSection from "@/components/Resourcessection/Resourcessection";
import StoriesHeader from "@/components/Storiesheader/Storiesheader";
import { useLanguage } from "@/context/LanguageContext";
import type { Article, ExploreCategory, Resource } from "@/types/types";
import { useState } from "react";

const featuredImage = "/images/authentic-armenia.png";
const fallbackImage = "/images/hero.png";

const articleImages = [
  "/images/maintain-armenian-at-home.jpg",
  "/images/eastern-vs-western-armenian.jpg",
  "/images/bilingual-education-science.jpg",
];

const resourceImages = [
  "/images/alphabet-practice-sheet.jpg",
  "/images/vocabulary-flashcards.jpg",
  "/images/alphabet-chart-poster.jpg",
];

const resourceSlugs = [
  "armenian-alphabet-practice-sheet",
  "everyday-vocabulary-flashcards",
  "armenian-alphabet-chart-poster",
];

export default function StoriesPage() {
  const { dict, locale } = useLanguage();
  const t = dict.blog;

  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle: Article = {
    id: t.sampleArticles.featured.slug,
    category: t.sampleArticles.featured.category,
    date: t.sampleArticles.featured.date,
    title: t.sampleArticles.featured.title,
    excerpt: t.sampleArticles.featured.excerpt,
    image: featuredImage,
    href: `/${locale}/blog/${t.sampleArticles.featured.slug}`,
  };

  const articles: Article[] = t.sampleArticles.items.map(
    (item: any, index: number) => ({
      id: item.slug,
      category: item.category,
      date: item.date,
      title: item.title,
      excerpt: item.excerpt,
      image: articleImages[index] ?? fallbackImage,
      href: `/${locale}/blog/${item.slug}`,
    }),
  );

  const resources: Resource[] = t.sampleResources.map(
    (item: any, index: number) => ({
      id: `resource-${index + 1}`,
      category: item.category,
      level: item.level,
      age: item.age,
      title: item.title,
      description: item.description,
      image: resourceImages[index] ?? fallbackImage,
      format: "PDF",
      popular: index === 0,
      href: `/${locale}/resources/${resourceSlugs[index]}`,
    }),
  );

  const exploreCategories: ExploreCategory[] = [
    {
      id: "explore-1",
      title: t.moreToExplore.items.learningResources.title,
      description: t.moreToExplore.items.learningResources.description,
      href: `/${locale}/blog/resources`,
      icon: "alphabet",
    },
    {
      id: "explore-2",
      title: t.moreToExplore.items.courseGuides.title,
      description: t.moreToExplore.items.courseGuides.description,
      href: `/${locale}/blog/courses_guites`,
      icon: "book",
    },
    {
      id: "explore-3",
      title: t.moreToExplore.items.forParents.title,
      description: t.moreToExplore.items.forParents.description,
      href: `/${locale}/blog/for_parents`,
      icon: "parents",
    },
  ];

  return (
    <main>
      <div className="flex flex-col gap-8 py-10">
        <StoriesHeader />
        <div className="bg-white">
          <FeaturedArticle
            article={featuredArticle}
            viewAllHref={`/${locale}/blog/resources`}
            activeCategory={category}
            onCategoryChange={setCategory}
            onSearch={setSearchQuery}
          />

          <ArticleGrid
            articles={articles}
            currentPage={page}
            totalPages={3}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ResourcesSection resources={resources} />
      <MoreToExplore categories={exploreCategories} />
    </main>
  );
}