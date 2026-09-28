import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  HeadContext,
  ORIGIN,
  canonicalUrl,
  fullTitle,
} from "../lib/head";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    const [tag, match] = selector.startsWith("link") ? ["link", /rel="([^"]+)"/] : ["meta", /\[(name|property)="([^"]+)"\]/];
    el = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
    const m = selector.match(match);
    if (m) {
      if (tag === "link") el.setAttribute("rel", m[1]);
      else el.setAttribute(m[1], m[2]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Per-page document title, description, Open Graph tags and canonical URL.
// At build time these are written into each page's HTML (scripts/prerender.mjs);
// in the browser they are kept current as the reader navigates.
export function useTitle(title?: string, description = DEFAULT_DESCRIPTION) {
  const { pathname } = useLocation();
  const head = useContext(HeadContext);
  const full = fullTitle(title);

  if (head) {
    head.title = full;
    head.description = description;
  }

  useEffect(() => {
    const canonical = canonicalUrl(pathname);
    document.title = full;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", `${ORIGIN}/og.png`);
    setMeta('link[rel="canonical"]', "href", canonical);
  }, [full, description, pathname]);
}
