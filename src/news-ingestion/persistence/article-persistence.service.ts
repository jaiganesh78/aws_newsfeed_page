import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { NormalizedArticle } from '../../news-providers/models/normalized-article.interface';

@Injectable()
export class ArticlePersistenceService {
  private readonly logger = new Logger(ArticlePersistenceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async persistArticles(articles: NormalizedArticle[]): Promise<number> {
    if (articles.length === 0) {
      return 0;
    }

    try {
      const result = await this.prisma.newsArticle.createMany({
        data: articles.map((article) => this.toCreateManyInput(article)),
        skipDuplicates: true,
      });

      this.logger.log(`Persisted ${result.count} new articles`);

      return result.count;
    } catch (error) {
      this.logger.error(
        'Failed to persist articles',
        this.formatError(error),
      );

      throw new InternalServerErrorException('Failed to persist articles');
    }
  }

  private toCreateManyInput(
    article: NormalizedArticle,
  ): Prisma.NewsArticleCreateManyInput {
    return {
      title: article.title,
      description: article.description,
      aiSummary: null,
      imageUrl: article.imageUrl,
      sourceName: article.sourceName,
      sourceUrl: article.sourceUrl,
      articleUrl: article.articleUrl,
      category: article.category,
      publishedAt: article.publishedAt,
    };
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown error';
  }
}
