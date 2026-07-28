# Third Plane — landing page

A single-page marketing site for Third Plane, built from the v1 wireframe. Ten sections:
sticky nav, hero with an agent-run diagram, a scrolling proof ticker, the problem, what we
sell, the Alpine substrate, the QuoteWell Inbox proof section, evidence numbers, the
engagement process, and a closing CTA.

## Tech stack

| | |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Plain CSS with custom properties (`src/index.css`) — no CSS framework |
| Linting | oxlint |
| Fonts | Plus Jakarta Sans (display), Inter (body), JetBrains Mono (labels) via Google Fonts |

There is no runtime dependency beyond React. Scroll reveals use a small `IntersectionObserver`
hook (`src/useReveal.js`) and everything else is CSS.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/third-plane-site/
npm run build    # production build into dist/
npm run preview  # serve the built output
npm run lint     # oxlint
```

The dev URL includes the `/third-plane-site/` path because `base` is set for GitHub Pages —
see [Publishing](#publishing-to-github-pages).

## Editing the copy

Every piece of text on the page lives in [`src/content.js`](src/content.js), exported as one
object per section (`hero`, `problem`, `product`, `alpine`, `proof`, `evidence`, `engage`,
`cta`, plus `site`, `nav`, and `ticker`). Components in `src/components/` import those objects
and handle layout only, so you can rewrite the entire page without touching JSX.

To change the headline, edit `hero.titleLead` / `hero.titleAccent`. To add a fourth problem
card, push another object onto `problem.cards` — the grid picks it up automatically. Contact
details and the CTA button label come from `site`.

## Layout and spacing

`src/index.css` defines the design tokens at the top: colours, fonts, and a spacing scale
(`--s-1` … `--s-9`) plus shared rhythm values (`--section-y`, `--gutter`, `--container`,
`--gap-grid`, `--card-pad`). Sections share a single `.section` padding rule and a single
`.card` component, so vertical rhythm and card padding stay consistent by construction rather
than by repetition. Prefer adjusting a token over adding one-off pixel values.

Breakpoints are at 1024px (4-up grids become 2-up), 940px (hero and 3-up grids stack), and
720px (everything single column, nav collapses to a drawer). The layout has been verified
against horizontal overflow, left-edge alignment, card baseline alignment, text line length,
and touch-target size at 1440 / 1024 / 768 / 390.

## Publishing to GitHub Pages

The repo ships with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which
builds on every push to `main` and deploys `dist/` to Pages.

1. Create a GitHub repo named **`third-plane-site`** and push to `main`.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push. The workflow builds and publishes to
   `https://<user>.github.io/third-plane-site/`.

### Using a different repo name or a custom domain

`vite.config.js` sets `base` to `/third-plane-site/` because project Pages sites are served
from a subpath. If you rename the repo, update that default. If you deploy to a custom domain
or a `<user>.github.io` user site — both served from the root — build with the override
instead:

```bash
BASE_PATH=/ npm run build
```

Set it in the workflow as an env var on the `npm run build` step to make it permanent.
