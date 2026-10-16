import { CourseDetailPage } from "@/components/Coursedetailpage/Coursedetailpage";
import { resolveCourseSlug } from "@/data/coursedetail";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const resolved = resolveCourseSlug(slug);

  if (!resolved) notFound();

  return <CourseDetailPage slug={resolved} />;
}