# Third Plane site (Vite + React)

Marketing site for [thirdplane.com](https://www.thirdplane.com): Home and Placement Desk.

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
