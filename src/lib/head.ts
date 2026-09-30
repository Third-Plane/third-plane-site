import { site } from "../data/content";

export const ORIGIN = "https://www.thirdplane.com";

export const DEFAULT_DESCRIPTION = site.description;

// "Company | Third Plane"; the homepage keeps the site-wide title.
export const fullTitle = (title?: string) =>
  title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;

export const canonicalUrl = (pathname: string) =>
  `${ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
