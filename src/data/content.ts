// Site copy. The words live in src/content/*.json, one file per page, and are
// edited through Pages CMS (.pages.yml); this module hands them to the pages
// under the names the components use. Navigation stays in code because its
// links have to match the routes in src/routes.tsx.

import type {
  AppliedEpicFile,
  CareersFile,
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
import careersJson from "../content/careers.json";
import resourcesJson from "../content/resources.json";
import integrationsJson from "../content/integrations.json";
import appliedEpicJson from "../content/applied-epic.json";

const siteFile: SiteFile = siteJson;
const home: HomeFile = homeJson;
const careers: CareersFile = careersJson;

const { footer, contact: contactFile, ...siteFields } = siteFile;

export const site = {
  ...siteFields,
  mailto: `mailto:${siteFile.email}`,
};

export const contact = contactFile;

export const homeHero = { ...home.hero, ledger: home.ledger };
export const ledgerTasks = home.ledger.tasks;
export const problem = home.problem;
export const approach = home.approach;
export const desk = home.desk;
export const showcase = home.showcase;

export const placementDesk: PlacementDeskFile = placementDeskJson;
export const companyPage: CompanyFile = companyJson;
export const securityPage: SecurityFile = securityJson;
export const careersPage = {
  ...careers,
  // An editor can remove every role; the page then shows `roles.empty`.
  roles: { ...careers.roles, items: careers.roles.items ?? [] },
};
export const resourcesPage: ResourcesFile = resourcesJson;
export const integrationsPage: IntegrationsFile = integrationsJson;
export const appliedEpicPage: AppliedEpicFile = appliedEpicJson;

// ---------------------------------------------------------------------------
// Site structure: primary nav with a Products group, and the footer.
// ---------------------------------------------------------------------------

export const primaryNav = {
  menus: [
    {
      label: "Products",
      items: [
        { label: "Placement Desk", href: "/placement-desk", note: "Available now", live: true },
        { label: "Underwriting Desk", note: "Coming Soon", disabled: true },
        { label: "Service Desk", note: "Coming Soon", disabled: true },
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
        { label: "About", href: "/company", note: "Austin, origin and principles" },
        { label: "Careers", href: "/careers", note: "Work with us" },
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
        { label: "Underwriting Desk", disabled: true },
        { label: "Service Desk", disabled: true },
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
        { label: "Careers", href: "/careers" },
        { label: "Resources", href: "/resources" },
        { label: "LinkedIn", href: site.linkedin },
        { label: site.email, href: site.mailto },
      ],
    },
  ],
};
