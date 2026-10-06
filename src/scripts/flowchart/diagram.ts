// The hero flowchart: Placement Desk's AI workforce as a printed systems
// diagram. Work comes in from the brokerage's sources, the desk structures it,
// checks for gaps and plans the markets, a crew of workers submits through
// each carrier channel, and the results run back along the foot of the chart
// to the producer (or to a person, when one needs to look).
//
// Everything is placed in character cells (see grid.ts). The jobs at the end
// script the animation: packets that travel the routes and the work each node
// does when one arrives. They repeat every PERIOD seconds, so the loop is
// seamless.

import { Kind, createGrid, via, type Head, type Point } from "./grid";

export const COLS = 172;
export const ROWS = 32;

// Cells a packet covers a second.
export const SPEED = 28;

type NodeSpec = {
  x: number;
  y: number;
  w: number;
  label: string;
  // A worker shows a spinner and a progress bar while it works; a plain node
  // is a single labelled row.
  worker?: boolean;
};

const NODES = {
  submission: { x: 2, y: 3, w: 14, label: "SUBMISSION" },
  ams: { x: 2, y: 7, w: 14, label: "AMS" },
  inbox: { x: 2, y: 11, w: 14, label: "INBOX" },

  intake: { x: 24, y: 6, w: 17, label: "INTAKE", worker: true },
  gaps: { x: 47, y: 6, w: 17, label: "CHECK GAPS", worker: true },
  appetite: { x: 70, y: 6, w: 17, label: "APPETITE", worker: true },
  plan: { x: 93, y: 6, w: 17, label: "MARKET PLAN", worker: true },

  portal: { x: 118, y: 1, w: 20, label: "PORTAL WORKER", worker: true },
  api: { x: 118, y: 6, w: 20, label: "API WORKER", worker: true },
  email: { x: 118, y: 11, w: 20, label: "EMAIL WORKER", worker: true },
  forms: { x: 118, y: 16, w: 20, label: "FORMS WORKER", worker: true },

  carrierA: { x: 150, y: 2, w: 15, label: "CARRIER A" },
  carrierB: { x: 150, y: 7, w: 15, label: "CARRIER B" },
  mga: { x: 150, y: 12, w: 15, label: "MGA" },
  underwriter: { x: 150, y: 17, w: 15, label: "UNDERWRITER" },

  collect: { x: 93, y: 26, w: 17, label: "COLLECT", worker: true },
  review: { x: 70, y: 19, w: 17, label: "REVIEW", worker: true },
  ret: { x: 47, y: 26, w: 17, label: "RETURN", worker: true },
  producer: { x: 22, y: 27, w: 16, label: "PRODUCER" },
} satisfies Record<string, NodeSpec>;

export type NodeId = keyof typeof NODES;

type RouteSpec = {
  points: Point[];
  head?: Head;
  label?: { text: string; x: number; y: number };
};

// The channel workers fan out from the market plan along one bus.
const fan = (y: number): RouteSpec => ({
  points: via(110, 8, 113, 8, 113, y, 117, y),
  head: "hollow",
});
// Each carrier answers onto the return bus down the right edge.
const answer = (y: number): RouteSpec => ({
  points: via(165, y, 168, y, 168, 28, 110, 28),
});

const ROUTES = {
  submission: { points: via(16, 4, 19, 4, 19, 8, 23, 8) },
  ams: { points: via(16, 8, 23, 8) },
  inbox: { points: via(16, 12, 19, 12, 19, 8, 23, 8) },
  intake: { points: via(41, 8, 46, 8) },
  missing: {
    points: via(55, 10, 55, 15, 9, 15, 9, 14),
    label: { text: " MISSING INFO ", x: 28, y: 15 },
  },
  appetite: { points: via(64, 8, 69, 8) },
  plan: { points: via(87, 8, 92, 8) },

  toPortal: fan(3),
  toApi: fan(8),
  toEmail: fan(13),
  toForms: fan(18),

  portal: { points: via(138, 3, 149, 3), label: { text: " PORTAL ", x: 139, y: 3 } },
  api: { points: via(138, 8, 149, 8), label: { text: " API ", x: 141, y: 8 } },
  email: { points: via(138, 13, 149, 13), label: { text: " EMAIL ", x: 140, y: 13 } },
  forms: { points: via(138, 18, 149, 18), label: { text: " FORMS ", x: 140, y: 18 } },

  fromCarrierA: answer(3),
  fromCarrierB: answer(8),
  fromMga: answer(13),
  fromUnderwriter: {
    ...answer(18),
    label: { text: " QUOTES · INDICATIONS · DECLINATIONS ", x: 120, y: 28 },
  },

  toReview: { points: via(101, 25, 101, 21, 87, 21) },
  fromReview: { points: via(78, 23, 78, 28, 64, 28) },
  ret: { points: via(92, 28, 64, 28) },
  producer: { points: via(46, 28, 38, 28) },
} satisfies Record<string, RouteSpec>;

export type RouteId = keyof typeof ROUTES;

// A plate in the corner, as on a drawing.
const PLATE = { x: 2, y: 20, w: 30, h: 5 };

export type FlowNode = {
  border: number[];
  label: number[];
  spinner?: number;
  bar?: number[];
};

export type Flow = {
  glyphs: string[];
  kinds: Uint8Array;
  nodes: Record<NodeId, FlowNode>;
  routes: Record<RouteId, number[]>;
  events: FlowEvent[];
  period: number;
};

export type FlowEvent = { kind: "route" | "work"; id: string; start: number; dur: number };

