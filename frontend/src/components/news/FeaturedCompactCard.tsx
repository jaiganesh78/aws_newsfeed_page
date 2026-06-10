"use client";

import { memo } from "react";
import type { NewsArticle } from "@/types/news";
import { formatPublishedDate, getCategoryLabel } from "@/utils/news-format";
import { cn } from "@/utils/cn";
import { NewsImage } from "./NewsImage";

type FeaturedCompactCardProps = {
  article: NewsArticle;
  onClick: (articleId: string) => void;
  size?: "small" | "medium";
};

export const FeaturedCompactCard = memo(function FeaturedCompactCard({
  article,
  onClick,
  size = "small",
}: FeaturedCompactCardProps) {
  return (
    <button
      type="button"
      aria-label={`Open article: ${article.title}`}
      onClick={() => onClick(article.id)}
      className={cn(
        "group relative flex min-h-48 overflow-hidden rounded-[var(--radius-lg)] text-left text-white [box-shadow:var(--shadow-soft)] transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-foreground/20",
        size === "medium" && "min-h-64",
      )}
    >
      <NewsImage
        src={article.imageUrl}
        category={article.category}
        articleId={article.id}
        alt={article.title}
        sizes="(min-width: 1024px) 18vw, 50vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-black/10" />

      <div className="relative flex w-full flex-col justify-end p-5">
        <span className="mb-3 inline-flex w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
        <h3
          className={cn(
            "font-display font-semibold leading-snug tracking-tight",
            size === "medium" ? "text-xl" : "text-lg",
          )}
        >
          {article.title}
        </h3>
        <p className="mt-3 text-xs font-medium text-white/75">
          {article.sourceName} - {formatPublishedDate(article.publishedAt)}
        </p>
      </div>
    </button>
  );
});
