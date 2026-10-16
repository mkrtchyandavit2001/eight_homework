"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { ResourcesSectionProps } from "@/types/types";
import { useState } from "react";
import SectionHeader from "../Sectionheader/Sectionheader";
import FilterTabs from "../Filtertabs/Filtertabs";
import ResourceCard from "../Resourcecard/Resourcecard";
import Container from "../Container";

export default function ResourcesSection({ resources }: ResourcesSectionProps) {
  const { dict, locale } = useLanguage();
  const t = dict.blog.resources;
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <section className="w-full bg-[#F9FAFB] py-16 lg:py-24">
      <Container>
        <SectionHeader
          title={t.heading}
          description={t.subtitle}
          viewAllLabel={t.viewAll}
          viewAllHref={`/${locale}/blog/resources`}
        />

        <div className="mt-6">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </Container>
    </section>
  );
}