import Parser from 'rss-parser';
import { PROVIDER_NAMES, RssFeedConfig } from '../constants/news-sources.constants';
import { NormalizedArticle } from '../models/normalized-article.interface';
import { nullIfEmpty, parsePublishedDate } from './normalizer.utils';

type RssItem = Parser.Item;

function extractImageUrl(item: RssItem): string | null {
  const enclosureUrl =
    item.enclosure?.url && item.enclosure.type?.startsWith('image/')
      ? item.enclosure.url
      : null;

  if (enclosureUrl) {
    return nullIfEmpty(enclosureUrl);
  }

  const customFields = item as RssItem & {
    'media:content'?: { $?: { url?: string } };
  };
  const mediaUrl = customFields['media:content']?.$?.url;

  return nullIfEmpty(mediaUrl ?? null);
}

export function normalizeRssItem(
  item: RssItem,
  feed: RssFeedConfig,
): NormalizedArticle | null {
  const title = nullIfEmpty(item.title);
  const articleUrl = nullIfEmpty(item.link);

  if (!title || !articleUrl) {
    return null;
  }

  const description = nullIfEmpty(item.contentSnippet ?? item.content ?? null);

  return {
    title,
    description,
    imageUrl: extractImageUrl(item),
    sourceName: feed.sourceName,
    sourceUrl: articleUrl,
    articleUrl,
    category: feed.category,
    publishedAt: parsePublishedDate(item.isoDate ?? item.pubDate ?? null),
    fullContent: null,
    provider: PROVIDER_NAMES.RSS,
  };
}
