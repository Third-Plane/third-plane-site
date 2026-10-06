// Placement Desk's AI workforce, for the home and Placement Desk heroes. Work
// comes in from the brokerage's sources, the desk structures it, checks for
// gaps and plans the markets, a crew of workers submits through each carrier
// channel, and the results run back along the foot of the chart to the
// producer (or to a person, when one needs to look).

import type { ChartSpec, RouteSpec } from "./chart";
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

export const placement: ChartSpec<NodeId, RouteId> = {
  cols: 172,
  rows: 32,
  nodes,
  routes,
  plate: { x: 2, y: 20, w: 30, lines: ["THIRD PLANE", "PLACEMENT DESK", "AI WORKFORCE   REV 1"] },
  notes: [
    { x: 118, y: 22, text: "WORKFORCE · 4 CHANNELS", strong: true },
    { x: 150, y: 22, text: "MARKETS" },
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
