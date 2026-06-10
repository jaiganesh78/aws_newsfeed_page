-- DropIndex
DROP INDEX "news_articles_source_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_article_url_key" ON "news_articles"("article_url");
