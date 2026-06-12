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
        "group relative flex aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] text-left text-white [box-shadow:var(--shadow-soft)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[var(--shadow-hover)] focus:outline-none focus:ring-4 focus:ring-foreground/20",
        size === "medium" && "aspect-[16/9]",
      )}
    >
      <NewsImage
        src={article.imageUrl}
        category={article.category}
        articleId={article.id}
        alt={article.title}
        sizes="(min-width: 1024px) 18vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/40 to-black/8" />

      <div className="relative flex w-full min-w-0 flex-col justify-end p-3.5 sm:p-4">
        <span className="mb-1.5 inline-flex w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
        <h3
          className={cn(
            "break-words font-display font-semibold leading-snug tracking-tight",
            size === "medium" ? "text-lg" : "text-[15px] leading-[1.35]",
          )}
        >
          {article.title}
        </h3>
        <p className="mt-1.5 text-[10px] font-medium text-white/70">
          {article.sourceName} · {formatPublishedDate(article.publishedAt)}
        </p>
      </div>
    </button>
  );
});
