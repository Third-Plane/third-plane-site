# Third Plane site (Astro + React)

Marketing site for [thirdplane.com](https://www.thirdplane.com).

| Route              | Page                                           | Copy lives in `src/content/` |
| ------------------ | ---------------------------------------------- | ---------------------------- |
| `/`                | Home                                           | `home.json`                  |
| `/placement-desk`  | Placement Desk                                 | `placement-desk.json`        |
| `/security`        | Security and governance                        | `security.json`              |
| `/integrations`    | System integrations                            | `integrations.json`          |
| `/applied-epic`    | Applied Epic                                   | `applied-epic.json`          |
| `/company`         | Company: Austin, origin, principles, team      | `company.json`               |
| `/careers`         | Careers, with an open-roles list               | `careers.json`               |
| `/resources`       | Resources index: technical, perspective, press | `resources.json`             |
| `/resources/:slug` | One post                                       | `posts/<slug>.json`          |

`site.json` holds the company name, contact details, the default meta description, the footer
tagline and the default closing call to action. The primary nav (`primaryNav`) and footer links
(`siteFooter`) stay in [`src/data/content.ts`](src/data/content.ts), because their links have to
match the routes. `/underwriting-desk` redirects to `/company` (the Underwriting Desk is no
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
   an editor can leave blank must be optional there and handled where it renders. For a post, the
   place is the `posts` schema in [`src/content.config.ts`](src/content.config.ts) instead, where a
   blank-able field takes a `.default()` or `.optional()`.

`npm run build` runs [`scripts/check-content.mjs`](scripts/check-content.mjs) first, which fails if
any JSON value has no matching form field, has the wrong kind, or a required field is missing; the
type-check then checks the page JSON against the types, and Astro checks each post against the
`posts` schema, failing with the file and field named. Copy that no page renders is kept in
[`src/data/unused-copy.json`](src/data/unused-copy.json) and is not in the CMS.

**Adding a page:** create `src/pages/<name>.astro` (it routes, builds and lists itself in the
sitemap). Wrap a component from `src/views/` in `<Base path title description>`; those props become
the page's `<title>`, meta description, canonical URL and Open Graph tags. Give the copy a JSON file
and a form, and link the page from `primaryNav` or `siteFooter`.

## Tech stack

- Astro (static output)
- React 19, used as a template language: components render to plain HTML at build time and ship no
  JavaScript
- TypeScript
- Tailwind CSS 4 (see below), with design tokens and base resets in `src/index.css`

Copy lives in [`src/content/`](src/content) as JSON. Components handle layout only.

### Styling: Tailwind

Components style themselves with Tailwind utilities in their `className`; there are no
hand-written component classes. [`src/tailwind.css`](src/tailwind.css) is the stylesheet the layout
loads. It imports Tailwind's theme and utilities, pulls in [`src/index.css`](src/index.css), and maps
the site's design tokens to utilities (`bg-purple`, `text-ink`, `font-heading`, `rounded-card`,
`text-copy`, and so on).

`index.css` is only the design tokens (`:root` custom properties) and the base element resets
(`body`, `a`, headings, lists, focus and selection styles). It has no class selectors.

- **Tokens stay in `index.css`.** Add or change a colour there (`--purple`), then expose it in the
  `@theme inline` block in `tailwind.css` if utilities should reach it. `--radius-sm` and
  `--shadow-lg` are the exception: Tailwind's `rounded-sm` and `shadow-lg` use those names, so they
  are defined in `tailwind.css` for both to share.
- **Utilities beat `index.css`.** It is loaded as the `components` layer, below `utilities`, so a
  utility always wins over a base rule.
- **No Tailwind reset.** Preflight is left out because `index.css` has its own; adding it would
  restyle every page. Bare elements (headings, buttons, lists) keep the site's base styles.
- **Type, sections and buttons are components, with props.** `Display1`, `Display2` and `Lead`
  (`components/Headings.tsx`), `Section` and `SectionHead`, `Button`, `ItemGrid`, `StepList`,
  `PageHero` and `SplitHero` take the choices that vary (`tone`, `size`, `family`, `variant`) as
  props and pick whole class strings, so two competing utilities never land on one element.
  Prefer adding a prop over passing extra classes that override a default.
- **Shared pieces in `tailwind.css`.** `wrap` (the page-width column) and `bg-hero` (the hero wash)
  are custom utilities; the scroll-reveal rules for `[data-reveal]` are there too, in the
  `utilities` layer so their transition wins over a component's own.
- **Breakpoints are the site's own.** Use `max-[900px]:` and `min-[901px]:`, not `lg:`; the
  layouts switch at 640, 760, 900, 980 and 1020px. The scale is unchanged if you add a new one.
- **Type sizes.** `text-copy` (1rem), `text-label` (0.875rem) and `text-title` (1.25rem) are the
  site's three sizes; `text-sm` and friends are Tailwind's, which differ.
- **Spacing utilities only exist for multiples of 0.25.** `mt-4`, `gap-1.5` and `h-8.5` work;
  `mt-1.4` generates nothing and fails silently. Write other values as `mt-[0.35rem]`.
- **Build a class from whole class names.** Tailwind finds classes by scanning the source, so
  `` `bg-${x}` `` is invisible to it. Use a lookup object of complete class strings.
- **Only `.astro`, `.tsx` and `.ts` files are scanned**, so a class must appear in one of them.
  Tailwind also generates any utility whose name appears in those files, even in a comment, which
  is harmless unless an element has that class.
- **Formatting.** `oxfmt` sorts utility classes (`sortTailwindcss` in `.oxfmtrc.json`). The
  recommended Tailwind CSS IntelliSense extension is pointed at `src/tailwind.css` in
  `.vscode/settings.json`.

The only JavaScript a visitor downloads is the few-KB script bundle from
[`src/scripts/`](src/scripts): the header menus, scroll reveals, the activity ledger and the
particle canvas. Each one finds its markup by a `data-*` attribute that the component renders, so a
component that needs behaviour stays plain JSX and gets a script alongside it. Do not add hooks,
state or `client:*` directives to a component: there is no React in the browser, and one island
would bring the React runtime (about 45 KB gzipped) back.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/
npm run build    # content check, type-check (astro check), then astro build
npm run preview  # serves dist/
npm run check    # type-check only
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

`npm run build` checks the content, type-checks, then renders every page in `src/pages/` to static
HTML in `dist/`. Each page arrives with its content, title, description, canonical URL and Open
Graph tags already in the HTML, so search engines, AI crawlers and link previews (LinkedIn, Slack)
read it without running JavaScript. The build also writes `404.html`, `sitemap.xml`
([`src/pages/sitemap.xml.ts`](src/pages/sitemap.xml.ts)) and structured data (Organization on the
homepage, BlogPosting on posts). Pages are separate HTML files, so navigating between them is an
ordinary page load.

[`vercel.json`](vercel.json) serves `/placement-desk` from `placement-desk.html` (`cleanUrls`), drops
trailing slashes, caches the hashed files in `/_astro/` as immutable, and holds the permanent
redirects for retired paths.

## Brand assets

The logo is the three-bar isometric mark from the sales deck. `public/brand/` holds raster
lockups and marks extracted from it (purple for light surfaces, white for dark), and the
favicons are cut from the same mark. Replace them with vector files when those exist.

The Intelligence Field texture is painted in code by `src/scripts/particles.ts`, on the canvas
that `src/components/ParticleField.tsx` renders. The channel card marks are the line drawings in
`src/components/CardMark.tsx`.
