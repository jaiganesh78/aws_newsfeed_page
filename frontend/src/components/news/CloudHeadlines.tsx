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
        "rounded-[var(--radius-xl)] border border-border bg-card/92 p-5 [box-shadow:var(--shadow-soft)] backdrop-blur-xl",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        Fast scan
      </p>
      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
        Cloud Headlines
      </h2>
      <div className="mt-5 divide-y divide-border/80">
        {headlines.map((article) => (
          <button
            key={article.id}
            type="button"
            aria-label={`Open article: ${article.title}`}
            onClick={() => onArticleClick(article.id)}
            className="group block w-full rounded-2xl py-4 text-left transition focus:outline-none focus:ring-4 focus:ring-foreground/10"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {getCategoryLabel(article.category)} -{" "}
              {formatRelativeTime(article.publishedAt)}
            </span>
            <span className="mt-2 block text-sm font-semibold leading-6 text-foreground transition group-hover:text-[color:var(--accent)]">
              {article.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
});
