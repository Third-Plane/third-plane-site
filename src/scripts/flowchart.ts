// The hero flowchart, in motion. A chart (data-chart, one of
// flowchart/charts.ts) is set in Berkeley Mono on a character grid and
// painted to a canvas: the chart at rest is drawn once to an offscreen layer,
// and each frame repaints only the cells that are lit, where packets run the
// routes, nodes work and logs take new entries.
//
// Each <canvas data-flowchart> fills its positioned parent. The chart is
// scaled to fit the band under the nav and centred in it, but its cells are
// never narrower than data-cell CSS pixels (the font size follows from the
// cell): on a narrow screen it is cropped instead. data-alpha sets the overall
// strength. It pauses while off-screen or in a hidden tab, and under
// prefers-reduced-motion it paints one frame and stops.
//
// Where WebGL is available the frame is drawn offscreen and shown through
// the lens (flowchart/lens.ts), which bends it like a CRT and splits its
// colour toward the edges, under faint scanlines: data-curve sets how far it
// bends, data-fringe how far the colours part, in CSS pixels, data-scan how
// dark the scanlines are, data-noise how strong the grain is, and data-roll
// and data-glow how much the rolling bar strengthens the ink and lifts the
// screen (0 for all six shows it plain).

import { SPEED, buildFlow, startOf, type Flow, type LogEntry } from "./flowchart/chart";
import { CHARTS, type ChartName } from "./flowchart/charts";
import { crossed } from "./flowchart/feed";
import { Kind } from "./flowchart/grid";
import { createLens } from "./flowchart/lens";

// The face is declared in index.css. Its cell is 0.6em wide and 1.2em tall,
// with the baseline 0.956em down: box-drawing glyphs fill the cell exactly, so
// lines join across cells.
const FAMILY = '"TX-02", ui-monospace, monospace';
const ADVANCE = 0.6;
const LINE = 1.2;
const ASCENT = 0.956;

const RGB = "99,56,227";
const LEVELS = 32;

// How strongly each kind of cell sits at rest, before data-alpha.
const REST: Record<Kind, number> = {
  [Kind.empty]: 0,
  [Kind.line]: 0.3,
  [Kind.frame]: 0.42,
  [Kind.text]: 0.5,
  [Kind.strong]: 0.66,
  [Kind.shade]: 0.22,
  [Kind.head]: 0.45,
  [Kind.note]: 0.38,
};

// Cells a second a node's border light runs, and how many cells it trails.
const COMET_SPEED = 26;
const COMET = 4;
// Cells of trail behind a packet.
const TRAIL = 7;
// Seconds a node takes to settle once its work is done.
const FADE = 0.5;
const SPIN = ["▖", "▘", "▝", "▗"];
const FPS = 30;
// Seconds a new log entry takes to settle, and the number the first is given.
const LOG_FADE = 1.2;
const LOG_FROM = 1000;

const flows: Partial<Record<ChartName, Flow>> = {};

// One of the surface colours around an element (--background, --foreground),
// as 0 to 1 RGB: resolved by the browser on a probe, then read back off a
// pixel, so any CSS colour works. Anything unreadable comes out white.
function colorOf(el: HTMLElement, name: string) {
  const probe = document.createElement("i");
  probe.style.color = `var(${name})`;
  el.parentElement?.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) return [1, 1, 1];
  ctx.fillStyle = "#fff";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return [...ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)].map((v) => v / 255);
}

