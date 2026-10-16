import ArticleDetailsPage from "@/components/ArticleDetailsPage/ArticleDetailsPage";
import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { PageProps } from "@/types/types";


export default async function BlogSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const article = await getArticleBySlug(slug, locale);
  if (!article) notFound();

  return <ArticleDetailsPage article={article} />;
}