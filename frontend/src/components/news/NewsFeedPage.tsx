"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useFeed } from "@/hooks/useFeed";
import { CloudHeadlines } from "./CloudHeadlines";
import { ErrorState } from "./ErrorState";
import { FeaturedArticleHero } from "./FeaturedArticleHero";
import { FeaturedCompactCard } from "./FeaturedCompactCard";
import { FeedSkeleton } from "./FeedSkeleton";
import { NewsCard } from "./NewsCard";

const ArticleDetailModal = dynamic(
  () =>
    import("./ArticleDetailModal").then((module) => module.ArticleDetailModal),
  {
    ssr: false,
  },
);

export function NewsFeedPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );
  const { data, isLoading, isError, refetch } = useFeed();
  const articles = data?.items ?? [];
  const mainArticle = articles[0];
  const compactArticles = articles.slice(1, 4);
  const desktopGridArticles = articles.slice(4);
  const responsiveGridArticles = articles.slice(1);

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
        <ErrorState
          onRetry={() => {
            void refetch();
          }}
        />
      </main>
    );
  }

  if (mainArticle === undefined) {
    return (
      <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
        <ErrorState
          title="No news available"
          message="The newsroom is ready, but there are no articles to display yet."
          actionLabel="Refresh news"
          onRetry={() => {
            void refetch();
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="sr-only">AWS Community Newsroom</h1>

      <div className="mx-auto max-w-[1440px]">
        <section
          aria-label="Featured editorial stories"
          className="grid gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)]"
        >
          <FeaturedArticleHero
            article={mainArticle}
            onClick={setSelectedArticleId}
          />

          <div className="hidden grid-rows-[1fr_1.15fr] gap-4 lg:grid">
            <div className="grid grid-cols-2 gap-4">
              {compactArticles.slice(0, 2).map((article) => (
                <FeaturedCompactCard
                  key={article.id}
                  article={article}
                  onClick={setSelectedArticleId}
                />
              ))}
            </div>

            {compactArticles[2] ? (
              <FeaturedCompactCard
                article={compactArticles[2]}
                onClick={setSelectedArticleId}
                size="medium"
              />
            ) : null}
          </div>
        </section>

        <section
          aria-label="Latest news"
          className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]"
        >
          <div className="hidden gap-5 lg:grid lg:grid-cols-3">
            {desktopGridArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={setSelectedArticleId}
              />
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:hidden">
            {responsiveGridArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={setSelectedArticleId}
              />
            ))}
          </div>

          <CloudHeadlines
            articles={articles}
            onArticleClick={setSelectedArticleId}
            className="hidden lg:sticky lg:top-6 lg:block lg:self-start"
          />
        </section>

        <CloudHeadlines
          articles={articles}
          onArticleClick={setSelectedArticleId}
          className="mt-8 lg:hidden"
        />
      </div>

      {selectedArticleId !== null ? (
        <ArticleDetailModal
          articleId={selectedArticleId}
          onClose={() => setSelectedArticleId(null)}
        />
      ) : null}
    </main>
  );
}
