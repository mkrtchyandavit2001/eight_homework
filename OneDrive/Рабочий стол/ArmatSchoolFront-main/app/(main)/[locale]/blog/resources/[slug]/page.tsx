"use client";

import { useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import RelatedResources from "@/components/Relatedresources/Relatedresources";
import ResourceDetail from "@/components/Resourcedetail/Resourcedetail";
import { useResourceItems } from "@/hooks/useResourceItems";

export default function ResourcePage() {
  const { slug } = useParams<{ slug: string }>();
  const items = useResourceItems();

  const item = items.find((r) => r.slug === slug);

  const related = useMemo(() => {
    if (!item) return [];
    return items
      .filter((r) => r.slug !== item.slug)
      .sort((a, b) => Number(b.category === item.category) - Number(a.category === item.category));
  }, [items, item]);

  if (!item) notFound();

  return (
      <main className="flex w-full flex-col items-center bg-white pt-15">
        <ResourceDetail item={item} />
        <RelatedResources key={item.slug} items={related} />
      </main>
  );
}