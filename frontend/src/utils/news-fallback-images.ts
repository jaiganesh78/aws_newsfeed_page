import type { NewsCategory } from "@/types/news";

const fallbackImagePools = {
  AWS: [
    "/news-fallbacks/aws/aws-1.svg",
    "/news-fallbacks/aws/aws-2.svg",
    "/news-fallbacks/aws/aws-3.svg",
  ],
  AZURE: [
    "/news-fallbacks/azure/azure-1.svg",
    "/news-fallbacks/azure/azure-2.svg",
    "/news-fallbacks/azure/azure-3.svg",
  ],
  GCP: [
    "/news-fallbacks/gcp/gcp-1.svg",
    "/news-fallbacks/gcp/gcp-2.svg",
    "/news-fallbacks/gcp/gcp-3.svg",
  ],
  CLOUD: [
    "/news-fallbacks/cloud/cloud-1.svg",
    "/news-fallbacks/cloud/cloud-2.svg",
    "/news-fallbacks/cloud/cloud-3.svg",
  ],
  AI: [
    "/news-fallbacks/ai/ai-1.svg",
    "/news-fallbacks/ai/ai-2.svg",
    "/news-fallbacks/ai/ai-3.svg",
  ],
  MACHINE_LEARNING: [
    "/news-fallbacks/machine-learning/machine-learning-1.svg",
    "/news-fallbacks/machine-learning/machine-learning-2.svg",
    "/news-fallbacks/machine-learning/machine-learning-3.svg",
  ],
  DEVOPS: [
    "/news-fallbacks/devops/devops-1.svg",
    "/news-fallbacks/devops/devops-2.svg",
    "/news-fallbacks/devops/devops-3.svg",
  ],
  CYBERSECURITY: [
    "/news-fallbacks/cybersecurity/cybersecurity-1.svg",
    "/news-fallbacks/cybersecurity/cybersecurity-2.svg",
    "/news-fallbacks/cybersecurity/cybersecurity-3.svg",
  ],
  PROGRAMMING: [
    "/news-fallbacks/programming/programming-1.svg",
    "/news-fallbacks/programming/programming-2.svg",
    "/news-fallbacks/programming/programming-3.svg",
  ],
  STARTUPS: [
    "/news-fallbacks/startups/startups-1.svg",
    "/news-fallbacks/startups/startups-2.svg",
    "/news-fallbacks/startups/startups-3.svg",
  ],
  BUSINESS: [
    "/news-fallbacks/business/business-1.svg",
    "/news-fallbacks/business/business-2.svg",
    "/news-fallbacks/business/business-3.svg",
  ],
  DATA_SCIENCE: [
    "/news-fallbacks/data-science/data-science-1.svg",
    "/news-fallbacks/data-science/data-science-2.svg",
    "/news-fallbacks/data-science/data-science-3.svg",
  ],
  GENERAL_TECHNOLOGY: [
    "/news-fallbacks/general-technology/general-technology-1.svg",
    "/news-fallbacks/general-technology/general-technology-2.svg",
    "/news-fallbacks/general-technology/general-technology-3.svg",
  ],
  DEFAULT: [
    "/news-fallbacks/default/default-1.svg",
    "/news-fallbacks/default/default-2.svg",
    "/news-fallbacks/default/default-3.svg",
  ],
} as const;

type FallbackCategoryKey = keyof typeof fallbackImagePools;

const categoryFallbackMap: Record<NewsCategory, FallbackCategoryKey> = {
  AWS: "AWS",
  AZURE: "AZURE",
  GCP: "GCP",
  CLOUD: "CLOUD",
  AI: "AI",
  DEVOPS: "DEVOPS",
  CYBERSECURITY: "CYBERSECURITY",
  PROGRAMMING: "PROGRAMMING",
  GENERAL: "GENERAL_TECHNOLOGY",
};

export function getNewsFallbackImageSrc(
  articleId: string,
  category: NewsCategory | string | null,
) {
  const categoryKey = getFallbackCategoryKey(category);
  const pool = fallbackImagePools[categoryKey] ?? fallbackImagePools.DEFAULT;
  const index = hashString(`${articleId}:${categoryKey}`) % pool.length;

  return pool[index] ?? fallbackImagePools.DEFAULT[0];
}

function getFallbackCategoryKey(
  category: NewsCategory | string | null,
): FallbackCategoryKey {
  if (!category) {
    return "DEFAULT";
  }

  const normalizedCategory = category
    .toUpperCase()
    .replace(/&/g, "AND")
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (isNewsCategory(normalizedCategory)) {
    return categoryFallbackMap[normalizedCategory];
  }

  if (normalizedCategory in fallbackImagePools) {
    return normalizedCategory as FallbackCategoryKey;
  }

  if (
    normalizedCategory.includes("MACHINE") ||
    normalizedCategory.includes("LLM") ||
    normalizedCategory.includes("AGENT")
  ) {
    return "MACHINE_LEARNING";
  }

  if (normalizedCategory.includes("STARTUP")) {
    return "STARTUPS";
  }

  if (normalizedCategory.includes("BUSINESS")) {
    return "BUSINESS";
  }

  if (normalizedCategory.includes("DATA")) {
    return "DATA_SCIENCE";
  }

  if (normalizedCategory.includes("TECH")) {
    return "GENERAL_TECHNOLOGY";
  }

  return "DEFAULT";
}

function isNewsCategory(category: string): category is NewsCategory {
  return category in categoryFallbackMap;
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}
