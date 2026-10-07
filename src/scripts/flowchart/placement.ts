// Placement Desk's AI workforce, for the home and Placement Desk heroes. Work
// comes in from the brokerage's sources, the desk structures it, checks for
// gaps and plans the markets, a crew of workers submits through each carrier
// channel, and the results run back along the foot of the chart to the
// producer (or to a person, when one needs to look).

import type { ChartSpec, LayoutSpec, RouteSpec } from "./chart";
import { via } from "./grid";

// The channel workers fan out from the market plan along one bus.
const fan = (y: number): RouteSpec => ({
  points: via(110, 8, 113, 8, 113, y, 117, y),
  head: "hollow",
});
// Each carrier answers onto the return bus down the right edge.
const answer = (y: number): RouteSpec => ({
  points: via(165, y, 168, y, 168, 28, 110, 28),
});

const nodes = {
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
};

const routes = {
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
};

type NodeId = keyof typeof nodes;
type RouteId = keyof typeof routes;
type Channel = "portal" | "api" | "email" | "forms";

const CHANNELS = {
  portal: { dispatch: "toPortal", carrier: "carrierA", answer: "fromCarrierA" },
  api: { dispatch: "toApi", carrier: "carrierB", answer: "fromCarrierB" },
  email: { dispatch: "toEmail", carrier: "mga", answer: "fromMga" },
  forms: { dispatch: "toForms", carrier: "underwriter", answer: "fromUnderwriter" },
} as const satisfies Record<Channel, { dispatch: RouteId; carrier: NodeId; answer: RouteId }>;

// Four placements run through the desk, a quarter of the loop apart, each from
// its own source and out to its own set of channels. One comes back for
// missing information first; one is returned to a person for review.
//
// Each posts some of its moments to the activity panel (`notes`, by kind; see
// feed.ts and the ledger events in home.json): eight a loop, chosen to fall
// two and a half to five seconds apart, which a five-row panel can keep up
// with. The third job's four tell one placement from end to end. "received" posts as the work
// reaches intake, "missing" as it is sent back, "markets" once the plan is
// made, "quote" as the first answer reaches collect, "review" as a person
// takes it and "returned" as the results reach the producer.
const JOBS: {
  source: "submission" | "ams" | "inbox";
  channels: Channel[];
  missing?: boolean;
  review?: boolean;
  notes: string[];
}[] = [
  { source: "submission", channels: ["portal", "api", "forms"], notes: ["received"] },
  { source: "ams", channels: ["api", "email"], review: true, notes: ["renewal", "review"] },
  {
    source: "inbox",
    channels: ["portal", "email", "forms"],
    missing: true,
    notes: ["received", "missing", "markets", "quote"],
  },
  {
    source: "submission",
    channels: ["portal", "api", "email", "forms"],
    notes: ["returned"],
  },
];

const SPACING = 6.5;

