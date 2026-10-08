// Site copy. The words live in src/content/*.json, one file per page, and are
// edited through Pages CMS (.pages.yml); this module hands them to the pages
// under the names the components use. Posts are a content collection instead
// (src/content.config.ts). Navigation stays in code because its links have to
// match the pages in src/pages.

import type {
  AppliedEpicFile,
  CompanyFile,
  HomeFile,
  IntegrationsFile,
  PlacementDeskFile,
  ResourcesFile,
  SecurityFile,
  SiteFile,
} from "./content-types";
import siteJson from "../content/site.json";
import homeJson from "../content/home.json";
import placementDeskJson from "../content/placement-desk.json";
import companyJson from "../content/company.json";
import securityJson from "../content/security.json";
import resourcesJson from "../content/resources.json";
import integrationsJson from "../content/integrations.json";
import appliedEpicJson from "../content/applied-epic.json";

const siteFile: SiteFile = siteJson;
const home: HomeFile = homeJson;
const company: CompanyFile = companyJson;

const { footer, contact: contactFile, samples, ...siteFields } = siteFile;

export const site = {
  ...siteFields,
  mailto: `mailto:${siteFile.email}`,
};

export const contact = contactFile;

// The made-up accounts and carriers every activity panel is about.
export const ledgerSamples = samples;

export const homeHero = { ...home.hero, ledger: home.ledger };
export const problem = home.problem;
export const approach = home.approach;
export const desk = home.desk;
export const showcase = home.showcase;
export const homeCta = home.cta;

export const placementDesk: PlacementDeskFile = placementDeskJson;
export const companyPage = {
  ...company,
  // An editor can remove every role; the page then shows `roles.empty`.
  roles: { ...company.roles, items: company.roles.items ?? [] },
};
export const securityPage: SecurityFile = securityJson;
export const resourcesPage: ResourcesFile = resourcesJson;
export const integrationsPage: IntegrationsFile = integrationsJson;
export const appliedEpicPage: AppliedEpicFile = appliedEpicJson;

// ---------------------------------------------------------------------------
// Site structure: primary nav with a Products group, and the footer. An entry
// with no `href` has no page yet: it is shown, but not as a link.
// ---------------------------------------------------------------------------

// `note` is a status (live, or coming) or a description; `live` marks the one
// that's available now.
type NavItem = { label: string; href?: string; note?: string; live?: boolean };

export const primaryNav: { menus: { label: string; items: NavItem[] }[] } = {
  menus: [
    {
      label: "Products",
      items: [
        { label: "Placement Desk", href: "/placement-desk", note: "Available now", live: true },
        { label: "Inbound Desk", note: "Coming Soon" },
        { label: "Service Desk", note: "Coming Soon" },
      ],
    },
    {
      label: "Capabilities",
      items: [
        { label: "Security", href: "/security", note: "Authority, record and data isolation" },
        {
          label: "System integrations",
          href: "/integrations",
          note: "AMS, documents, inboxes and data",
        },
      ],
    },
    {
      label: "Company",
      items: [
        { label: "About", href: "/company", note: "Open roles, origin and principles" },
        { label: "Resources", href: "/resources", note: "Writing, technical notes and press" },
      ],
    },
  ],
};

export const siteFooter = {
  ...footer,
  columns: [
    {
      label: "Products",
      links: [
        { label: "Placement Desk", href: "/placement-desk" },
        { label: "Inbound Desk" },
        { label: "Service Desk" },
      ],
    },
    {
      label: "Capabilities",
      links: [
        { label: "Security", href: "/security" },
        { label: "System integrations", href: "/integrations" },
        { label: "Applied Epic", href: "/applied-epic" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About", href: "/company" },
        { label: "Resources", href: "/resources" },
      ],
    },
  ],
};
