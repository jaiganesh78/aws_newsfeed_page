"use client";

import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useArticle } from "@/hooks/useArticle";
import {
  formatPublishedDate,
  getCategoryLabel,
  splitArticleContent,
} from "@/utils/news-format";
import { ErrorState } from "./ErrorState";

type ArticleDetailModalProps = {
  articleId: string;
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function ArticleDetailModal({
  articleId,
  onClose,
}: ArticleDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { data: article, isLoading, isError, refetch } = useArticle(articleId);
  const paragraphs = splitArticleContent(article?.fullContent ?? null);

  useEffect(() => {
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || dialogRef.current === null) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-foreground/45 backdrop-blur-md sm:items-center sm:justify-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-detail-title"
        aria-describedby={article ? "article-detail-summary" : undefined}
        tabIndex={-1}
        className="flex h-[100dvh] w-full flex-col overflow-hidden bg-background shadow-2xl outline-none sm:h-auto sm:max-h-[80vh] sm:max-w-[900px] sm:rounded-[var(--radius-xl)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Article
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close article detail"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white/70 text-muted transition hover:text-foreground focus:outline-none focus:ring-4 focus:ring-foreground/15"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {isLoading ? (
            <div className="mx-auto max-w-3xl">
              <div className="skeleton-shimmer h-7 w-28 rounded-full bg-white/60" />
              <div className="skeleton-shimmer mt-5 h-12 rounded-2xl bg-white/60" />
              <div className="skeleton-shimmer mt-4 h-12 w-4/5 rounded-2xl bg-white/60" />
              <div className="skeleton-shimmer mt-8 h-28 rounded-[var(--radius-lg)] bg-white/60" />
              <div className="skeleton-shimmer mt-8 h-64 rounded-[var(--radius-lg)] bg-white/60" />
            </div>
          ) : null}

          {isError ? (
            <ErrorState
              title="Unable to load article"
              message="The article detail request failed. Please retry or open another story."
              onRetry={() => {
                void refetch();
              }}
            />
          ) : null}

          {article ? (
            <article className="mx-auto max-w-3xl">
              <span className="inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-background">
                {getCategoryLabel(article.category)}
              </span>
              <h1
                id="article-detail-title"
                className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
              >
                {article.title}
              </h1>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                {article.sourceName} - {formatPublishedDate(article.publishedAt)}
              </p>

              {article.description ? (
                <p className="mt-6 rounded-[var(--radius-lg)] border border-border bg-card p-5 text-lg leading-8 text-foreground/78">
                  {article.description}
                </p>
              ) : null}

              <section className="mt-8 rounded-[var(--radius-lg)] border border-border bg-card p-5">
                <h2 className="font-display text-xl font-semibold">
                  AI Summary
                </h2>
                <p
                  id="article-detail-summary"
                  className="mt-3 text-base leading-8 text-muted"
                >
                  {article.aiSummary ?? "Summary unavailable."}
                </p>
              </section>

              <section className="mt-8">
                <h2 className="font-display text-xl font-semibold">
                  Full Article
                </h2>
                {paragraphs.length > 0 ? (
                  <div className="mt-4 space-y-5 text-base leading-8 text-foreground/82">
                    {paragraphs.map((paragraph, index) => (
                      <p key={`${article.id}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-[var(--radius-lg)] border border-border bg-card p-5 text-base text-muted">
                    Full article unavailable.
                  </p>
                )}
              </section>

              <a
                href={article.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-foreground/15"
              >
                Read Original Article
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </article>
          ) : null}
        </div>
      </div>
    </div>
  );
}
