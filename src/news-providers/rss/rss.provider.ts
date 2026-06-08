import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INewsProvider } from '../interfaces/news-provider.interface';
import { NormalizedArticle } from '../models/normalized-article.interface';

@Injectable()
export class RssProvider implements INewsProvider {
  constructor(private readonly configService: ConfigService) {}

  async getArticles(): Promise<NormalizedArticle[]> {
    return [];
  }
}
