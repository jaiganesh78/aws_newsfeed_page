"use client";

import Image from "next/image";
import { useState } from "react";
import type { NewsCategory } from "@/types/news";
import { getNewsFallbackImageSrc } from "@/utils/news-fallback-images";
import { NewsImageFallback } from "./NewsImageFallback";

type NewsImageProps = {
  src: string | null;
  category: NewsCategory | null;
  articleId: string;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fallbackTone?: "light" | "dark";
};

export function NewsImage({
  src,
  category,
  articleId,
  alt = "",
  sizes,
  className,
  priority = false,
  fallbackTone = "dark",
}: NewsImageProps) {
  const imageUrl = src?.trim() || null;
  const fallbackImageUrl = getNewsFallbackImageSrc(articleId, category);
  const [failedImageUrls, setFailedImageUrls] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const activeImageUrl =
    imageUrl && !failedImageUrls.has(imageUrl) ? imageUrl : fallbackImageUrl;

  if (failedImageUrls.has(fallbackImageUrl)) {
    return <NewsImageFallback category={category} tone={fallbackTone} />;
  }

  return (
    <Image
      src={activeImageUrl}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
      onError={() => {
        setFailedImageUrls((currentFailedImageUrls) => {
          const nextFailedImageUrls = new Set(currentFailedImageUrls);
          nextFailedImageUrls.add(activeImageUrl);

          return nextFailedImageUrls;
        });
      }}
      className={className}
    />
  );
}
