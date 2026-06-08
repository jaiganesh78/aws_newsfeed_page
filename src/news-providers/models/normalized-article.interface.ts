export interface NormalizedArticle {
  title: string;
  description: string | null;
  imageUrl: string | null;
  sourceName: string;
  sourceUrl: string;
  articleUrl: string;
  category: string | null;
  publishedAt: Date | null;
  provider: string;
}
