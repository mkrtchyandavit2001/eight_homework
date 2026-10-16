"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LESSONS } from "@/data/dashboardLessons";
import type { LessonText, LessonView } from "@/types/dashboard";

export function useLessons(): LessonView[] {
  const { dict } = useLanguage();
  const texts = dict.dashboard.items as LessonText[];

  return useMemo(
    () =>
      LESSONS.map((lesson) => ({
        ...lesson,
        ...(texts.find((x) => x.id === lesson.id) as LessonText),
      })),
    [texts]
  );
}