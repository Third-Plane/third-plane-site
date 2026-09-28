# Third Plane site (Vite + React)

Marketing site for [thirdplane.com](https://www.thirdplane.com).

| Route | Page | Copy lives in |
| --- | --- | --- |
| `/` | Home | `homeHero`, `problem`, `approach`, `desk`, `deployment`, `company`, `horizon`, `contact` |
| `/placement-desk` | Placement Desk | `placementDesk` |
| `/platform` | Platform | `alpinePage` |
| `/security` | Security and governance | `securityPage` |
| `/carrier-channels` | Carrier channels | `carrierChannelsPage` |
| `/integrations` | System integrations | `integrationsPage` |
| `/company` | Company: Austin, origin, principles, team | `companyPage` |
| `/careers` | Careers, with an open-roles list | `careersPage` |
| `/resources` | Resources index: technical, perspective, press | `resourcesPage` |
| `/resources/:slug` | One post | `src/data/posts.ts` |

All of the above are exports of `src/data/content.ts` unless noted. The primary nav (`primaryNav`)
is three menus: Products, Capabilities and Company; the footer is `siteFooter`.
`/underwriting-desk` redirects to `/company#next` (the Underwriting Desk is no longer a standalone page).
Unknown paths get the Not found page with a 404 status.

**Adding a page:** add it to `pages` in `src/routes.tsx` (that routes it, prerenders it and lists it
in the sitemap) and link it from `primaryNav` or `siteFooter`. Call `useTitle` with the page's title
and description; they become its `<title>`, meta description and Open Graph tags.

**Adding a post:** append to `posts` in `src/data/posts.ts`. Posts marked `draft: true` render in
the dev server only. Remove the flag to publish; the build emits `resources/<slug>.html`.

**Video:** set `showcase.src` (and optionally `poster`) in `content.ts`. The section on the home
page appears as soon as a source is present.

**Team photo:** set `companyPage.team.photo.src`. Until then the Company page shows a marked
placeholder.

**Open roles:** add entries to `careersPage.roles.items`. With none, the page shows an invitation
to write in.

## Tech stack

- Vite
- React 19
- TypeScript
- React Router
- Plain CSS in `src/index.css`

Copy lives in [`src/data/content.ts`](src/data/content.ts). Components handle layout only.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build
npm run preview
npm run lint
```

## Publishing

Production is **https://www.thirdplane.com/**, hosted on Vercel and built from `main`. The apex `thirdplane.com` redirects to `www`.

### How pages are built

`npm run build` builds the browser bundle, then renders every page to static HTML
([`scripts/prerender.mjs`](scripts/prerender.mjs) with [`src/entry-server.tsx`](src/entry-server.tsx)).
Each page arrives with its content, title, description, canonical URL and Open Graph tags already in
the HTML, so search engines, AI crawlers and link previews (LinkedIn, Slack) read it without running
JavaScript. The browser then hydrates the same markup. The build also writes `404.html`, `sitemap.xml`
and structured data (Organization on the homepage, BlogPosting on posts).

Anything that depends on the browser (the clock in the activity ledger, scroll state, canvas
animation) has to run in an effect, not during render, or the prerendered HTML will not match.

[`vercel.json`](vercel.json) serves `/placement-desk` from `placement-desk.html` (`cleanUrls`), drops
trailing slashes, and holds the permanent redirects for retired paths.

## Brand assets

The logo is the three-bar isometric mark from the sales deck. `public/brand/` holds raster
lockups and marks extracted from it (purple for light surfaces, white for dark), and the
favicons are cut from the same mark. Replace them with vector files when those exist.

The Intelligence Field texture is painted in code by `src/components/ParticleField.tsx`; the
isometric Plane Network in `src/components/Ui.tsx` is used only as a faint layer on the
horizon band and for the channel card marks.

## Sharing a build

```bash
npm run package
```

Bundles the site into `package/index.html` (JS and CSS inlined, routes in the hash) with the
brand images beside it, and zips the folder to `package.zip`. Open it from disk or host the
folder anywhere. Both outputs are ignored by git.
