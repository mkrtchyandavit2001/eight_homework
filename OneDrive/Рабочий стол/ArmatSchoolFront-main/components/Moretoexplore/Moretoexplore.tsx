import type { ExploreCategory, MoreToExploreProps } from "@/types/types";
import SectionHeader from "../Sectionheader/Sectionheader";
import ExploreCard from "../Explorecard/Explorecard";
import Container from "../Container";
import Pagination from "../Pagination/Pagination";
import { useMemo, useState } from "react";



export default function MoreToExplore({ categories }: MoreToExploreProps) {
 
  return (
    <section className="w-full bg-white  py-10">
      <Container>
        <SectionHeader
          title="More to Explore"
          description="Helpful materials designed to support your Armenian learning journey."
        />

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <ExploreCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
