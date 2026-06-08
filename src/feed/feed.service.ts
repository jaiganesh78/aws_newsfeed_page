import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FeedDetailResponseDto } from './dto/feed-detail-response.dto';
import { FeedListResponseDto } from './dto/feed-list-response.dto';
import { FEED_ARTICLE_LIMIT } from './feed.constants';
import {
  toFeedDetailResponseDto,
  toGetFeedResponseDto,
} from './feed.mapper';
import {
  INewsArticleRepository,
  NEWS_ARTICLE_REPOSITORY,
} from './interfaces/news-article.repository.interface';

@Injectable()
export class FeedService {
  constructor(
    @Inject(NEWS_ARTICLE_REPOSITORY)
    private readonly newsArticleRepository: INewsArticleRepository,
  ) {}

  async getLatestFeed(): Promise<FeedListResponseDto> {
    const articles = await this.newsArticleRepository.findLatest(
      FEED_ARTICLE_LIMIT,
    );

    const items = articles.map(toGetFeedResponseDto);

    return {
      items,
      total: items.length,
    };
  }

  async getFeedItemById(id: string): Promise<FeedDetailResponseDto> {
    const article = await this.newsArticleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(`Feed item with id "${id}" not found`);
    }

    return toFeedDetailResponseDto(article);
  }
}
