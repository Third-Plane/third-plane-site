// Build-time entry: renders one path to HTML for scripts/prerender.mjs.
// Built with `vite build --ssr`; never shipped to the browser.

import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import { pages } from "./routes";
import { site } from "./data/content";
import { posts } from "./data/posts";
import { DEFAULT_DESCRIPTION, HeadContext, type Head } from "./lib/head";

export { posts, site };

export const paths = [
  ...pages.map((page) => page.path),
  ...posts.filter((post) => !post.draft).map((post) => `/resources/${post.slug}`),
];

export function render(url: string) {
  const head: Head = { title: site.name, description: DEFAULT_DESCRIPTION };
  const html = renderToString(
    <StrictMode>
      <HeadContext value={head}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HeadContext>
    </StrictMode>,
  );
  return { html, head };
}
