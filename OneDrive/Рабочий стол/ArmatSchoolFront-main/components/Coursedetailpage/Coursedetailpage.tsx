"use client";

import { useLanguage } from "@/context/LanguageContext";
import { courseDetails } from "@/data/coursedetail";
import type { CourseDetailDictionary, CourseMetaDict, CourseSlug, TeacherDict } from "@/types/course";
import { CourseHero } from "../Coursehero/Coursehero";
import { InfoTiles } from "../Infotiles/Infotiles";
import { LearningModules } from "../Learningmodules/Learningmodules";
import { PricingCard } from "../Pricingcard/Pricingcard";
import { OtherPackages } from "../Otherpackages/Otherpackages";

export function CourseDetailPage({ slug }: { slug: CourseSlug }) {
  const { dict } = useLanguage();

  const t = dict.courseDetail as CourseDetailDictionary;
  const data = courseDetails[slug];
  const text = t.courses[slug];
  const meta = dict.coursesData[slug] as CourseMetaDict; // գոյություն ունեցող key
  const teacher = dict.teachers.items[data.teacher] as TeacherDict; // գոյություն ունեցող key

  const totalLessons = data.moduleLessons.reduce((a, b) => a + b, 0);

  return (
    <main className="mx-auto flex w-full mt-20 flex-col gap-[26px] px-4 py-5 font-sans lg:flex-row lg:px-[26px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <CourseHero
          t={t}
          data={data}
          title={meta.title}
          subtitle={text.subtitle}
          description={text.description}
          teacher={teacher}
        />
        <div className="pt-7" />
        <InfoTiles
          t={t}
          data={data}
          level={meta.level}
          format={meta.format}
          totalLessons={totalLessons}
        />
        <LearningModules t={t} data={data} modules={text.modules} />
      </div>

      <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[392px]">
        <PricingCard
          t={t}
          data={data}
          level={meta.level}
          format={meta.format}
          totalLessons={totalLessons}
        />
        <OtherPackages t={t} />
      </aside>
    </main>
  );
}