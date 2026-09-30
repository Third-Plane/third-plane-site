// The shape of each file in src/content. These are the contract between the
// CMS forms in .pages.yml and the pages: content.ts assigns each JSON file to
// its type, so `tsc` fails if a committed file drifts from what the pages read.
//
// Pages CMS drops empty strings, empty lists and empty objects when it saves,
// so anything an editor may leave blank is optional here and has to be
// handled where it is rendered.

type Lines = string[]; // a heading, one entry per line
type Card = { title: string; body: string };
type Link = { label: string; href: string };
type Cta = { title: string; body: string };

export type SiteFile = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  linkedin: string;
  ctaLabel: string;
  ctaHref: string;
  year: number;
  footer: { tagline: string; location: string };
  contact: Cta;
};

export type HomeFile = {
  hero: { title: string; lead: string; secondary: Link };
  ledger: {
    label: string;
    sublabel: string;
    legend: { status: string; label: string }[];
    tasks: { task: string; status: string }[];
  };
  problem: { title: string; body: string; points: Card[] };
  approach: {
    title: string;
    body: string;
    models: { kicker: string; chain: string[]; note: string; accent?: boolean }[];
  };
  desk: { title: string; body: string };
  showcase: { title: string; src?: string; poster?: string; caption?: string };
};

export type PlacementDeskFile = {
  title: Lines;
  problem: string;
  work: {
    title: string;
    stages: { kicker: string; accent?: boolean; steps: Card[] }[];
  };
  channels: { title: string; body: string; items: Card[] };
  systems: { title: string; body: string; links: { title: string; body: string; href: string }[] };
  human: { title: string; body: string; items: Card[] };
  cta: Cta & { label: string };
};

export type CompanyFile = {
  title: Lines;
  lead: string;
  origin: { title: string; body: string[]; facts: Card[] };
  principles: { title: string; items: Card[] };
  team: {
    title: string;
    body: string;
    photo: { src?: string; alt: string };
    photoNote: string;
  };
  next: { status: string; title: string; body: string };
  cta: Cta;
};

export type SecurityFile = {
  title: Lines;
  lead: string;
  authority: { sides: { title: string; items: Card[] }[] };
  record: { title: string; items: Card[] };
  data: { title: string; items: Card[] };
  cta: Cta;
};

export type CareersFile = {
  title: Lines;
  lead: string;
  why: { title: string; items: Card[] };
  how: { title: string; items: string[] };
  roles: {
    title: string;
    empty: string;
    items?: { title: string; team: string; location: string; href: string }[];
  };
  cta: Cta;
};

export type ResourcesFile = {
  title: Lines;
  lead: string;
  types: { technical: string; perspective: string; press: string };
};

export type CarrierChannelsFile = {
  title: Lines;
  lead: string;
  channels: { title: string; items: (Card & { kicker?: string })[] };
  coverage: { title: string; body: string };
  cta: Cta;
};

export type IntegrationsFile = {
  title: Lines;
  lead: string;
  body: string;
  systems: { title: string; items: (Card & { names?: string; link?: Link })[] };
  how: { title: string; steps: Card[] };
  note: string;
  cta: Cta;
};

export type AppliedEpicFile = {
  certified: boolean;
  status: string;
  date?: string;
  title: Lines;
  titlePending: Lines;
  lead: string;
  who: { title: string; body: string; items: { title: string }[] };
  work: { title: string; items: Card[] };
  meaning: { title: string; items: Card[] };
  quote?: { text?: string; attribution?: string };
  cta: Cta;
};