// The landscape layout, for windows about 1.67:1 (most desktops, laptops and
// landscape tablets). The desk's steps run along the top, the four workers
// fan out below them in a row, each over its market, and the results come
// back along the foot to the left, where collect, review, return and the
// producer stand. It is drawn within columns 12 to 142, which stay on screen
// from 1.44:1 (where the sides are cropped) to where the wide layout takes over.
const landscape: LayoutSpec<NodeId, RouteId> = {
  cols: 154,
  rows: 46,
  nodes: {
    submission: { x: 12, y: 5, w: 14, label: "SUBMISSION" },
    ams: { x: 12, y: 9, w: 14, label: "AMS" },
    inbox: { x: 12, y: 13, w: 14, label: "INBOX" },

    intake: { x: 32, y: 8, w: 17, label: "INTAKE", worker: true },
    gaps: { x: 54, y: 8, w: 17, label: "CHECK GAPS", worker: true },
    appetite: { x: 76, y: 8, w: 17, label: "APPETITE", worker: true },
    plan: { x: 98, y: 8, w: 17, label: "MARKET PLAN", worker: true },

    portal: { x: 54, y: 21, w: 20, label: "PORTAL WORKER", worker: true },
    api: { x: 77, y: 21, w: 20, label: "API WORKER", worker: true },
    email: { x: 100, y: 21, w: 20, label: "EMAIL WORKER", worker: true },
    forms: { x: 123, y: 21, w: 20, label: "FORMS WORKER", worker: true },

    carrierA: { x: 56, y: 29, w: 16, label: "CARRIER A" },
    carrierB: { x: 79, y: 29, w: 16, label: "CARRIER B" },
    mga: { x: 102, y: 29, w: 16, label: "MGA" },
    underwriter: { x: 125, y: 29, w: 16, label: "UNDERWRITER" },

    review: { x: 12, y: 25, w: 17, label: "REVIEW", worker: true },
    collect: { x: 36, y: 33, w: 17, label: "COLLECT", worker: true },
    ret: { x: 12, y: 33, w: 17, label: "RETURN", worker: true },
    producer: { x: 12, y: 39, w: 16, label: "PRODUCER" },
  },
  routes: {
    submission: { points: via(26, 6, 28, 6, 28, 10, 31, 10) },
    ams: { points: via(26, 10, 31, 10) },
    inbox: { points: via(26, 14, 28, 14, 28, 10, 31, 10) },
    intake: { points: via(49, 10, 53, 10) },
    missing: {
      points: via(62, 12, 62, 17, 18, 17, 18, 16),
      label: { text: " MISSING INFO ", x: 32, y: 17 },
    },
    appetite: { points: via(71, 10, 75, 10) },
    plan: { points: via(93, 10, 97, 10) },

    toPortal: { points: via(106, 12, 106, 18, 64, 18, 64, 20), head: "hollow" },
    toApi: { points: via(106, 12, 106, 18, 87, 18, 87, 20), head: "hollow" },
    toEmail: { points: via(106, 12, 106, 18, 110, 18, 110, 20), head: "hollow" },
    toForms: { points: via(106, 12, 106, 18, 133, 18, 133, 20), head: "hollow" },

    portal: { points: via(64, 25, 64, 28) },
    api: { points: via(87, 25, 87, 28) },
    email: { points: via(110, 25, 110, 28) },
    forms: { points: via(133, 25, 133, 28) },

    fromCarrierA: { points: via(64, 32, 64, 35, 53, 35) },
    fromCarrierB: { points: via(87, 32, 87, 35, 53, 35) },
    fromMga: { points: via(110, 32, 110, 35, 53, 35) },
    fromUnderwriter: { points: via(133, 32, 133, 35, 53, 35) },

    toReview: { points: via(44, 32, 44, 27, 29, 27) },
    fromReview: { points: via(20, 29, 20, 32) },
    ret: { points: via(35, 35, 29, 35) },
    producer: { points: via(20, 37, 20, 38) },
  },
  plate: {
    x: 112,
    y: 37,
    w: 30,
    lines: ["THIRD PLANE", "PLACEMENT DESK", "AI WORKFORCE   REV 1"],
  },
  notes: [
    { x: 118, y: 10, text: "WORKFORCE · 4 CHANNELS", strong: true },
    { x: 66, y: 26, text: "PORTAL" },
    { x: 89, y: 26, text: "API" },
    { x: 112, y: 26, text: "EMAIL" },
    { x: 135, y: 26, text: "FORMS" },
    { x: 46, y: 30, text: "MARKETS" },
    { x: 66, y: 37, text: "QUOTES · INDICATIONS · DECLINATIONS" },
  ],
};