export function buildFlow(): Flow {
  const g = createGrid(COLS, ROWS);

  const nodes = {} as Record<NodeId, FlowNode>;
  for (const [id, spec] of Object.entries(NODES) as [NodeId, NodeSpec][]) {
    const h = spec.worker ? 4 : 3;
    const border = g.box(spec.x, spec.y, spec.w, h);
    g.text(spec.x + 2, spec.y + 1, spec.label);
    const label = [...spec.label].map((_, i) => g.at(spec.x + 2 + i, spec.y + 1));
    const node: FlowNode = { border, label };
    if (spec.worker) {
      const sx = spec.x + spec.w - 3;
      g.text(sx, spec.y + 1, "·");
      node.spinner = g.at(sx, spec.y + 1);
      node.bar = [];
      for (let x = spec.x + 2; x < spec.x + spec.w - 2; x++) {
        g.text(x, spec.y + 2, "░", Kind.shade);
        node.bar.push(g.at(x, spec.y + 2));
      }
    }
    nodes[id] = node;
  }

  const routes = {} as Record<RouteId, number[]>;
  for (const [id, spec] of Object.entries(ROUTES) as [RouteId, RouteSpec][]) {
    routes[id] = g.route(spec.points, spec.head ?? "solid");
  }
  for (const spec of Object.values(ROUTES) as RouteSpec[]) {
    if (spec.label) g.text(spec.label.x, spec.label.y, spec.label.text);
  }

  g.box(PLATE.x, PLATE.y, PLATE.w, PLATE.h, "double");
  g.text(PLATE.x + 3, PLATE.y + 1, "THIRD PLANE", Kind.strong);
  g.text(PLATE.x + 3, PLATE.y + 2, "PLACEMENT DESK");
  g.text(PLATE.x + 3, PLATE.y + 3, "AI WORKFORCE   REV 1");

  g.text(118, 22, "WORKFORCE · 4 CHANNELS", Kind.strong);
  g.text(150, 22, "MARKETS");

  for (const spec of Object.values(NODES) as NodeSpec[]) {
    g.shadow(spec.x, spec.y, spec.w, spec.worker ? 4 : 3);
  }
  g.shadow(PLATE.x, PLATE.y, PLATE.w, PLATE.h);

  const { events, period } = schedule((id) => routes[id].length);
  return { glyphs: g.resolve(), kinds: g.kind, nodes, routes, events, period };
}

// The jobs. Four placements run through the desk, a quarter of the loop apart,
// each from its own source and out to its own set of channels. One comes back
// for missing information first; one is returned to a person for review.
const JOBS: {
  source: "submission" | "ams" | "inbox";
  channels: Channel[];
  missing?: boolean;
  review?: boolean;
}[] = [
  { source: "submission", channels: ["portal", "api", "forms"] },
  { source: "ams", channels: ["api", "email"], review: true },
  { source: "inbox", channels: ["portal", "email", "forms"], missing: true },
  { source: "submission", channels: ["portal", "api", "email", "forms"] },
];

type Channel = "portal" | "api" | "email" | "forms";

const CHANNELS = {
  portal: { dispatch: "toPortal", carrier: "carrierA", answer: "fromCarrierA" },
  api: { dispatch: "toApi", carrier: "carrierB", answer: "fromCarrierB" },
  email: { dispatch: "toEmail", carrier: "mga", answer: "fromMga" },
  forms: { dispatch: "toForms", carrier: "underwriter", answer: "fromUnderwriter" },
} as const satisfies Record<Channel, { dispatch: RouteId; carrier: NodeId; answer: RouteId }>;

const SPACING = 6.5;
export const PERIOD = SPACING * JOBS.length;

function schedule(length: (id: RouteId) => number) {
  const events: FlowEvent[] = [];
  const go = (id: RouteId, t: number) => {
    const dur = length(id) / SPEED;
    events.push({ kind: "route", id, start: t, dur });
    return t + dur;
  };
  const work = (id: NodeId, t: number, dur: number) => {
    events.push({ kind: "work", id, start: t, dur });
    return t + dur;
  };

  JOBS.forEach((job, k) => {
    // Small, fixed differences between jobs, so they don't march in step.
    const vary = (n: number) => 0.85 + ((k * 7 + n * 13) % 10) / 20;
    let t = k * SPACING;
    t = go(job.source, t);
    t = work("intake", t, 1.2 * vary(1));
    t = go("intake", t);
    t = work("gaps", t, 0.9 * vary(2));
    if (job.missing) {
      t = go("missing", t);
      t = work("inbox", t, 0.6);
      t = go("inbox", t);
      t = work("intake", t, 0.8);
      t = go("intake", t);
      t = work("gaps", t, 0.6);
    }
    t = go("appetite", t);
    t = work("appetite", t, 1.1 * vary(3));
    t = go("plan", t);
    t = work("plan", t, 1.2 * vary(4));

    let back = t;
    job.channels.forEach((channel, c) => {
      const { dispatch, carrier, answer } = CHANNELS[channel];
      let u = go(dispatch, t + c * 0.25);
      u = work(channel, u, 1.4 * vary(5 + c));
      u = go(channel, u);
      u = work(carrier, u, 1.3 * vary(9 + c));
      u = go(answer, u);
      back = Math.max(back, u);
    });

    t = work("collect", back, 0.9);
    if (job.review) {
      t = go("toReview", t);
      t = work("review", t, 1.6);
      t = go("fromReview", t);
    } else {
      t = go("ret", t);
    }
    t = work("ret", t, 0.8);
    t = go("producer", t);
    work("producer", t, 0.8);
  });

  return { events, period: PERIOD };
}
