-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('AWS', 'AZURE', 'GCP', 'CLOUD', 'AI', 'DEVOPS', 'CYBERSECURITY', 'PROGRAMMING', 'GENERAL');

-- DropIndex
DROP INDEX "news_articles_published_at_idx";

-- AlterTable
ALTER TABLE "news_articles" ALTER COLUMN "category" TYPE "NewsCategory" USING ("category"::"NewsCategory");

-- CreateIndex
CREATE INDEX "news_articles_is_active_published_at_idx" ON "news_articles"("is_active", "published_at");
