"use client";

import { memo } from "react";
import type { NewsArticle } from "@/types/news";
import { cn } from "@/utils/cn";
import { formatPublishedDate, getCategoryLabel } from "@/utils/news-format";
import { NewsImage } from "./NewsImage";

type NewsCardProps = {
  article: NewsArticle;
  onClick: (articleId: string) => void;
  variant?: "standard" | "large" | "horizontal" | "compact";
  className?: string;
};

export const NewsCard = memo(function NewsCard({
  article,
  onClick,
  variant = "standard",
  className,
}: NewsCardProps) {
  const isHorizontal = variant === "horizontal";
  const isLarge = variant === "large";
  const isCompact = variant === "compact";

  return (
    <button
      type="button"
      aria-label={`Open article: ${article.title}`}
      onClick={() => onClick(article.id)}
      className={cn(
        "group flex h-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card text-left [box-shadow:var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:bg-white/92 hover:shadow-[0_28px_90px_rgba(28,24,18,0.18)] focus:outline-none focus:ring-4 focus:ring-foreground/15",
        isHorizontal ? "min-w-[280px] flex-row md:min-w-[360px]" : "flex-col",
        isLarge && "rounded-[var(--radius-xl)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          isHorizontal
            ? "min-h-44 w-36 shrink-0 sm:w-44"
            : "aspect-[16/10] w-full",
          isLarge && "aspect-[16/11]",
          isCompact && "aspect-[16/9]",
        )}
      >
        <NewsImage
          src={article.imageUrl}
          category={article.category}
          articleId={article.id}
          alt={article.title}
          sizes="(min-width: 1024px) 24vw, (min-width: 768px) 48vw, 100vw"
          fallbackTone="light"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          isHorizontal ? "p-4 sm:p-5" : "p-5",
          isLarge && "p-6 sm:p-7",
        )}
      >
        <h2
          className={cn(
            "font-display font-semibold leading-snug tracking-tight text-foreground",
            isLarge ? "text-3xl" : "text-xl",
            isCompact && "text-lg",
            isHorizontal && "text-lg",
          )}
        >
          {article.title}
        </h2>
        {article.aiSummary && !isCompact ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
            {article.aiSummary}
          </p>
        ) : null}
        <p className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {article.sourceName} - {formatPublishedDate(article.publishedAt)}
        </p>
      </div>
    </button>
  );
});
