# Handoff: scroll-driven chess-piece animation

**Status:** first attempt built, reviewed, and removed (founder verdict: "the chess piece is particularly bad"). The scaffolding was sound; the visuals were not. This doc gives you everything to try again without re-deriving the plumbing. The complete removed source is in the appendix.

## The brief

Add a scroll-driven knight/chess-piece animation to the Third Plane site — the piece should "move, duplicate, multiply, transform, explode, particle style" as the user scrolls. Goal is flair; the site should feel a bit sexy. It must never compromise legibility, and it should feel like it belongs to this brand (cream/teal/coral, restrained, editorial), not like a particles.js demo.

## Site context

- Vite + React 19, no animation libraries installed. Plain CSS in `src/index.css` (design tokens at the top). Copy lives in `src/content.js`; components in `src/components/`.
- Dev server: `npm run dev` (port 5173). Checks: `npm run lint` (oxlint), `npm run build`.
- The knight is already a brand element: the "Why now" section (`#why`, component `Shift.jsx`) has a dark exhibit card with a **line-art knight SVG** standing on the brand's three skewed bars. Path (viewBox `0 0 120 138`, closed silhouette, drawn as a 2px stroke there):

  ```
  M62 18 L70 30 L84 44 L92 66 L96 92 L98 112 L40 112 L46 92 L38 88 L44 72
  L30 74 L20 64 L22 54 L34 52 L40 40 L50 30 L54 18 L58 26 Z
  ```

- Brand mark = three skewX(-24°) bars: coral `#e2573f`, teal `#3e7f84`, deep `#1c3f44`.
- Design tokens you'll want: ink `#0f2126`, teal `#1e6b7d`, cream `#f2efe6`, dark-section bg `#1c2a2c`, light teal for dark bgs `#8fc0c9`.
- Section anchors in page order: `#top` (hero), `#why` (dark), `#orgchart`, `#chokepoint`, `#solutions`, `#example`, `#deployments`, `#alpine`, `#integrations` (dark inset shell inside a light section), `#evidence`, `#contact`. The page uses CSS scroll-snap (`y proximity`, desktop only) and an IntersectionObserver reveal system (`src/useReveal.js`, `[data-reveal]` attributes) — don't fight either.

## The narrative concept (approved in spirit — keep it)

The animation retells the site's argument as you scroll. This mapping felt right and the founder didn't object to it — the *rendering* was the problem:

| Scroll position | Formation | Meaning |
|---|---|---|
| Hero | one lone knight | individual excellence |
| `#why` | multiplies into a scattered cloud of identical knights | execution commoditized |
| `#orgchart` | snaps into a tidy grid | reorganization |
| `#chokepoint` | funnels through a horizontal pinch | the placement bottleneck |
| `#example` | flowing stream, left → right | work carried end to end |
| `#alpine` | three columns | execution / authority / proof |
| `#evidence` | wide orbit ring | (weakest mapping — feel free to rethink) |
| `#contact` | dissolves into dots that reform as the three skewed brand bars | the knight becomes Third Plane |

## Architecture that worked — reuse it