function chart(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement;
  if (!parent) return;
  const {
    chart: name = "placement",
    alpha = "1",
    cell: cellAttr = "6",
    curve = "0",
    fringe = "0",
    scan = "0",
    noise = "0",
    roll = "0",
    glow = "0",
  } = canvas.dataset;
  const optics = {
    curve: Number(curve),
    fringe: Number(fringe),
    scan: Number(scan),
    noise: Number(noise),
    roll: Number(roll),
    glow: Number(glow),
    paper: colorOf(canvas, "--background"),
    ink: colorOf(canvas, "--foreground"),
  };
  const effects = Object.values(optics).filter((v) => typeof v === "number");
  const lens = effects.some((v) => v > 0) ? createLens(canvas, optics) : undefined;
  // The 2D frame: the canvas itself, or an offscreen one the lens shows.
  const surface = lens ? document.createElement("canvas") : canvas;
  const ctx = surface.getContext("2d");
  if (!ctx) return;
  const spec = CHARTS[name as ChartName];
  if (!spec) return;
  const flow = (flows[name as ChartName] ??= buildFlow<string, string>(spec));
  const { cols, rows, glyphs, kinds, nodes, routes, events, logs, period } = flow;

  const a = Number(alpha);
  const minCell = Number(cellAttr);
  // The cell and its type, set to fit on each resize.
  let cw = minCell;
  let ch = cw * (LINE / ADVANCE);
  let baseline = 0;
  let regular = "";
  let bold = "";

  const palette = Array.from(
    { length: LEVELS + 1 },
    (_, i) => `rgba(${RGB},${((i / LEVELS) * a).toFixed(3)})`,
  );
  const tone = (level: number) => palette[Math.round(Math.min(1, level) * LEVELS)];

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const base = document.createElement("canvas");
  const bctx = base.getContext("2d");
  if (!bctx) return;

  let w = 1;
  let h = 1;
  // Where the chart's top left cell sits, in CSS pixels.
  let ox = 0;
  let oy = 0;
  let ready = false;
  let raf = 0;
  let last = 0;
  let drawn = 0;
  let time = 0;
  let visible = true;

  // This frame's lit cells: how bright, and a glyph standing in for the
  // chart's own (a packet on a line, a spinner, a filling bar).
  const lit = new Float32Array(glyphs.length);
  const swap: (string | undefined)[] = new Array(glyphs.length);
  const touched: number[] = [];
  const light = (i: number, level: number, glyph?: string) => {
    if (!lit[i] && !swap[i]) touched.push(i);
    if (level >= lit[i]) {
      lit[i] = level;
      if (glyph) swap[i] = glyph;
    }
  };

  const paint = (target: CanvasRenderingContext2D, i: number, glyph: string, level: number) => {
    const x = ox + (i % cols) * cw;
    const y = oy + Math.floor(i / cols) * ch;
    target.font = kinds[i] === Kind.strong ? bold : regular;
    target.fillStyle = tone(level);
    target.fillText(glyph, x, y + baseline);
  };

  const layer = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    base.width = w * dpr;
    base.height = h * dpr;
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bctx.clearRect(0, 0, w, h);
    glyphs.forEach((glyph, i) => {
      if (glyph && glyph !== " ") paint(bctx, i, glyph, REST[kinds[i] as Kind]);
    });
  };

  const route = (path: number[], u: number) => {
    const head = Math.floor(u * SPEED);
    for (let n = 0; n <= TRAIL; n++) {
      const step = head - n;
      if (step < 0 || step >= path.length) continue;
      const i = path[step];
      const k = kinds[i];
      const level = n === 0 ? 1 : 0.85 * (1 - n / (TRAIL + 1));
      light(i, level, n === 0 && k === Kind.line ? "■" : undefined);
    }
  };

  const work = (id: string, u: number, dur: number) => {
    const node = nodes[id];
    const busy = u < dur;
    const env = busy ? Math.min(1, u / 0.15) : 1 - (u - dur) / FADE;
    if (env <= 0) return;
    for (const i of node.border) light(i, 0.42 + 0.3 * env);
    for (const i of node.label) light(i, 0.5 + 0.45 * env);
    if (busy) {
      const ring = node.border.length;
      const at = Math.floor(u * COMET_SPEED);
      for (let n = 0; n < COMET; n++) {
        light(node.border[(((at - n) % ring) + ring) % ring], 1 - n / COMET);
      }
    }
    if (node.spinner !== undefined && busy) {
      light(node.spinner, 1, SPIN[Math.floor(u * 8) % SPIN.length]);
    }
    if (node.bar) {
      const filled = Math.round(Math.min(1, u / dur) * node.bar.length);
      node.bar.forEach((i, n) => {
        if (n < filled) light(i, 0.35 + 0.55 * env, "▓");
      });
    }
  };

  // A log's rows at time t: the latest entries, the newest at the foot, reaching
  // back into earlier loops when this one has had too few yet. Each is
  // numbered in sequence across loops, and a new one is lit as it lands.
  const writeLog = (id: string, entries: LogEntry[], t: number) => {
    const lines = nodes[id].rows;
    if (!lines || !entries.length) return;
    let loop = Math.floor(t / period);
    let k = entries.findLastIndex((e) => e.start <= t - loop * period);
    for (let r = lines.length - 1; r >= 0; r--, k--) {
      if (k < 0) {
        loop -= 1;
        k = entries.length - 1;
      }
      const e = entries[k];
      const n = String(LOG_FROM + loop * entries.length + k).padStart(4, "0");
      const text = e.text.replace("{n}", n);
      const age = t - (loop * period + e.start);
      const rest = REST[Kind.text];
      const level = rest + (1 - rest) * Math.max(0, 1 - age / LOG_FADE);
      lines[r].forEach((i, c) => {
        if (c < text.length && text[c] !== " ") light(i, level, text[c]);
      });
    }
  };

  const draw = (t: number) => {
    ctx.clearRect(0, 0, w, h);
    if (!ready) return;
    ctx.drawImage(base, 0, 0, w, h);

    for (const e of events) {
      const u = (((t - e.start) % period) + period) % period;
      if (e.kind === "route") {
        if (u < e.dur + TRAIL / SPEED) route(routes[e.id], u);
      } else if (u < e.dur + FADE) {
        work(e.id, u, e.dur);
      }
    }
    for (const [id, entries] of Object.entries(logs)) writeLog(id, entries, t);

    for (const i of touched) {
      const glyph = swap[i] ?? glyphs[i];
      const x = ox + (i % cols) * cw;
      const y = oy + Math.floor(i / cols) * ch;
      ctx.clearRect(x, y, cw, ch);
      if (glyph && glyph !== " ") paint(ctx, i, glyph, Math.max(lit[i], REST[kinds[i] as Kind]));
      lit[i] = 0;
      swap[i] = undefined;
    }
    touched.length = 0;
    lens?.render(surface, reduce.matches ? undefined : t);
  };

  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    // Tell the page each moment the chart passes (the activity panel follows
    // them; see flowchart/feed.ts).
    for (const note of crossed(flow, time, time + dt)) {
      canvas.dispatchEvent(new CustomEvent("flowchart:note", { bubbles: true, detail: note }));
    }
    time += dt;
    if (now - drawn >= 1000 / FPS - 2) {
      drawn = now;
      draw(time);
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (raf || reduce.matches || !ready) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  // A moment with work in flight across the chart, for the still frame.
  const STILL = startOf(flow);

  const resize = () => {
    const rect = parent.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    surface.width = canvas.width = w * dpr;
    surface.height = canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    lens?.resize(canvas.width, canvas.height, dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textBaseline = "alphabetic";

    // The largest cell that fits the chart in the band under the nav, but no
    // smaller than the floor, and whole device pixels wide so every cell edge
    // lands on a pixel (and lines join cleanly). Centred in that band.
    const nav = parseFloat(getComputedStyle(canvas).getPropertyValue("--nav-h")) || 0;
    const fit = Math.min(w / cols, (h - nav) / (rows * (LINE / ADVANCE)));
    cw = Math.max(1, Math.floor(Math.max(minCell, fit) * dpr)) / dpr;
    ch = cw * (LINE / ADVANCE);
    const size = cw / ADVANCE;
    baseline = size * ASCENT;
    regular = `${size}px ${FAMILY}`;
    bold = `700 ${size}px ${FAMILY}`;
    const snap = (v: number) => Math.round(v * dpr) / dpr;
    ox = snap((w - cols * cw) / 2);
    oy = snap(nav + Math.max(0, (h - nav - rows * ch) / 2));

    if (!ready) return;
    layer();
    draw(reduce.matches ? STILL : time);
  };

  resize();

  Promise.all([
    document.fonts.load(`16px ${FAMILY}`, "─AB"),
    document.fonts.load(`700 16px ${FAMILY}`, "AB"),
  ]).then(() => {
    ready = true;
    time = STILL;
    resize();
    start();
  });

  new ResizeObserver(resize).observe(parent);

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { rootMargin: "10% 0px" },
  ).observe(canvas);

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  reduce.addEventListener("change", () => {
    if (reduce.matches) {
      stop();
      draw(STILL);
    } else {
      start();
    }
  });
}

document.querySelectorAll<HTMLCanvasElement>("canvas[data-flowchart]").forEach(chart);
