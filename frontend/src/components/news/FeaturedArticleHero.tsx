"use client";

import Image from "next/image";
import { memo } from "react";
import type { NewsArticle } from "@/types/news";
import { formatPublishedDate, getCategoryLabel } from "@/utils/news-format";
import { NewsImageFallback } from "./NewsImageFallback";

type FeaturedArticleHeroProps = {
  article: NewsArticle;
  onClick: (articleId: string) => void;
};

export const FeaturedArticleHero = memo(function FeaturedArticleHero({
  article,
  onClick,
}: FeaturedArticleHeroProps) {
  const imageUrl = article.imageUrl;

  return (
    <button
      type="button"
      aria-label={`Open article: ${article.title}`}
      onClick={() => onClick(article.id)}
      className="group relative min-h-[460px] w-full overflow-hidden rounded-[var(--radius-xl)] text-left text-white [box-shadow:var(--shadow-soft)] transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-foreground/20 lg:min-h-[560px]"
    >
      {imageUrl !== null ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <NewsImageFallback category={article.category} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,221,148,0.34),transparent_28%)]" />

      <div className="relative flex h-full min-h-[460px] flex-col justify-end p-6 sm:p-8 lg:min-h-[560px] lg:p-10">
        <span className="mb-5 inline-flex w-fit rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
          {getCategoryLabel(article.category)}
        </span>
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/82">
          {article.aiSummary ?? "Summary unavailable."}
        </p>
        <p className="mt-6 text-sm font-medium text-white/78">
          {article.sourceName} - {formatPublishedDate(article.publishedAt)}
        </p>
      </div>
    </button>
  );
});
