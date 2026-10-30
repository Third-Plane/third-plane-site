import type { APIRoute } from "astro";
import { getPosts } from "../data/get-posts";
import { canonicalUrl } from "../lib/head";

// Every top-level page file is listed, so adding src/pages/<name>.astro puts it
// in the sitemap. Posts come from the `posts` collection, with their last
// update (or publication) as lastmod. Pages carry none: their copy and their
// code change separately, and a lastmod that moves with every build teaches
// crawlers to ignore it.
const pageFiles = import.meta.glob("./*.astro");

export const GET: APIRoute = async () => {
  const pages = Object.keys(pageFiles)
    .map((file) => file.slice(2, -".astro".length))
    .filter((name) => name !== "404")
    .map((name) => ({ path: name === "index" ? "/" : `/${name}`, lastmod: undefined }));
  const published = (await getPosts())
    .filter((post) => !post.draft)
    .map((post) => ({ path: `/resources/${post.slug}`, lastmod: post.updated ?? post.date }));

  const urls = [...pages, ...published].map(
    ({ path, lastmod }) =>
      `  <url><loc>${canonicalUrl(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
