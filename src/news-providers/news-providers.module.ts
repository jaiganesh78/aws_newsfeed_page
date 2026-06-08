import { Module } from '@nestjs/common';
import { ArticleRankingService } from './ranking/article-ranking.service';
import { NewsApiProvider } from './newsapi/newsapi.provider';
import { ProviderFactory } from './provider.factory';
import { RssProvider } from './rss/rss.provider';

@Module({
  providers: [
    NewsApiProvider,
    RssProvider,
    ArticleRankingService,
    ProviderFactory,
  ],
  exports: [
    NewsApiProvider,
    RssProvider,
    ArticleRankingService,
    ProviderFactory,
  ],
})
export class NewsProvidersModule {}
