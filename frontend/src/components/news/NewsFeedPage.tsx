"use client";

import dynamic from "next/dynamic";
import { type ReactNode, useState } from "react";
import { useFeed } from "@/hooks/useFeed";
import type { NewsArticle } from "@/types/news";
import { cn } from "@/utils/cn";
import { isCloudCategory } from "@/utils/news-format";
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
  const newsroom = buildNewsroomSections(articles);

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

  if (newsroom.featured === undefined) {
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
    <main className="min-h-screen overflow-x-hidden bg-background bg-[radial-gradient(circle_at_8%_0%,rgba(217,184,108,0.24),transparent_28%),radial-gradient(circle_at_92%_10%,rgba(80,201,153,0.16),transparent_30%)] px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="sr-only">AWS Community Newsroom</h1>

      <div className="mx-auto max-w-[1440px]">
        <header className="mb-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            AWS Community Newsroom
          </p>
          <p className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground">
            Cloud intelligence, curated for builders.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            A dynamic editorial feed across cloud, AI, security, engineering,
            and emerging technology.
          </p>
        </header>

        <section
          aria-label="Featured editorial stories"
          className="grid gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)]"
        >
          <FeaturedArticleHero
            article={newsroom.featured}
            onClick={setSelectedArticleId}
          />

          <div className="hidden grid-rows-[1fr_1.15fr] gap-4 lg:grid">
            <div className="grid grid-cols-2 gap-4">
              {newsroom.editorHighlights.slice(0, 2).map((article) => (
                <FeaturedCompactCard
                  key={article.id}
                  article={article}
                  onClick={setSelectedArticleId}
                />
              ))}
            </div>

            {newsroom.editorHighlights[2] ? (
              <FeaturedCompactCard
                article={newsroom.editorHighlights[2]}
                onClick={setSelectedArticleId}
                size="medium"
              />
            ) : null}
          </div>
        </section>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:hidden">
          {newsroom.editorHighlights.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={setSelectedArticleId}
            />
          ))}
        </div>

        <EditorialSection
          title="Cloud Spotlight"
          subtitle="Major updates from AWS, Azure, GCP, and cloud-native ecosystems."
          className="mt-14"
        >
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            {newsroom.cloudSpotlight[0] ? (
              <NewsCard
                article={newsroom.cloudSpotlight[0]}
                onClick={setSelectedArticleId}
                variant="large"
              />
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {newsroom.cloudSpotlight.slice(1, 5).map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={setSelectedArticleId}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </EditorialSection>

        {newsroom.aiEmerging.length > 0 ? (
          <EditorialSection
            title="AI & Emerging Tech"
            subtitle="Signals from AI platforms, agents, machine learning, and developer tools."
            className="mt-14"
          >
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {newsroom.aiEmerging.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={setSelectedArticleId}
                  variant={index === 0 ? "large" : "standard"}
                  className={index === 0 ? "lg:col-span-2" : undefined}
                />
              ))}
            </div>
          </EditorialSection>
        ) : null}

        {newsroom.securityWatch.length > 0 ? (
          <EditorialSection
            title="Security Watch"
            subtitle="Privacy, cyber resilience, vulnerabilities, and platform trust updates."
            className="mt-14"
          >
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-5">
                {newsroom.securityWatch.slice(0, 2).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={setSelectedArticleId}
                    variant="horizontal"
                  />
                ))}
              </div>
              {newsroom.securityWatch[2] ? (
                <NewsCard
                  article={newsroom.securityWatch[2]}
                  onClick={setSelectedArticleId}
                  variant="large"
                />
              ) : null}
            </div>
          </EditorialSection>
        ) : null}

        <EditorialSection
          title="Trending Stories"
          subtitle="Fast-moving stories worth scanning before your next build session."
          className="mt-14"
        >
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
            {newsroom.trending.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={setSelectedArticleId}
                variant="horizontal"
                className="max-w-[420px] shrink-0"
              />
            ))}
          </div>
        </EditorialSection>

        <section
          aria-label="Latest updates"
          className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]"
        >
          <EditorialSection
            title="Latest Updates"
            subtitle="A mixed stream of the freshest stories across the newsroom."
          >
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {newsroom.latestUpdates.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={setSelectedArticleId}
                  variant={getStreamVariant(index)}
                  className={getStreamClassName(index)}
                />
              ))}
            </div>
          </EditorialSection>
          <CloudHeadlines
            articles={articles}
            onArticleClick={setSelectedArticleId}
            className="lg:sticky lg:top-6 lg:self-start"
          />
        </section>
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

type EditorialSectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

function EditorialSection({
  title,
  subtitle,
  children,
  className,
}: EditorialSectionProps) {
  return (
    <section className={className}>
      <div className="mb-5 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

function buildNewsroomSections(articles: NewsArticle[]) {
  const usedArticleIds = new Set<string>();
  const featured = articles[0];

  if (featured) {
    usedArticleIds.add(featured.id);
  }

  const editorHighlights = selectArticles({
    articles,
    usedArticleIds,
    limit: 3,
    fillWithLatest: true,
  });
  const cloudSpotlight = selectArticles({
    articles,
    usedArticleIds,
    limit: 5,
    predicate: (article) => isCloudCategory(article.category),
    fillWithLatest: true,
  });
  const aiEmerging = selectArticles({
    articles,
    usedArticleIds,
    limit: 4,
    predicate: isAiArticle,
  });
  const securityWatch = selectArticles({
    articles,
    usedArticleIds,
    limit: 3,
    predicate: isSecurityArticle,
  });
  const trending = selectArticles({
    articles,
    usedArticleIds,
    limit: 6,
    fillWithLatest: true,
  });
  const latestUpdates = articles.filter(
    (article) => !usedArticleIds.has(article.id),
  );

  return {
    featured,
    editorHighlights,
    cloudSpotlight,
    aiEmerging,
    securityWatch,
    trending,
    latestUpdates,
  };
}

function selectArticles({
  articles,
  usedArticleIds,
  limit,
  predicate = () => true,
  fillWithLatest = false,
}: {
  articles: NewsArticle[];
  usedArticleIds: Set<string>;
  limit: number;
  predicate?: (article: NewsArticle) => boolean;
  fillWithLatest?: boolean;
}) {
  const selectedArticles: NewsArticle[] = [];

  for (const article of articles) {
    if (selectedArticles.length >= limit) {
      break;
    }

    if (!usedArticleIds.has(article.id) && predicate(article)) {
      selectedArticles.push(article);
    }
  }

  if (fillWithLatest && selectedArticles.length < limit) {
    for (const article of articles) {
      if (selectedArticles.length >= limit) {
        break;
      }

      if (
        !usedArticleIds.has(article.id) &&
        !selectedArticles.some((selected) => selected.id === article.id)
      ) {
        selectedArticles.push(article);
      }
    }
  }

  selectedArticles.forEach((article) => usedArticleIds.add(article.id));

  return selectedArticles;
}

function isAiArticle(article: NewsArticle) {
  const searchableText = `${article.category ?? ""} ${article.title} ${
    article.aiSummary ?? ""
  }`.toLowerCase();

  return (
    article.category === "AI" ||
    /\bai\b/.test(searchableText) ||
    searchableText.includes("machine learning") ||
    searchableText.includes("llm") ||
    searchableText.includes("agent") ||
    searchableText.includes("bedrock") ||
    searchableText.includes("claude")
  );
}

function isSecurityArticle(article: NewsArticle) {
  const searchableText = `${article.category ?? ""} ${article.title} ${
    article.aiSummary ?? ""
  }`.toLowerCase();

  return (
    article.category === "CYBERSECURITY" ||
    searchableText.includes("security") ||
    searchableText.includes("cyber") ||
    searchableText.includes("privacy") ||
    searchableText.includes("vulnerability")
  );
}

function getStreamVariant(index: number): "standard" | "large" | "compact" {
  const pattern = ["large", "standard", "compact", "standard", "large"];

  return pattern[index % pattern.length] as "standard" | "large" | "compact";
}

function getStreamClassName(index: number) {
  const pattern = [
    "md:col-span-2 lg:col-span-2",
    "",
    "",
    "lg:col-span-2",
    "md:col-span-2",
  ];

  return cn(pattern[index % pattern.length]);
}
