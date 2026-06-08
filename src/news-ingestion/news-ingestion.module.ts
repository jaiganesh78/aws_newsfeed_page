import { Module } from '@nestjs/common';
import { NewsProvidersModule } from '../news-providers/news-providers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ArticleDeduplicationService } from './deduplication/article-deduplication.service';
import { IngestionOrchestratorService } from './ingestion-orchestrator.service';
import { ArticlePersistenceService } from './persistence/article-persistence.service';
import { CloudPriorityRankingService } from './ranking/cloud-priority-ranking.service';

@Module({
  imports: [NewsProvidersModule, PrismaModule],
  providers: [
    ArticleDeduplicationService,
    CloudPriorityRankingService,
    ArticlePersistenceService,
    IngestionOrchestratorService,
  ],
  exports: [IngestionOrchestratorService],
})
export class NewsIngestionModule {}
