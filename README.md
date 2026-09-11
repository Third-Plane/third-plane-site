# Third Plane site (Vite + React)

Marketing site for [thirdplane.com](https://www.thirdplane.com).

| Route | Page | Copy lives in |
| --- | --- | --- |
| `/` | Home | `homeHero`, `problem`, `approach`, `desk`, `deployment`, `company`, `horizon`, `contact` |
| `/placement-desk` | Placement Desk | `placementDesk` |
| `/underwriting-desk` | Underwriting Desk (in development) | `underwritingDesk` |
| `/alpine` | Alpine, the platform | `alpinePage` |
| `/security` | Security and governance | `securityPage` |
| `/company` | Company: Austin, origin, principles, team | `companyPage` |
| `/careers` | Careers, with an open-roles list | `careersPage` |
| `/resources` | Resources index: technical, perspective, press | `resourcesPage` |
| `/resources/:slug` | One post | `src/data/posts.ts` |

All of the above are exports of `src/data/content.ts` unless noted. The primary nav (`primaryNav`)
has a Desks menu with a Capabilities group; the footer is `siteFooter`.

**Adding a page:** add the route in `src/App.tsx`, add its path to `ROUTES` in `vite.config.ts`
(so static hosts get an `index.html` for it), and link it from `primaryNav` or `siteFooter`.

**Adding a post:** append to `posts` in `src/data/posts.ts`. Posts marked `draft: true` render in
the dev server only. Remove the flag to publish; the build emits `resources/<slug>/index.html`.

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

Production is **https://www.thirdplane.com/**, hosted on Vercel and built from `main`. The apex `thirdplane.com` redirects to `www`. Because that site is served from the root, `vite.config.ts` defaults `base` to `/`.

The domain is managed in Vercel, not in GitHub Pages, so there is deliberately no `public/CNAME`.

### The GitHub Pages mirror

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) also builds every push to `main` and publishes `dist/` to `https://third-plane.github.io/third-plane-site/`. Pages project sites are served from a subpath, so that build sets:

```bash
BASE_PATH=/third-plane-site/ npm run build
```

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
