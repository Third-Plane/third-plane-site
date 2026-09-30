# Third Plane site (Vite + React)

Marketing site for [thirdplane.com](https://www.thirdplane.com).

| Route               | Page                                           | Copy lives in `src/content/` |
| ------------------- | ---------------------------------------------- | ---------------------------- |
| `/`                 | Home                                           | `home.json`                  |
| `/placement-desk`   | Placement Desk                                 | `placement-desk.json`        |
| `/security`         | Security and governance                        | `security.json`              |
| `/carrier-channels` | Carrier channels                               | `carrier-channels.json`      |
| `/integrations`     | System integrations                            | `integrations.json`          |
| `/applied-epic`     | Applied Epic                                   | `applied-epic.json`          |
| `/company`          | Company: Austin, origin, principles, team      | `company.json`               |
| `/careers`          | Careers, with an open-roles list               | `careers.json`               |
| `/resources`        | Resources index: technical, perspective, press | `resources.json`             |
| `/resources/:slug`  | One post                                       | `posts/<slug>.json`          |

`site.json` holds the company name, contact details, the default meta description, the footer
tagline and the default closing call to action. The primary nav (`primaryNav`) and footer links
(`siteFooter`) stay in [`src/data/content.ts`](src/data/content.ts), because their links have to
match the routes. `/underwriting-desk` redirects to `/company#next` (the Underwriting Desk is no
longer a standalone page). Unknown paths get the Not found page with a 404 status.

## Editing content

Content is edited in [Pages CMS](https://pagescms.org), which gives each file in `src/content/` a
form and commits the change to GitHub; Vercel then deploys it. Editors are invited by email and do
not need a GitHub account. The forms are defined in [`.pages.yml`](.pages.yml).

- **Posts:** add one under Posts. New posts start as drafts, which render in the dev server only;
  turn Draft off to publish, and the build emits `resources/<slug>.html`.
- **Video:** set the video (and optionally a poster) under Home → Video. The section appears as
  soon as a video is set.
- **Team photo:** set it under About → Team. Until then the Company page shows a marked
  placeholder.
- **Open roles:** add them under Careers → Open roles. With none, the page shows an invitation to
  write in.

Uploaded images and video go to `public/media/`.

### Changing the shape of the content

Pages CMS rewrites a file from its form when an editor saves, so **a field that is in the JSON but
not in `.pages.yml` is dropped on the next save**. It also drops empty strings, empty lists and
empty objects. When a page starts using a new field:

1. Add it to the JSON file and to that file's form in `.pages.yml`.
2. Add it to the file's type in [`src/data/content-types.ts`](src/data/content-types.ts). Anything
   an editor can leave blank must be optional there and handled where it renders.

`npm run build` runs [`scripts/check-content.mjs`](scripts/check-content.mjs) first, which fails if
any JSON value has no matching form field, has the wrong kind, or a required field is missing; `tsc`
then checks the JSON against the types. Copy that no page renders is kept in
[`src/data/unused-copy.json`](src/data/unused-copy.json) and is not in the CMS.

**Adding a page:** add it to `pages` in `src/routes.tsx` (that routes it, prerenders it and lists it
in the sitemap), give it a JSON file and a form, and link it from `primaryNav` or `siteFooter`. Call
`useTitle` with the page's title and description; they become its `<title>`, meta description and
Open Graph tags.

## Tech stack

- Vite
- React 19
- TypeScript
- React Router
- Plain CSS in `src/index.css`

Copy lives in [`src/content/`](src/content) as JSON. Components handle layout only.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build
npm run preview
npm run lint          # oxlint, configured in .oxlintrc.json
npm run format        # oxfmt, configured in .oxfmtrc.json
npm run format:check
```

In VS Code, install the recommended Oxc extension (`oxc.oxc-vscode`). The workspace settings in
`.vscode/` make it the formatter and apply oxlint fixes on save. `src/content/` is excluded from
formatting because Pages CMS writes those files in its own layout.

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
