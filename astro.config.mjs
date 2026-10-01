import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Static output, one HTML file per page (placement-desk.html, served at
// /placement-desk by Vercel's cleanUrls). React components render to plain
// HTML at build time; the only JS shipped is the scripts in src/scripts.
export default defineConfig({
  site: "https://www.thirdplane.com",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: "never",
  build: { format: "file" },
});
