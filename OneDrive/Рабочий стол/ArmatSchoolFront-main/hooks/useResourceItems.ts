"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const resourceImages = [
  "/images/alphabet-practice-sheet.jpg",
  "/images/vocabulary-flashcards.jpg",
  "/images/alphabet-chart-poster.jpg",
  "/images/individual-lessons.jpg",
  "/images/tracking-progress.jpg",
  "/images/advanced-armenian_guites.jpg",
];

export interface ResourceItem {
  id: number;
  slug: string;
  image: string;
  category: string;
  level: string;
  age: string;
  title: string;
  description: string;
  price?: string;
  // ոչ պարտադիր դաշտեր՝ en.json / hy.json-ից
  format?: string;
  pages?: number | string;
  language?: string;
  updatedAt?: string;
}

export function useResourceItems(): ResourceItem[] {
  const { dict } = useLanguage();
  const items = dict.resourcesPage.items;

  return useMemo(
    () =>
      items.map((r: any, index: number) => ({
        id: index + 1,
        slug: r.slug,
        image: resourceImages[index] ?? resourceImages[0],
        category: r.category,
        level: r.level,
        age: r.age,
        title: r.title,
        description: r.description,
        price: r.price,
        format: r.format,
        pages: r.pages,
        language: r.language,
        updatedAt: r.updatedAt,
      })),
    [items],
  );
}