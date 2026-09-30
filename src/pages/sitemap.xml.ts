import type { APIRoute } from "astro";
import { posts } from "../data/posts";
import { canonicalUrl } from "../lib/head";

// Every top-level page file is listed, so adding src/pages/<name>.astro puts it
// in the sitemap. Posts come from src/data/posts.ts.
const pageFiles = import.meta.glob("./*.astro");

export const GET: APIRoute = () => {
  const pages = Object.keys(pageFiles)
    .map((file) => file.slice(2, -".astro".length))
    .filter((name) => name !== "404")
    .map((name) => (name === "index" ? "/" : `/${name}`));
  const published = posts.filter((post) => !post.draft).map((post) => `/resources/${post.slug}`);

  const urls = [...pages, ...published].map(
    (path) => `  <url><loc>${canonicalUrl(path)}</loc></url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
