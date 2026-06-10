"use client";

import { memo } from "react";
import type { NewsArticle } from "@/types/news";
import { formatPublishedDate, getCategoryLabel } from "@/utils/news-format";
import { NewsImage } from "./NewsImage";

type NewsCardProps = {
  article: NewsArticle;
  onClick: (articleId: string) => void;
};

export const NewsCard = memo(function NewsCard({
  article,
  onClick,
}: NewsCardProps) {
  return (
    <button
      type="button"
      aria-label={`Open article: ${article.title}`}
      onClick={() => onClick(article.id)}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card text-left [box-shadow:var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:bg-white/88 focus:outline-none focus:ring-4 focus:ring-foreground/15"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <NewsImage
          src={article.imageUrl}
          category={article.category}
          sizes="(min-width: 1024px) 24vw, (min-width: 768px) 48vw, 100vw"
          fallbackTone="light"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
          {article.title}
        </h2>
        {article.aiSummary ? (
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
