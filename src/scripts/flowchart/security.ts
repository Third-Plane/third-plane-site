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

// Each system, the route out to it and the kind of note acting on it posts.
const SYSTEMS = {
  ams: { route: "toAms", kind: "read" },
  portal: { route: "toPortal", kind: "submitted" },
  api: { route: "toApi", kind: "requested" },
  email: { route: "toEmail", kind: "emailed" },
} as const satisfies Partial<Record<NodeId, { route: RouteId; kind: string }>>;

const SPACING = 8;
const JOBS = 3;

// The moments posted to the activity panel (see feed.ts and the ledger events
// in security.json), as job:kind: seven a loop, chosen to fall two and a half
// to five seconds apart, which a five-row panel can keep up with. "cleared"
// posts as authority passes the work, "read" as the desk reads the AMS,
// "escalated" as the desk stops for a person, "approved" as the supervisor
// decides, "emailed" as the decision goes to an underwriter, "blocked" as
// authority stops work out of scope and "recorded" as that lands in the trail.
const POSTS = new Set([
  "0:cleared",
  "0:read",
  "1:escalated",
  "1:approved",
  "1:emailed",
  "2:blocked",
  "2:recorded",
]);

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
  period: SPACING * JOBS,
  script: ({ go, work, log, note }) => {
    const post = (job: number, t: number, kind: string, slot = 0) => {
      if (POSTS.has(`${job}:${kind}`)) note(t, kind, { job, jobs: JOBS, slot });
    };
    // Act on some of the systems, each action recorded as it goes out.
    const act = (
      job: number,
      t: number,
      actions: [keyof typeof SYSTEMS, string, string, string][],
    ) => {
      t = go("act", t);
      t = work("access", t, 0.7);
      actions.forEach(([system, verb, target, detail], i) => {
        const at = t + i * 0.5;
        log("audit", go("record", at), entry(verb, target, detail));
        const { route, kind } = SYSTEMS[system];
        const reached = go(route, at);
        post(job, reached, kind, i);
        work(system, reached, 0.9);
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
    post(0, t, "cleared");
    t = go("authorize", t);
    t = work("desk", t, 1.2);
    t = go("think", t);
    t = work("model", t, 0.8);
    act(0, t, [
      ["ams", "READ", "AMS", "ACCOUNT · LOSS RUNS"],
      ["portal", "SUBMIT", "CARRIER PORTAL", "APPLICATION · MARKET A"],
    ]);

    // A call for a person: the desk stops, the supervisor decides, and the
    // desk carries on with the decision.
    t = arrive(SPACING, 0.9);
    post(1, t, "cleared");
    t = go("authorize", t);
    t = work("desk", t, 1.0);
    post(1, t, "escalated");
    t = go("escalate", t);
    t = work("supervisor", t, 2.0);
    post(1, t, "approved");
    log("audit", go("supervised", t), entry("DECIDE", "SUPERVISOR", "APPROVED · MARKET LIST"));
    t = go("decide", t);
    t = work("desk", t, 0.8);
    act(1, t, [
      ["email", "SEND", "UNDERWRITER", "SUBMISSION · 3 MARKETS"],
      ["api", "REQUEST", "CARRIER API", "QUOTE · MARKET B"],
    ]);

    // Out of scope: authority stops it and returns it to the supervisor, a
    // second later than the spacing so the loop's last moments spread out.
    t = arrive(SPACING * 2 + 1, 1.4);
    post(2, t, "blocked");
    t = go("blocked", t);
    t = work("supervisor", t, 1.2);
    t = go("supervised", t);
    log("audit", t, entry("BLOCK", "AUTHORITY", "OUT OF SCOPE · RETURNED"));
    post(2, t, "recorded");
  },
};
