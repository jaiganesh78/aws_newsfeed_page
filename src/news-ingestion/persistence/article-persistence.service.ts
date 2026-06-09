import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ExtractedArticle } from '../../article-extraction/interfaces/extracted-article.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticlePersistenceService {
  private readonly logger = new Logger(ArticlePersistenceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async persistArticles(articles: ExtractedArticle[]): Promise<number> {
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
    article: ExtractedArticle,
  ): Prisma.NewsArticleCreateManyInput {
    return {
      title: article.title,
      description: article.description,
      fullContent: article.fullContent,
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
