# Third Plane website

Marketing site for Third Plane: AI workforces for insurance. Two pages in one bundle:

- `/` the homepage: hero, the capacity problem, where AI sits, the Placement Desk, how it is
  deployed, why Third Plane, horizon, closing CTA.
- `/placement-desk` the product page: how work enters, what the desk does, how much it takes
  on, carrier channels, what stays with people, CTA.

## Tech stack

| | |
| --- | --- |
| Framework | Vite + React 19, no other runtime dependencies |
| Styling | Plain CSS in `src/index.css`, design tokens at the top |
| Copy | `src/content.js` is the single source of truth; components handle layout only |
| Fonts | Karla (headlines) and Archivo (everything else) from Google Fonts |
| Lint | oxlint |

## Brand

Palette, type and graphic language follow the CSTMR identity (v1): cream `#F6F3F0`, bright
purple `#6338E3`, dark purple `#2D1F57`, soft pink `#F2D8FF`, soft blue `#E9F2F7`. Pill
buttons. Two atmospheric graphics are drawn in code in `src/components/ui.jsx`: the isometric
Plane Network and the Intelligence Field dot texture.

Logo lockups in `public/brand/` are raster extractions from the identity deck. Replace them with
the vector files when those are available.

## Messaging

Copy follows the Brand Messaging Framework and Positioning Narrative. Rules that shape the site:

- Insurance operators who understand AI, not AI people impressing insurance. Specific, calm,
  operational, commercial.
- Capacity and growth, never "efficiency" or headcount elimination.
- Placement Desk is the only named product. Future desks are not marketed. Platform names stay
  below the messaging layer.
- No performance claims, carrier counts, or end-to-end claims until tied to a measured deployment.

## Scripts

```bash
npm run dev      # dev server on :5173
npm run build    # production build to dist/
npm run lint
```

Production is served from the root of www.thirdplane.com. GitHub Pages builds with
`BASE_PATH=/third-plane-site/` (see `.github/workflows/deploy.yml`).
