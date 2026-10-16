"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { ArticleDetails } from "@/types/types";
import BackToBlogLink from "../BackToBlogLink/BackToBlogLink";
import ArticleHero from "../ArticleHero/ArticleHero";
import ArticleSidebar from "../ArticleSidebar/ArticleSidebar";
import ArticleBody from "../ArticleBody/ArticleBody";
import ArticleShareBar from "../ArticleShareBar/ArticleShareBar";
import ArticlePrevNext from "../ArticlePrevNext/ArticlePrevNext";
import RelatedArticles from "../RelatedArticles/RelatedArticles";

interface ArticleDetailsPageProps {
  article: ArticleDetails;
  backHref?: string;
  backLabel?: string;
  relatedTitle?: string;
}

export default function ArticleDetailsPage({
  article,
  backHref,
  backLabel,
  relatedTitle,
}: ArticleDetailsPageProps) {
  const { dict, locale } = useLanguage();
  const t = dict.blog;

  return (
    <div className="mx-auto w-full py-20 max-lg:px-5">
      <BackToBlogLink
        href={`/${locale}/blog`}
        label={backLabel ?? t.backToBlog}
      />

      <ArticleHero title={article.title} subtitle={article.subtitle} image={article.image} />

      <div className="flex items-start gap-12 py-12 max-lg:flex-col max-lg:gap-8">
        <ArticleSidebar
          sections={article.sections}
          tags={article.tags}
          contentsLabel={t.contents}
          tagsLabel={t.tags}
        />

        <div className="max-w-[700px] flex-1">
          <ArticleBody sections={article.sections} />
          <ArticleShareBar
            shareLabel={t.share}
            likeAria={t.likeAria}
            shareAria={t.shareAria}
          />
        </div>
      </div>

      <ArticlePrevNext
        previous={article.previous}
        next={article.next}
        previousLabel={t.previousArticle}
        nextLabel={t.nextArticle}
      />

      <RelatedArticles title={relatedTitle ?? t.relatedArticles} items={article.related} />
    </div>
  ) 
}