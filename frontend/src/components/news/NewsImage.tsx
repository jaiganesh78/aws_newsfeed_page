"use client";

import Image from "next/image";
import { useState } from "react";
import type { NewsCategory } from "@/types/news";
import { NewsImageFallback } from "./NewsImageFallback";

type NewsImageProps = {
  src: string | null;
  category: NewsCategory | null;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fallbackTone?: "light" | "dark";
};

export function NewsImage({
  src,
  category,
  alt = "",
  sizes,
  className,
  priority = false,
  fallbackTone = "dark",
}: NewsImageProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = src?.trim() || null;

  if (imageUrl === null || hasImageError) {
    return <NewsImageFallback category={category} tone={fallbackTone} />;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
      onError={() => setHasImageError(true)}
      className={className}
    />
  );
}
