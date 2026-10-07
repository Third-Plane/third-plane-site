// A hero flowchart, from its spec to the cells the renderer paints. Each chart
// (placement.ts, security.ts, integrations.ts) places its nodes and routes in
// character cells (see grid.ts) and scripts its animation: packets that travel
// the routes, the work each node does when one arrives, and the entries its
// logs take. The script runs once, over one loop of PERIOD seconds, and the
// loop repeats seamlessly. A script can also post notes, moments told to the
// page as the chart passes them (feed.ts), which the activity panel follows.
//
// A chart can be drawn several ways, one layout for each shape of window it
// is made for (wide, landscape, portrait...), and the page shows whichever is
// closest (scripts/flowchart.ts). The layouts share the one script: the first
// is the reference, which places every node and route and whose route lengths
// set how long each packet takes; in the others packets run faster or slower
// to keep that time, so the chart keeps the same clock whichever is showing. A
// layout after the first can leave nodes and routes out; their part of the
// script just isn't drawn there.

import { Kind, createGrid, type Head, type Point } from "./grid";

// Cells a packet covers a second, in the reference layout.
export const SPEED = 28;

// A box with a label. The first line is its name and any more are notes under
// it. A worker shows a spinner and a progress bar while it works. A log is a
// box with its name in the top border and `log` rows of entries, the newest at
// the foot, which scroll up as the script adds them.
export type NodeSpec = {
  x: number;
  y: number;
  w: number;
  label: string | string[];
  worker?: boolean;
  log?: number;
};

export type RouteSpec = {
  points: Point[];
  head?: Head;
  // Text set over the line, which breaks it; lit as a packet passes.
  label?: { text: string; x: number; y: number };
};

// One drawing of a chart, `cols` by `rows` cells, with `pad` blank cells
// around it (room for the nav above, say, or for the window to crop into).
export type LayoutSpec<N extends string, R extends string> = {
  cols: number;
  rows: number;
  pad?: Partial<Pad>;
  nodes: Partial<Record<N, NodeSpec>>;
  routes: Partial<Record<R, RouteSpec>>;
  // The title plate, a double box as on a drawing. Its first line is bold.
  plate?: { x: number; y: number; w: number; lines: string[] };
  notes?: { x: number; y: number; text: string; strong?: boolean }[];
};

export type ChartSpec<N extends string, R extends string> = {
  // The reference layout first, with every node and route, then any others.
  layouts: [
    LayoutSpec<N, R> & { nodes: Record<N, NodeSpec>; routes: Record<R, RouteSpec> },
    ...LayoutSpec<N, R>[],
  ];
  period: number;
  script: (s: Script<N, R>) => void;
};

// What a chart's script can do. go sends a packet down a route and work keeps
// a node busy; both return when they finish, so steps chain. log adds an entry
// to a log node; "{n}" in its text becomes the entry's running number. note
// posts a moment to the page: what happened, and numbers that say which job
// and what of.
export type Script<N extends string, R extends string> = {
  go: (id: R, t: number) => number;
  work: (id: N, t: number, dur: number) => number;
  log: (id: N, t: number, text: string) => void;
  note: (t: number, kind: string, data: NoteData) => void;
};

export type NoteData = Record<string, number>;
// lap is how many loops into the script the note fell: a job that starts late
// in the loop runs on into the next, and its notes there still belong to it.
export type FlowNote = { start: number; lap: number; kind: string; data: NoteData };

export type FlowNode = {
  border: number[];
  label: number[];
  spinner?: number;
  bar?: number[];
  // A log's rows, top to bottom, each its cells left to right.
  rows?: number[][];
};

export type FlowEvent = { kind: "route" | "work"; id: string; start: number; dur: number };
export type LogEntry = { start: number; text: string };

export type Pad = { top: number; right: number; bottom: number; left: number };

// A layout, laid into cells. Its shape is its width over its height, padding
// and all, as drawn (a cell is twice as tall as it is wide). `ink` is the box
// its drawing actually covers, in its own cells, end exclusive.
export type FlowLayout = {
  cols: number;
  rows: number;
  pad: Pad;
  shape: number;
  ink: { x0: number; y0: number; x1: number; y1: number };
  glyphs: string[];
  kinds: Uint8Array;
  nodes: Record<string, FlowNode>;
  routes: Record<string, number[]>;
};

export type Flow = {
  layouts: FlowLayout[];
  events: FlowEvent[];
  // Each log's entries for one loop, in order.
  logs: Record<string, LogEntry[]>;
  // The notes for one loop, in order.
  notes: FlowNote[];
  period: number;
};

// Where a chart starts: a moment with work in flight across it. It is also
// the still frame shown under reduced motion.
export const startOf = (flow: Flow) => flow.period * 0.4;

const lines = (label: string | string[]) => (Array.isArray(label) ? label : [label]);

export const heightOf = (spec: NodeSpec) =>
  spec.log ? spec.log + 2 : lines(spec.label).length + (spec.worker ? 3 : 2);