// The portrait layout, for windows about 0.46:1 (phones). The desk's steps
// snake down in two columns, the workers stand in a column each beside its
// market, and the results come up the right edge and back across the foot.
// No plate: there isn't the room. It keeps a cell or two clear of the sides,
// which the lens's curve crops a little on a tall screen.
const portrait: LayoutSpec<NodeId, RouteId> = {
  cols: 52,
  rows: 56,
  nodes: {
    submission: { x: 4, y: 6, w: 14, label: "SUBMISSION" },
    ams: { x: 20, y: 6, w: 9, label: "AMS" },
    inbox: { x: 34, y: 6, w: 11, label: "INBOX" },

    intake: { x: 5, y: 12, w: 19, label: "INTAKE", worker: true },
    gaps: { x: 28, y: 12, w: 20, label: "CHECK GAPS", worker: true },
    appetite: { x: 28, y: 18, w: 20, label: "APPETITE", worker: true },
    plan: { x: 5, y: 18, w: 19, label: "MARKET PLAN", worker: true },

    portal: { x: 5, y: 24, w: 19, label: "PORTAL WORKER", worker: true },
    api: { x: 5, y: 29, w: 19, label: "API WORKER", worker: true },
    email: { x: 5, y: 34, w: 19, label: "EMAIL WORKER", worker: true },
    forms: { x: 5, y: 39, w: 19, label: "FORMS WORKER", worker: true },

    carrierA: { x: 30, y: 25, w: 16, label: "CARRIER A" },
    carrierB: { x: 30, y: 30, w: 16, label: "CARRIER B" },
    mga: { x: 30, y: 35, w: 16, label: "MGA" },
    underwriter: { x: 30, y: 40, w: 16, label: "UNDERWRITER" },

    ret: { x: 4, y: 45, w: 18, label: "RETURN", worker: true },
    collect: { x: 26, y: 45, w: 18, label: "COLLECT", worker: true },
    producer: { x: 4, y: 51, w: 16, label: "PRODUCER" },
    review: { x: 26, y: 51, w: 18, label: "REVIEW", worker: true },
  },
  routes: {
    submission: { points: via(10, 9, 10, 10, 13, 10, 13, 11) },
    ams: { points: via(24, 9, 24, 10, 13, 10, 13, 11) },
    inbox: { points: via(38, 9, 38, 10, 13, 10, 13, 11) },
    intake: { points: via(24, 14, 27, 14) },
    missing: { points: via(40, 11, 40, 9) },
    appetite: { points: via(38, 16, 38, 17) },
    plan: { points: via(27, 20, 24, 20) },

    toPortal: { points: via(4, 20, 3, 20, 3, 26, 4, 26), head: "hollow" },
    toApi: { points: via(4, 20, 3, 20, 3, 31, 4, 31), head: "hollow" },
    toEmail: { points: via(4, 20, 3, 20, 3, 36, 4, 36), head: "hollow" },
    toForms: { points: via(4, 20, 3, 20, 3, 41, 4, 41), head: "hollow" },

    portal: { points: via(24, 26, 29, 26) },
    api: { points: via(24, 31, 29, 31) },
    email: { points: via(24, 36, 29, 36) },
    forms: { points: via(24, 41, 29, 41) },

    fromCarrierA: { points: via(46, 26, 48, 26, 48, 47, 44, 47) },
    fromCarrierB: { points: via(46, 31, 48, 31, 48, 47, 44, 47) },
    fromMga: { points: via(46, 36, 48, 36, 48, 47, 44, 47) },
    fromUnderwriter: { points: via(46, 41, 48, 41, 48, 47, 44, 47) },

    ret: { points: via(25, 47, 22, 47) },
    toReview: { points: via(34, 49, 34, 50) },
    fromReview: { points: via(25, 52, 24, 52, 24, 47, 22, 47) },
    producer: { points: via(12, 49, 12, 50) },
  },
  notes: [
    { x: 42, y: 10, text: "MISSING" },
    { x: 5, y: 23, text: "WORKFORCE", strong: true },
    { x: 31, y: 23, text: "MARKETS" },
  ],
};

export const placement: ChartSpec<NodeId, RouteId> = {
  // The wide layout, for windows about 2.3:1, is the reference. Drawn edge to
  // edge, it is padded above (for the nav) and below.
  layouts: [
    {
      cols: 172,
      rows: 32,
      pad: { top: 4, bottom: 1 },
      nodes,
      routes,
      plate: {
        x: 2,
        y: 20,
        w: 30,
        lines: ["THIRD PLANE", "PLACEMENT DESK", "AI WORKFORCE   REV 1"],
      },
      notes: [
        { x: 118, y: 22, text: "WORKFORCE · 4 CHANNELS", strong: true },
        { x: 150, y: 22, text: "MARKETS" },
      ],
    },
    landscape,
    portrait,
  ],
  period: SPACING * JOBS.length,
  script: ({ go, work, note }) => {
    JOBS.forEach((job, k) => {
      // Small, fixed differences between jobs, so they don't march in step.
      const vary = (n: number) => 0.85 + ((k * 7 + n * 13) % 10) / 20;
      // Post a moment, if it is one of this job's.
      const post = (t: number, kind: string, data: Record<string, number> = {}) => {
        if (job.notes.includes(kind)) note(t, kind, { job: k, jobs: JOBS.length, ...data });
      };
      const count = job.channels.length;
      let t = k * SPACING;
      t = go(job.source, t);
      post(t, "received");
      post(t, "renewal");
      t = work("intake", t, 1.2 * vary(1));
      t = go("intake", t);
      t = work("gaps", t, 0.9 * vary(2));
      if (job.missing) {
        post(t, "missing");
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
      post(t, "markets", { count });

      let back = t;
      let first = Infinity;
      job.channels.forEach((channel, c) => {
        const { dispatch, carrier, answer } = CHANNELS[channel];
        let u = go(dispatch, t + c * 0.25);
        u = work(channel, u, 1.4 * vary(5 + c));
        u = go(channel, u);
        u = work(carrier, u, 1.3 * vary(9 + c));
        u = go(answer, u);
        back = Math.max(back, u);
        first = Math.min(first, u);
      });
      post(first, "quote", { slot: 0 });

      t = work("collect", back, 0.9);
      if (job.review) {
        t = go("toReview", t);
        post(t, "review");
        t = work("review", t, 1.6);
        t = go("fromReview", t);
      } else {
        t = go("ret", t);
      }
      t = work("ret", t, 0.8);
      t = go("producer", t);
      post(t, "returned", { count: count - 1 });
      work("producer", t, 0.8);
    });
  },
};