1. **Layering.** A fixed, full-viewport `<canvas class="particles">` with `z-index: 1`, `pointer-events: none`. Give `.container` `position: relative; z-index: 2`. Sections keep their opaque backgrounds at `z-auto`. Result: particles draw **above section backgrounds but below all content** — they weave behind cards and can never sit on top of copy. This was removed from `index.css`; re-add both rules.
2. **Scroll engine.** Keyframe stops = section elements. Measure each stop's absolute center once (and re-measure via `ResizeObserver` on `document.body` — fonts/images shift layout). Per frame: `p = scrollY + viewportH/2`, find the bracketing stops, `t = smoothstep((p - a) / (b - a))`, interpolate each particle between `layoutA(i)` and `layoutB(i)`. Scrubbing plays the story forward and backward for free. Sections without a stop just stretch the morph — good, it keeps motion slow.
3. **Transition energy.** `burst = 4·t·(1−t)` — wobble/rotation amplitude peaks mid-morph and settles to near-zero at each formation. Reads as "explode → reform" without a physics sim.
4. **Adaptive palette.** Particles over dark ranges (`#why`, `.footer`) switch ink→cream and teal→`#8fc0c9`. Compute dark ranges at measure time; test per particle by absolute y. ~10% coral, ~16% teal, rest neutral.
5. **Gating.** Render nothing under `prefers-reduced-motion: reduce` and below 901px (matches the site's snap-scroll philosophy). `matchMedia` listeners, component returns `null`.
6. **Perf.** Single rAF loop, `devicePixelRatio` capped at 2, skip when `document.hidden`. 96 `Path2D` fills per frame was nowhere near a bottleneck.

## Why it got cut — fix these

1. **The knight read as a blob.** A *filled* silhouette of that angular path at 12–30px looks like a smudge/arrowhead; in screenshots people couldn't tell it was a chess piece. The exhibit knight works because it's a 2px *stroke* at ~130px. At particle scale, either (a) stroke the outline instead of filling, (b) use far fewer, far larger knights (8–16 at 60–120px) so the icon stays legible, or (c) drop the literal knight for particles except at hero scale, where one big stroked knight can shatter *into* abstract particles (dots/bar fragments) — probably the strongest option: "knight explodes into particles" needs exactly one legible knight.
2. **Formations were too literal and too even.** Uniform-random cloud + 12-column grid + sine wave looked like a physics-class demo, not design. Consider: fewer particles with size hierarchy, cluster-based scatter (Poisson-ish), formations aligned to the actual content grid (e.g., grid phase snapping to the four org-chart cards' corners), and easing per particle (staggered arrival by index) instead of one global `t`.
3. **The bars finale was sparse confetti.** 96 dots across three 540px bars, jittered, read as scattered dots rather than the mark. Either use many more dots for that phase only, render the bars as three actual shapes that particles merge into (crossfade particles out, fade a crisp SVG mark in), or drop the finale.
4. **Watermark noise behind text.** Even at alpha 0.13, dozens of shapes behind body copy add visual static. Prefer concentrating the effect in the *empty* regions (margins, section gaps, the band above the CTA shell) and near-zero density behind text columns. A per-particle "avoid the container column" constraint (x outside `[containerLeft, containerRight]` while inside a section with text) is one cheap approach.

Also inherited gotchas:

- The CTA shell (`.cta__shell`) is opaque and owns the center of the final viewport — the finale must live in the open band above it (`y ≈ 0.17·viewportH`) or in the side margins.
- The `#integrations` dark shell is *inside* the container (z 2), so particles vanish behind it — plan that section's phase accordingly (edges only).
- Headless-screenshot verification: programmatic fast scrolling races the site's IntersectionObserver reveals; force them before screenshotting: `document.querySelectorAll('[data-reveal]').forEach(e => e.setAttribute('data-revealed','true'))`. A puppeteer-core rig against the running dev server (viewport 1440×900, screenshot at each section) is how the first attempt was reviewed.

## Definition of done

- Founder-approved look at every phase (screenshot each section at 1440×900, plus mid-morph frames).
- No text legibility loss anywhere; nothing renders above content.
- Disabled under reduced-motion and below 901px; no jank while scroll-snap settles.
- `npm run lint` and `npm run build` clean. No new dependencies unless justified (a small lib like motion is acceptable if it earns its keep).

## Appendix — removed first attempt (was `src/components/ParticleField.jsx`)

Wired up as `<ParticleField />` first child of the App fragment, plus the two CSS rules described in "Layering". Works end to end; the problems are aesthetic, listed above.

```jsx
import { useEffect, useRef, useState } from 'react'

const KNIGHT =
  'M62 18 L70 30 L84 44 L92 66 L96 92 L98 112 L40 112 L46 92 L38 88 L44 72 L30 74 L20 64 L22 54 L34 52 L40 40 L50 30 L54 18 L58 26 Z'

const COUNT = 96

// Deterministic per-particle noise, so layouts are stable across frames.
const frac = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const lerp = (a, b, t) => a + (b - a) * t
const smooth = (t) => t * t * (3 - 2 * t)
const clamp01 = (t) => Math.min(1, Math.max(0, t))

/* Each layout maps particle index → viewport-space target.
   s: knight scale · r: rotation · a: alpha · dot: 0 knight → 1 plain dot */
const layouts = {
  lone: (i, w, h) => ({
    x: w * 0.5, y: h * 0.62, s: 3.2, r: 0, a: i === 0 ? 0.22 : 0, dot: 0,
  }),
  cloud: (i, w, h) => ({
    x: frac(i, 1) * w, y: frac(i, 2) * h,
    s: 0.55 + frac(i, 3) * 0.6, r: (frac(i, 4) - 0.5) * 0.9, a: 0.13, dot: 0,
  }),
  grid: (i, w, h) => {
    const cols = 12
    const rows = Math.ceil(COUNT / cols)
    const m = w * 0.06
    return {
      x: m + (i % cols) * ((w - 2 * m) / (cols - 1)),
      y: h * 0.12 + Math.floor(i / cols) * ((h * 0.76) / (rows - 1)),
      s: 0.62, r: 0, a: 0.15, dot: 0,
    }
  },
  funnel: (i, w, h) => {
    const t = (i + 0.5) / COUNT
    const x = w * 0.04 + t * w * 0.92
    const pinch = Math.pow(Math.abs(x - w / 2) / (w / 2), 1.6)
    return {
      x, y: h * 0.5 + (frac(i, 5) - 0.5) * h * 0.72 * pinch,
      s: 0.5 + 0.3 * pinch, r: 0, a: 0.16, dot: 0,
    }
  },
  wave: (i, w, h) => {
    const t = (i + 0.5) / COUNT
    return {
      x: t * w,
      y: h * 0.5 + Math.sin(t * Math.PI * 3 + 0.8) * h * 0.16 + (frac(i, 6) - 0.5) * h * 0.05,
      s: 0.55, r: Math.sin(t * 6) * 0.3, a: 0.15, dot: 0,
    }
  },
  columns: (i, w, h) => ({
    x: w * (0.22 + (i % 3) * 0.28) + (frac(i, 7) - 0.5) * w * 0.1,
    y: h * 0.12 + frac(i, 8) * h * 0.76,
    s: 0.6, r: 0, a: 0.13, dot: 0,
  }),
  ring: (i, w, h) => {
    const t = (i / COUNT) * Math.PI * 2
    return {
      x: w / 2 + Math.cos(t) * w * 0.44, y: h / 2 + Math.sin(t) * h * 0.42,
      s: 0.5, r: t + Math.PI / 2, a: 0.11, dot: 0,
    }
  },
  bars: (i, w, h) => {
    const bar = i % 3
    const L = Math.min(w * 0.38, 540)
    // High in the viewport: the CTA shell owns the centre of the final screen.
    const cy = h * 0.17
    const gap = Math.min(h * 0.05, 30)
    const y = cy + (bar - 1) * gap + (frac(i, 10) - 0.5) * 8
    return {
      x: w / 2 - L / 2 + frac(i, 9) * L - (y - cy) * 0.9,
      y, s: 1, r: 0, a: 0.8, dot: 1, bar,
    }
  },
}

// Section anchors → layouts, in page order. Sections without a stop simply
// stretch the morph between their neighbours.
const STOPS = [
  ['#top', 'lone'],
  ['#why', 'cloud'],
  ['#orgchart', 'grid'],
  ['#chokepoint', 'funnel'],
  ['#example', 'wave'],
  ['#alpine', 'columns'],
  ['#evidence', 'ring'],
  ['#contact', 'bars'],
]

const colorFor = (i, dark, target) => {
  if (target.dot > 0.5) {
    return ['#e2573f', '#3e7f84', dark ? '#8fc0c9' : '#1c3f44'][target.bar]
  }
  const r = frac(i, 11)
  if (r < 0.1) return '#e2573f'
  if (r < 0.26) return dark ? '#8fc0c9' : '#1e6b7d'
  return dark ? '#f2efe6' : '#0f2126'
}

export default function ParticleField() {
  const canvasRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const width = window.matchMedia('(min-width: 901px)')
    const update = () => setEnabled(!motion.matches && width.matches)
    update()
    motion.addEventListener('change', update)
    width.addEventListener('change', update)
    return () => {
      motion.removeEventListener('change', update)
      width.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const path = new Path2D(KNIGHT)

    let raf
    let stops = []
    let darkRanges = []

    const measure = () => {
      const centers = []
      for (const [sel, layout] of STOPS) {
        const el = document.querySelector(sel)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        centers.push({ center: top + el.offsetHeight / 2, layout })
      }
      stops = centers
      darkRanges = ['#why', '.footer'].flatMap((sel) => {
        const el = document.querySelector(sel)
        if (!el) return []
        const top = el.getBoundingClientRect().top + window.scrollY
        return [[top, top + el.offsetHeight]]
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measure()
    }

    resize()
    window.addEventListener('resize', resize)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (document.hidden || stops.length < 2) return

      const w = window.innerWidth
      const h = window.innerHeight
      const time = now * 0.001
      ctx.clearRect(0, 0, w, h)

      const p = window.scrollY + h * 0.5
      let k = 0
      while (k < stops.length - 2 && p > stops[k + 1].center) k += 1
      const a = stops[k]
      const b = stops[k + 1]
      const t = clamp01((p - a.center) / (b.center - a.center))
      const e = smooth(t)
      const burst = 4 * t * (1 - t)

      const layoutA = layouts[a.layout]
      const layoutB = layouts[b.layout]

      for (let i = 0; i < COUNT; i += 1) {
        const A = layoutA(i, w, h)
        const B = layoutB(i, w, h)
        const alpha = lerp(A.a, B.a, e)
        if (alpha < 0.004) continue

        const dotNow = lerp(A.dot, B.dot, e)
        // Settled dots hold formation; knights keep a light idle drift.
        const wob = (5 + burst * 26) * (0.4 + frac(i, 12)) * (1 - dotNow * 0.85)
        const x = lerp(A.x, B.x, e) + Math.sin(time * 0.6 + i * 2.13) * wob
        const y = lerp(A.y, B.y, e) + Math.cos(time * 0.5 + i * 1.71) * wob * 0.7
        const s = lerp(A.s, B.s, e)
        const r = lerp(A.r, B.r, e) + burst * (frac(i, 13) - 0.5) * 1.6
        const dot = dotNow

        const absY = y + window.scrollY
        const dark = darkRanges.some(([top, bottom]) => absY > top && absY < bottom)
        const target = B.dot > A.dot ? B : A
        ctx.fillStyle = colorFor(i, dark, target)
        ctx.globalAlpha = alpha

        if (dot > 0.5) {
          ctx.beginPath()
          ctx.arc(x, y, 3.2 + frac(i, 14) * 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(r)
          const k2 = s * 0.22
          ctx.scale(k2, k2)
          ctx.translate(-59, -65)
          ctx.fill(path)
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      ro.disconnect()
    }
  }, [enabled])

  if (!enabled) return null
  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />
}
```

CSS that accompanied it (removed from `src/index.css`):

```css
.container {
  position: relative;
  z-index: 2;
  /* ...existing container rules unchanged... */
}

.particles {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
```
