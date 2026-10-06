// The Security hero: the desk working within defined authority. New work is
// checked against its scope (and the brokerage's own sign-on and roles) before
// the desk takes it; the desk acts on the brokerage's systems only through
// scoped access; work outside its authority, or that needs a call AI shouldn't
// make, goes to a named supervisor. Every action and every decision lands in
// the audit trail.

import { entry, type ChartSpec, type RouteSpec } from "./chart";
import { via } from "./grid";

// The systems the desk acts on fan out from scoped access.
const fan = (y: number): RouteSpec => ({
  points: via(122, 4, 126, 4, 126, y, 131, y),
  head: "hollow",
});

const nodes = {
  work: { x: 2, y: 3, w: 24, label: "NEW WORK" },
  sso: { x: 2, y: 9, w: 24, label: ["YOUR SSO", "ROLES · PERMISSIONS"] },

  authority: { x: 34, y: 2, w: 24, label: ["AUTHORITY", "SCOPE · LIMITS"], worker: true },
  desk: { x: 66, y: 2, w: 24, label: ["PLACEMENT DESK", "AI WORKFORCE"], worker: true },
  access: { x: 98, y: 2, w: 24, label: ["SCOPED ACCESS", "READ · WRITE"], worker: true },
  model: { x: 98, y: 11, w: 18, label: ["MODEL", "ANY · BY TASK"] },
  supervisor: {
    x: 66,
    y: 14,
    w: 24,
    label: ["SUPERVISOR", "NAMED · ACCOUNTABLE"],
    worker: true,
  },

  ams: { x: 132, y: 1, w: 22, label: "AMS" },
  portal: { x: 132, y: 5, w: 22, label: "CARRIER PORTAL" },
  api: { x: 132, y: 9, w: 22, label: "CARRIER API" },
  email: { x: 132, y: 13, w: 22, label: "UNDERWRITER EMAIL" },

  audit: { x: 98, y: 20, w: 60, label: "AUDIT TRAIL", log: 6 },
};

const routes = {
  work: { points: via(26, 4, 33, 4) },
  sso: { points: via(26, 10, 29, 10, 29, 4, 33, 4) },
  authorize: { points: via(58, 4, 65, 4) },
  act: { points: via(90, 4, 97, 4) },
  think: { points: via(90, 5, 93, 5, 93, 12, 97, 12) },

  toAms: fan(2),
  toPortal: fan(6),
  toApi: fan(10),
  toEmail: fan(14),

  escalate: { points: via(74, 7, 74, 13) },
  decide: { points: via(82, 13, 82, 7) },
  blocked: {
    points: via(46, 7, 46, 16, 65, 16),
    label: { text: " OUT OF SCOPE ", x: 49, y: 16 },
  },

  record: { points: via(119, 7, 119, 19) },
  supervised: { points: via(90, 17, 94, 17, 94, 23, 97, 23) },
};

type NodeId = keyof typeof nodes;
type RouteId = keyof typeof routes;

const SYSTEMS = {
  ams: "toAms",
  portal: "toPortal",
  api: "toApi",
  email: "toEmail",
} as const satisfies Partial<Record<NodeId, RouteId>>;

const SPACING = 8;

export const security: ChartSpec<NodeId, RouteId> = {
  cols: 172,
  rows: 32,
  nodes,
  routes,
  plate: { x: 2, y: 22, w: 30, lines: ["THIRD PLANE", "SECURITY", "DEFINED AUTHORITY"] },
  notes: [
    { x: 2, y: 15, text: "ISOLATED BY CUSTOMER" },
    { x: 65, y: 10, text: "ESCALATE" },
    { x: 84, y: 10, text: "DECISION" },
    { x: 132, y: 18, text: "YOUR SYSTEMS", strong: true },
  ],
  period: SPACING * 3,
  script: ({ go, work, log }) => {
    // Act on some of the systems, each action recorded as it goes out.
    const act = (t: number, actions: [keyof typeof SYSTEMS, string, string, string][]) => {
      t = go("act", t);
      t = work("access", t, 0.7);
      actions.forEach(([system, verb, target, detail], i) => {
        const at = t + i * 0.5;
        log("audit", go("record", at), entry(verb, target, detail));
        work(system, go(SYSTEMS[system], at), 0.9);
      });
    };
    // New work arrives, its sender's roles checked alongside, and authority
    // weighs it against the desk's scope.
    const arrive = (t: number, dur: number) => {
      t = Math.max(go("work", t), go("sso", t));
      return work("authority", t, dur);
    };

    // In scope: the desk works it, with a model, and acts.
    let t = arrive(0, 1.0);
    t = go("authorize", t);
    t = work("desk", t, 1.2);
    t = go("think", t);
    t = work("model", t, 0.8);
    act(t, [
      ["ams", "READ", "AMS", "ACCOUNT · LOSS RUNS"],
      ["portal", "SUBMIT", "CARRIER PORTAL", "APPLICATION · MARKET A"],
    ]);

    // A call for a person: the desk stops, the supervisor decides, and the
    // desk carries on with the decision.
    t = arrive(SPACING, 0.9);
    t = go("authorize", t);
    t = work("desk", t, 1.0);
    t = go("escalate", t);
    t = work("supervisor", t, 2.0);
    log("audit", go("supervised", t), entry("DECIDE", "SUPERVISOR", "APPROVED · MARKET LIST"));
    t = go("decide", t);
    t = work("desk", t, 0.8);
    act(t, [
      ["email", "SEND", "UNDERWRITER", "SUBMISSION · 3 MARKETS"],
      ["api", "REQUEST", "CARRIER API", "QUOTE · MARKET B"],
    ]);

    // Out of scope: authority stops it and returns it to the supervisor.
    t = arrive(SPACING * 2, 1.4);
    t = go("blocked", t);
    t = work("supervisor", t, 1.2);
    log("audit", go("supervised", t), entry("BLOCK", "AUTHORITY", "OUT OF SCOPE · RETURNED"));
  },
};
