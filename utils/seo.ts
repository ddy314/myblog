import { withBase } from "ufo";

export function joinSiteUrl(siteUrl: string, path = "/", baseURL = "/") {
  if (!siteUrl) {
    return "";
  }

  try {
    return new URL(withBase(path, baseURL), siteUrl).toString();
  } catch {
    return "";
  }
}

export function normalizeMetaDescription(
  description: string | undefined,
  fallback: string,
) {
  const value = description?.trim();
  return value || fallback;
}
