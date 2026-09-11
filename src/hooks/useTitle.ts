import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/content";

const ORIGIN = "https://www.thirdplane.com";
const DEFAULT_DESCRIPTION =
  "Third Plane builds AI workforces for insurance: dedicated operating capacity that takes responsibility for defined work across the systems and carrier channels you already use. It starts with the Placement Desk.";

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
// "Company | Third Plane"; the homepage keeps the site-wide title.
export function useTitle(title?: string, description = DEFAULT_DESCRIPTION) {
  const { pathname } = useLocation();

  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
    const canonical = `${ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    document.title = full;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", `${ORIGIN}/og.png`);
    setMeta('link[rel="canonical"]', "href", canonical);
  }, [title, description, pathname]);
}
