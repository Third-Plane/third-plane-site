import { createContext } from "react";
import { site } from "../data/content";

export const ORIGIN = "https://www.thirdplane.com";

export const DEFAULT_DESCRIPTION = site.description;

// "Company | Third Plane"; the homepage keeps the site-wide title.
export const fullTitle = (title?: string) =>
  title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;

export const canonicalUrl = (pathname: string) =>
  `${ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

// Filled in by useTitle while a page renders at build time, so the prerender
// script can write that page's title and description into its HTML. In the
// browser there is no provider and useTitle updates the document instead.
export type Head = { title: string; description: string };
export const HeadContext = createContext<Head | null>(null);
