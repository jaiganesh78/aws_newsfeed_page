import { Injectable } from '@nestjs/common';
import { load, type CheerioAPI } from 'cheerio';

const MAX_CONTENT_LENGTH = 15000;
const MIN_CONTENT_LENGTH = 300;

@Injectable()
export class HtmlContentExtractorService {
  extractContent(html: string): string | null {
    const $ = load(html);

    $('script, style, nav, footer, header, aside').remove();

    const container = this.selectContainer($);

    if (!container) {
      return null;
    }

    const normalizedText = container.text().replace(/\s+/g, ' ').trim();

    if (normalizedText.length < MIN_CONTENT_LENGTH) {
      return null;
    }

    if (normalizedText.length > MAX_CONTENT_LENGTH) {
      return normalizedText.slice(0, MAX_CONTENT_LENGTH).trim();
    }

    return normalizedText;
  }

  private selectContainer($: CheerioAPI) {
    const article = $('article').first();

    if (article.length > 0) {
      return article;
    }

    const main = $('main').first();

    if (main.length > 0) {
      return main;
    }

    const body = $('body').first();

    if (body.length > 0) {
      return body;
    }

    return null;
  }
}
