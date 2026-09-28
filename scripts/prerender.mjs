// Writes every page as real HTML after `vite build`, so crawlers and link
// previews see each page's content, title, description and canonical URL
// without running JavaScript. The browser then hydrates the same markup.
//
// Runs as the last step of `npm run build`, against the server bundle that
// `vite build --ssr src/entry-server.tsx` leaves in dist-ssr/.
//
// Output follows Vercel's cleanUrls: /placement-desk is placement-desk.html,
// and 404.html is served for any path without a page.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const ssr = resolve(root, "dist-ssr");
const ORIGIN = "https://www.thirdplane.com";

const { render, paths, posts, site } = await import(
  pathToFileURL(resolve(ssr, "entry-server.js")).href
);
const template = readFileSync(resolve(dist, "index.html"), "utf8");

const attr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const canonical = (path) => `${ORIGIN}${path === "/" ? "/" : path}`;
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/brand/mark-purple.png`,
  email: site.email,
  sameAs: [site.linkedin],
};

function structuredData(path) {
  if (path === "/") return [organization];
  const post = posts.find((p) => path === `/resources/${p.slug}`);
  if (!post) return [];
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.standfirst,
      datePublished: post.date,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "Organization", name: site.name, logo: organization.logo },
      mainEntityOfPage: canonical(path),
      image: `${ORIGIN}/og.png`,
    },
  ];
}

// The template's own title, description and Open Graph title/description are
// the homepage defaults; each page replaces them with its own.
const OWN_TAGS =
  /\s*<meta\s+(?:name="description"|property="og:(?:title|description|type|url)")[^>]*>/g;

function page(path, { notFound = false } = {}) {
  const { html, head } = render(path);
  const tags = [
    `<title>${text(head.title)}</title>`,
    `<meta name="description" content="${attr(head.description)}" />`,
    `<meta property="og:title" content="${attr(head.title)}" />`,
    `<meta property="og:description" content="${attr(head.description)}" />`,
    `<meta property="og:type" content="${path.startsWith("/resources/") ? "article" : "website"}" />`,
  ];
  if (notFound) {
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(
      `<meta property="og:url" content="${canonical(path)}" />`,
      `<link rel="canonical" href="${canonical(path)}" />`,
      ...structuredData(path).map(jsonLd),
    );
  }

  return template
    .replace(OWN_TAGS, "")
    .replace(/<title>[^<]*<\/title>/, tags.join("\n    "))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

const write = (file, html) => {
  const target = resolve(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
};

for (const path of paths) {
  write(path === "/" ? "index.html" : `${path.slice(1)}.html`, page(path));
}
write("404.html", page("/404", { notFound: true }));

const urls = paths.map((path) => `  <url><loc>${canonical(path)}</loc></url>`);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

rmSync(ssr, { recursive: true, force: true });
console.log(`Prerendered ${paths.length} pages, 404.html and sitemap.xml`);
