import { site, siteFooter } from "../data/content";
import type { Faq } from "../data/content-types";
import { ORIGIN, canonicalUrl } from "./head";

// The page's structured data (schema.org JSON-LD), which search engines and
// answer engines read to tell what the company is and what each page is
// about. Every page gets one @graph: the company and its founder, the site,
// the page itself with its breadcrumb trail, and whatever nodes the page adds
// (a post's article, a product's service, a page's questions and answers).
// Nodes point at each other by @id, so the company is described once and
// every page refers to it.

export const ORGANIZATION_ID = `${ORIGIN}/#organization`;
export const WEBSITE_ID = `${ORIGIN}/#website`;
export const FOUNDER_ID = `${ORIGIN}/#founder`;

export type Crumb = { name: string; path: string };

// "Austin, Texas", as the footer shows it.
const [locality, region] = siteFooter.location.split(", ");

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: site.name,
  url: `${ORIGIN}/`,
  logo: { "@type": "ImageObject", url: `${ORIGIN}/brand/mark-purple.png` },
  description: site.description,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: locality,
    addressRegion: region,
    addressCountry: "US",
  },
  founder: { "@id": FOUNDER_ID },
  sameAs: [site.linkedin],
};

const founder = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: site.founder.name,
  jobTitle: "Founder and CEO",
  worksFor: { "@id": ORGANIZATION_ID },
  sameAs: [site.founder.linkedin],
};

// A post's author: the company, the founder (both described site-wide), or
// another person by name.
export function authorOf(name: string) {
  if (name === site.name) return { "@id": ORGANIZATION_ID };
  if (name === site.founder.name) return { "@id": FOUNDER_ID };
  return { "@type": "Person", name };
}

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${ORIGIN}/`,
  name: site.name,
  description: site.description,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
};

// A page's questions and answers (see Faq.tsx) as an FAQPage node, or nothing
// when it has none.
export function faqPage(path: string, faq?: Faq): object[] {
  if (!faq?.items?.length) return [];
  return [
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl(path)}#faq`,
      isPartOf: { "@id": canonicalUrl(path) },
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
}

// `trail` is the page's breadcrumb trail after Home, the page itself last.
// The homepage has none.
export function pageGraph({
  title,
  description,
  path,
  trail,
  nodes = [],
}: {
  title: string;
  description: string;
  path: string;
  trail: Crumb[];
  nodes?: object[];
}) {
  const url = canonicalUrl(path);
  const crumbs = [{ name: "Home", path: "/" }, ...trail];
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  };
  const page = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: path === "/" ? { "@id": ORGANIZATION_ID } : undefined,
    breadcrumb: trail.length ? { "@id": breadcrumb["@id"] } : undefined,
    inLanguage: "en",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      founder,
      website,
      page,
      ...(trail.length ? [breadcrumb] : []),
      ...nodes,
    ],
  };
}
