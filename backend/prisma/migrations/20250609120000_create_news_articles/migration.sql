-- CreateTable
CREATE TABLE "news_articles" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ai_summary" TEXT,
    "image_url" TEXT,
    "source_name" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "article_url" TEXT NOT NULL,
    "category" TEXT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_source_url_key" ON "news_articles"("source_url");

-- CreateIndex
CREATE INDEX "news_articles_published_at_idx" ON "news_articles"("published_at");

-- CreateIndex
CREATE INDEX "news_articles_category_idx" ON "news_articles"("category");

-- CreateIndex
CREATE INDEX "news_articles_created_at_idx" ON "news_articles"("created_at");
