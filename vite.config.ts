import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { posts } from "./src/data/posts.js";

// Production lives at the root of www.thirdplane.com, so assets are root-relative.
// Hosts that serve the site from a subpath (GitHub Pages project sites) must build
// with BASE_PATH set to that subpath. See .github/workflows/deploy.yml.
//
// Every page shares one bundle and picks its content from the pathname, so on
// a static host without rewrites (GitHub Pages) each route needs its own
// index.html. Vercel has a rewrite in vercel.json; this covers everything else.
const ROUTES = [
  "placement-desk",
  "underwriting-desk",
  "platform",
  "security",
  "carrier-channels",
  "integrations",
  "company",
  "careers",
  "resources",
  ...posts
    .filter((post: { draft?: boolean }) => !post.draft)
    .map((post: { slug: string }) => `resources/${post.slug}`),
];

function staticRoutes(): Plugin {
  let outDir = "dist";
  return {
    name: "third-plane-static-routes",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const entry = resolve(outDir, "index.html");
      for (const route of ROUTES) {
        const dir = resolve(outDir, route);
        mkdirSync(dir, { recursive: true });
        copyFileSync(entry, resolve(dir, "index.html"));
      }
      copyFileSync(entry, resolve(outDir, "404.html"));
      // Sitemap for the production origin only; the Pages mirror lives at a
      // different URL and should not advertise itself to crawlers.
      if ((process.env.BASE_PATH ?? "/") === "/") {
        const urls = ["", ...ROUTES].map(
          (route) => `  <url><loc>https://www.thirdplane.com/${route}</loc></url>`,
        );
        writeFileSync(
          resolve(outDir, "sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
        );
      }
    },
  };
}

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), staticRoutes()],
});
