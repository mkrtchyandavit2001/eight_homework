"use client";

import { useRef, useState } from "react";
import type { CoursesSectionProps } from "@/types/types";
import { courses as defaultCourses } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import Pagination from "../Pagination/Pagination";
import CourseCard from "../CourseCard/CourseCard";
import SectionHeader from "../CoursesSectionHeader/CoursesSectionHeader";
import SecurePaymentNote from "../SecurePaymentNote/SecurePaymentNote";

const PER_PAGE = 6;

export default function CoursesSection({
  courses = defaultCourses,
  eyebrow,
  title,
  paymentNote,
}: CoursesSectionProps) {
  const { dict } = useLanguage();
  const t = dict.coursesSection;
  const translations = dict.coursesData ?? {};

  const localizedCourses = courses.map((course) => {
    const key = course.id.replace(/-\d+$/, "");
    const translated = translations[key];
    return translated ? { ...course, ...translated } : course;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(localizedCourses.length / PER_PAGE));
  const visible = localizedCourses.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  const handlePageChange = (next: number) => {
    if (next >= 1 && next <= totalPages) {
      setPage(next);
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto box-border flex w-full flex-col justify-center pb-10 pt-10 mt-10 min-[720px]:pt-12 min-[1100px]:pt-[60px]"
    >
      <SectionHeader
        eyebrow={eyebrow ?? t.eyebrow}
        title={title ?? t.title}
        description={""}
      />

      <div className="grid grid-cols-1 justify-center justify-items-center gap-6 pt-10 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3 min-[1100px]:gap-6">
        {visible.map(({ id, ...course }) => (
          <CourseCard key={id} {...course} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <SecurePaymentNote>{paymentNote ?? t.paymentNote}</SecurePaymentNote>
    </section>
  );
}
