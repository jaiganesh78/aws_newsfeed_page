import { Injectable, Logger } from '@nestjs/common';
import { NewsAggregationService } from '../news-providers/news-aggregation.service';
import { ArticleDeduplicationService } from './deduplication/article-deduplication.service';
import { IngestionResult } from './interfaces/ingestion-result.interface';
import { ArticlePersistenceService } from './persistence/article-persistence.service';

@Injectable()
export class IngestionOrchestratorService {
  private readonly logger = new Logger(IngestionOrchestratorService.name);

  constructor(
    private readonly newsAggregationService: NewsAggregationService,
    private readonly articleDeduplicationService: ArticleDeduplicationService,
    private readonly articlePersistenceService: ArticlePersistenceService,
  ) {}

  async runIngestion(): Promise<IngestionResult> {
    this.logger.log('Starting news ingestion pipeline');

    const fetchedArticles =
      await this.newsAggregationService.getAllArticles();

    this.logger.log(`Fetched ${fetchedArticles.length} articles`);

    const deduplicatedArticles =
      this.articleDeduplicationService.deduplicate(fetchedArticles);

    this.logger.log(
      `Deduplicated to ${deduplicatedArticles.length} articles (removed ${fetchedArticles.length - deduplicatedArticles.length} duplicates)`,
    );

    const duplicatesRemoved =
      fetchedArticles.length - deduplicatedArticles.length;

    const persisted =
      await this.articlePersistenceService.persistArticles(
        deduplicatedArticles,
      );

    const alreadyExisting = deduplicatedArticles.length - persisted;

    const result: IngestionResult = {
      fetched: fetchedArticles.length,
      deduplicated: deduplicatedArticles.length,
      duplicatesRemoved,
      persisted,
      alreadyExisting,
    };

    this.logger.log(
      `Ingestion complete: fetched=${result.fetched}, deduplicated=${result.deduplicated}, duplicatesRemoved=${result.duplicatesRemoved}, persisted=${result.persisted}, alreadyExisting=${result.alreadyExisting}`,
    );

    return result;
  }
}
