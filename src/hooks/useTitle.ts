import { useEffect } from "react";
import { site } from "../data/content";

// Sets the document title per page: "Company | Third Plane". The homepage
// keeps the site-wide title from index.html.
export function useTitle(title?: string) {
  useEffect(() => {
    const base = `${site.name} | ${site.tagline}`;
    document.title = title ? `${title} | ${site.name}` : base;
    return () => {
      document.title = base;
    };
  }, [title]);
}
