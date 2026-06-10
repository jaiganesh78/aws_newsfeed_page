"use client";

import { memo } from "react";
import type { NewsArticle } from "@/types/news";
import {
  formatRelativeTime,
  getCategoryLabel,
  getCloudHeadlines,
} from "@/utils/news-format";
import { cn } from "@/utils/cn";

type CloudHeadlinesProps = {
  articles: NewsArticle[];
  onArticleClick: (articleId: string) => void;
  className?: string;
};

export const CloudHeadlines = memo(function CloudHeadlines({
  articles,
  onArticleClick,
  className,
}: CloudHeadlinesProps) {
  const headlines = getCloudHeadlines(articles, 10);

  return (
    <aside
      aria-label="Cloud headlines"
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-card p-5 [box-shadow:var(--shadow-soft)]",
        className,
      )}
    >
      <h2 className="font-display text-xl font-semibold tracking-tight">
        Cloud Headlines
      </h2>
      <div className="mt-5 divide-y divide-border">
        {headlines.map((article) => (
          <button
            key={article.id}
            type="button"
            aria-label={`Open article: ${article.title}`}
            onClick={() => onArticleClick(article.id)}
            className="group block w-full py-4 text-left focus:outline-none focus:ring-4 focus:ring-foreground/10"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {getCategoryLabel(article.category)} -{" "}
              {formatRelativeTime(article.publishedAt)}
            </span>
            <span className="mt-2 block text-sm font-semibold leading-6 text-foreground transition group-hover:text-muted">
              {article.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
});
