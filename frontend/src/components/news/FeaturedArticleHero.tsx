"use client";

import { memo } from "react";
import type { NewsArticle } from "@/types/news";
import { formatPublishedDate, getCategoryLabel } from "@/utils/news-format";
import { NewsImage } from "./NewsImage";

type FeaturedArticleHeroProps = {
  article: NewsArticle;
  onClick: (articleId: string) => void;
};

export const FeaturedArticleHero = memo(function FeaturedArticleHero({
  article,
  onClick,
}: FeaturedArticleHeroProps) {
  return (
    <button
      type="button"
      aria-label={`Open article: ${article.title}`}
      onClick={() => onClick(article.id)}
      className="group relative h-[38vh] min-h-[280px] max-h-[400px] w-full overflow-hidden rounded-[var(--radius-xl)] text-left text-white [box-shadow:var(--shadow-soft)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[var(--shadow-hover)] focus:outline-none focus:ring-4 focus:ring-foreground/20 sm:min-h-[320px] lg:h-[40vh] lg:max-h-[420px]"
    >
      <NewsImage
        src={article.imageUrl}
        category={article.category}
        articleId={article.id}
        alt={article.title}
        priority
        sizes="(min-width: 1024px) 64vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/12" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,221,148,0.28),transparent_28%)]" />

      <div className="relative flex h-full min-w-0 flex-col justify-end p-4 sm:p-5 lg:p-6">
        <span className="mb-3 inline-flex w-fit rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
        <h2 className="max-w-[calc(100vw-4rem)] break-words font-display text-xl font-semibold leading-tight tracking-tight [overflow-wrap:anywhere] sm:max-w-3xl sm:text-2xl lg:text-3xl">
          {article.title}
        </h2>
        {article.aiSummary ? (
          <p className="mt-2.5 line-clamp-2 max-w-2xl text-sm leading-6 text-white/82">
            {article.aiSummary}
          </p>
        ) : null}
        <p className="mt-3 text-xs font-medium text-white/70">
          {article.sourceName} · {formatPublishedDate(article.publishedAt)}
        </p>
      </div>
    </button>
  );
});
