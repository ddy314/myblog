import { promises as fs } from "node:fs";
import path from "node:path";

import { joinSiteUrl } from "~/utils/seo";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function loadPostEntries(siteUrl: string, baseURL: string) {
  const postsDir = path.resolve(process.cwd(), "content/posts");
  const filenames = await fs.readdir(postsDir);

  const entries = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const filepath = path.join(postsDir, filename);
        const content = await fs.readFile(filepath, "utf8");
        const slug = filename.replace(/\.md$/u, "");
        const dateMatch = content.match(/^date:\s*([^\n]+)$/m);

        return {
          loc: joinSiteUrl(siteUrl, `/posts/${slug}`, baseURL),
          lastmod: dateMatch?.[1]?.trim(),
        } satisfies SitemapEntry;
      }),
  );

  return entries.filter((entry) => entry.loc);
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl;
  const baseURL = config.app.baseURL;

  const staticEntries: SitemapEntry[] = ["/", "/posts", "/about"]
    .map((pathname) => ({
      loc: joinSiteUrl(siteUrl, pathname, baseURL),
    }))
    .filter((entry) => entry.loc);

  const postEntries = await loadPostEntries(siteUrl, baseURL);
  const urls = [...staticEntries, ...postEntries];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((entry) => {
      const lines = [`<url><loc>${escapeXml(entry.loc)}</loc>`];

      if (entry.lastmod) {
        lines.push(`<lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
      }

      lines.push("</url>");
      return lines.join("");
    }),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
});
