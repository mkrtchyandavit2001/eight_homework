"use client";

import type { Article, ArticleGridProps } from "@/types/types";
import ArticleCard from "../Articlecard/Articlecard";
import Pagination from "../Pagination/Pagination";
import Container from "../Container";


export default function ArticleGrid({
  articles,
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}: ArticleGridProps) {
  return (
    <div className="w-full pt-10">
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Container>
    </div>
  );
}