function layOut<N extends string, R extends string>(spec: LayoutSpec<N, R>): FlowLayout {
  const g = createGrid(spec.cols, spec.rows);
  const nodeSpecs = Object.entries(spec.nodes) as [N, NodeSpec][];
  const routeSpecs = Object.entries(spec.routes) as [R, RouteSpec][];

  const nodes: Record<string, FlowNode> = {};
  for (const [id, n] of nodeSpecs) {
    const h = heightOf(n);
    const border = g.box(n.x, n.y, n.w, h);
    const node: FlowNode = { border, label: [] };
    const text = lines(n.label);

    if (n.log) {
      const title = ` ${text[0]} `;
      g.text(n.x + 2, n.y, title);
      node.label = [...title].map((_, i) => g.at(n.x + 2 + i, n.y));
      node.rows = Array.from({ length: n.log }, (_, r) =>
        Array.from({ length: n.w - 4 }, (_, i) => g.at(n.x + 2 + i, n.y + 1 + r)),
      );
    } else {
      text.forEach((line, l) => {
        g.text(n.x + 2, n.y + 1 + l, line, l === 0 ? Kind.text : Kind.note);
        node.label.push(...[...line].map((_, i) => g.at(n.x + 2 + i, n.y + 1 + l)));
      });
    }

    if (n.worker) {
      const sx = n.x + n.w - 3;
      g.text(sx, n.y + 1, "·");
      node.spinner = g.at(sx, n.y + 1);
      node.bar = [];
      const by = n.y + 1 + text.length;
      for (let x = n.x + 2; x < n.x + n.w - 2; x++) {
        g.text(x, by, "░", Kind.shade);
        node.bar.push(g.at(x, by));
      }
    }
    nodes[id] = node;
  }

  const routes: Record<string, number[]> = {};
  for (const [id, r] of routeSpecs) routes[id] = g.route(r.points, r.head ?? "solid");
  for (const [, r] of routeSpecs) {
    if (r.label) g.text(r.label.x, r.label.y, r.label.text);
  }

  const { plate } = spec;
  if (plate) {
    g.box(plate.x, plate.y, plate.w, plate.lines.length + 2, "double");
    plate.lines.forEach((line, l) => {
      g.text(plate.x + 3, plate.y + 1 + l, line, l === 0 ? Kind.strong : Kind.text);
    });
  }

  for (const note of spec.notes ?? []) {
    g.text(note.x, note.y, note.text, note.strong ? Kind.strong : Kind.text);
  }

  for (const [, n] of nodeSpecs) g.shadow(n.x, n.y, n.w, heightOf(n));
  if (plate) g.shadow(plate.x, plate.y, plate.w, plate.lines.length + 2);

  const glyphs = g.resolve();
  const ink = { x0: spec.cols, y0: spec.rows, x1: 0, y1: 0 };
  glyphs.forEach((glyph, i) => {
    if (!glyph || glyph === " ") return;
    const x = i % spec.cols;
    const y = Math.floor(i / spec.cols);
    ink.x0 = Math.min(ink.x0, x);
    ink.y0 = Math.min(ink.y0, y);
    ink.x1 = Math.max(ink.x1, x + 1);
    ink.y1 = Math.max(ink.y1, y + 1);
  });
  const pad = { top: 0, right: 0, bottom: 0, left: 0, ...spec.pad };

  return {
    cols: spec.cols,
    rows: spec.rows,
    pad,
    shape: (spec.cols + pad.left + pad.right) / ((spec.rows + pad.top + pad.bottom) * 2),
    ink,
    glyphs,
    kinds: g.kind,
    nodes,
    routes,
  };
}

export function buildFlow<N extends string, R extends string>(spec: ChartSpec<N, R>): Flow {
  const layouts = spec.layouts.map(layOut);
  // Packets take as long as they would in the reference layout.
  const { routes } = layouts[0];

  const events: FlowEvent[] = [];
  const logs: Record<string, LogEntry[]> = {};
  const notes: FlowNote[] = [];
  spec.script({
    go: (id, t) => {
      const dur = routes[id].length / SPEED;
      events.push({ kind: "route", id, start: t, dur });
      return t + dur;
    },
    work: (id, t, dur) => {
      events.push({ kind: "work", id, start: t, dur });
      return t + dur;
    },
    log: (id, t, text) => {
      (logs[id] ??= []).push({ start: t % spec.period, text });
    },
    note: (t, kind, data) => {
      notes.push({ start: t % spec.period, lap: Math.floor(t / spec.period), kind, data });
    },
  });
  for (const entries of Object.values(logs)) entries.sort((a, b) => a.start - b.start);
  notes.sort((a, b) => a.start - b.start);

  return { layouts, events, logs, notes, period: spec.period };
}

// A log entry in columns: what was done, to what, and the detail.
export const entry = (verb: string, target: string, detail: string) =>
  `#{n}  ${verb.padEnd(8)}${target.padEnd(16)}${detail}`;
