// The two operating models on the home page, as diagrams in figures (see
// Diagram): 48 by 24 cells, square as drawn, since a cell is twice as tall as
// it is wide, and flat (no shadows), to read cleanly in the foreground. Both
// have work coming in at the top, whoever does it in the middle, the systems
// it goes out to along the foot and a log of the day underneath.
//
// Each keeps its own time. In the tool model the employee is in the middle
// with the AI tool beside them: every step passes through the employee, one
// job at a time, with drafts going back and forth, and the renewals that
// arrive meanwhile wait; one job takes the whole 24 second loop. In the Third
// Plane model the desk is in the middle on its own, with the AMS beside new
// business at the top, feeding it renewals and taking every result back; it
// finishes a job every 3 seconds, four in a 12 second loop.

import type { ChartSpec, NodeSpec, RouteSpec } from "./chart";
import { via } from "./grid";

// A log row: the entry's number, what was done and to what.
const line = (verb: string, detail: string) => `#{n}  ${verb.padEnd(9)}${detail}`;

// What both drawings share: new business at the top left, three systems
// along the foot, each fed by a branch down from a trunk on the middle's foot,
// and the log.
const newBusiness: NodeSpec = { x: 2, y: 0, w: 20, label: "NEW BUSINESS" };
const foot = (label: string, n: number): NodeSpec => ({ x: 2 + n * 16, y: 14, w: 12, label });
const branch = (trunk: number, n: number): RouteSpec => {
  const end = 7 + n * 16;
  return { points: via(trunk, 10, trunk, 12, end, 12, end, 13) };
};
// The words set over the branch to the last system, against its drop.
const over = (text: string) => ({ text: ` ${text} `, x: 39 - (text.length + 2), y: 12 });
const logOf = (label: string): NodeSpec => ({ x: 2, y: 18, w: 44, label, log: 3 });

const tool = {
  nodes: {
    newBusiness,
    renewals: { x: 26, y: 0, w: 20, label: "RENEWALS" },
    employee: { x: 2, y: 6, w: 20, label: ["EMPLOYEE", "OWNS THE WORK"], worker: true },
    tool: { x: 30, y: 6, w: 16, label: ["AI TOOL", "ASSISTANT"], worker: true },
    ams: foot("AMS", 0),
    portals: foot("PORTALS", 1),
    email: foot("EMAIL", 2),
    log: logOf("EMPLOYEE · TODAY"),
  },
  routes: {
    newBusiness: { points: via(8, 2, 8, 5) },
    renewals: { points: via(34, 2, 34, 4, 16, 4, 16, 5) },
    prompt: { points: via(21, 7, 29, 7) },
    draft: { points: via(30, 9, 22, 9) },
    toAms: branch(12, 0),
    toPortals: branch(12, 1),
    toEmail: { ...branch(12, 2), label: over("COPY · PASTE") },
  },
};

export const toolModel: ChartSpec<keyof typeof tool.nodes, keyof typeof tool.routes> = {
  layouts: [
    {
      cols: 48,
      rows: 24,
      shadows: false,
      ...tool,
      notes: [
        { x: 23, y: 6, text: "PROMPT" },
        { x: 23, y: 10, text: "DRAFT" },
      ],
    },
  ],
  period: 24,
  script: ({ go, work, log }) => {
    // One submission, start to finish. The employee reads it, has the tool
    // draft it, sends the draft back twice, then keys it into each system by
    // hand, one after another, two portals in turn, and chases the
    // underwriter.
    let t = go("newBusiness", work("newBusiness", 0, 0.4));
    log("log", t, line("PICK UP", "NEW BUSINESS · BOP"));
    t = work("employee", t, 1.2);
    for (const [draft, review, verb, detail] of [
      [1.2, 1.6, "REWORK", "DRAFT 1 · LIMITS WRONG"],
      [1.0, 1.4, "REWORK", "DRAFT 2 · NO LOSS RUNS"],
      [1.0, 1.2, "ACCEPT", "DRAFT 3"],
    ] as const) {
      log("log", t, line("PROMPT", "AI TOOL"));
      t = go("draft", work("tool", go("prompt", t), draft));
      t = work("employee", t, review);
      log("log", t, line(verb, detail));
    }
    for (const [system, route, verb, detail] of [
      ["ams", "toAms", "RE-KEY", "AMS · BY HAND"],
      ["portals", "toPortals", "UPLOAD", "PORTAL · MARKET A"],
      ["portals", "toPortals", "UPLOAD", "PORTAL · MARKET B"],
      ["email", "toEmail", "EMAIL", "UNDERWRITER · MARKET C"],
      ["email", "toEmail", "CHASE", "MARKET C · NO REPLY"],
    ] as const) {
      t = go(route, work("employee", t, 0.8));
      log("log", t, line(verb, detail));
      t = work(system, t, 0.7);
    }
    log("log", work("employee", t, 1.0), line("CLOSE", "NEW BUSINESS · BOP"));

    // Meanwhile renewals come in, and wait.
    for (const [at, detail] of [
      [5, "RENEWAL · PACKAGE"],
      [11.5, "RENEWAL · WORK COMP"],
      [18, "RENEWAL · UMBRELLA"],
    ] as const) {
      log("log", go("renewals", work("renewals", at, 0.4)), line("WAITING", detail));
    }
  },
};

// The desk sits centred, so new business and renewals drop straight into it
// and the carrier channels branch evenly out of it. The AMS is a loop:
// renewals come down from it and results go back up round the right.
const desk = {
  nodes: {
    newBusiness,
    ams: { x: 26, y: 0, w: 20, label: "AMS" },
    desk: { x: 13, y: 6, w: 20, label: ["PLACEMENT DESK", "AI WORKFORCE"], worker: true },
    portals: foot("PORTALS", 0),
    api: foot("API", 1),
    email: foot("EMAIL", 2),
    log: logOf("PLACEMENT DESK · TODAY"),
  },
  routes: {
    newBusiness: { points: via(17, 2, 17, 5) },
    renewals: { points: via(29, 2, 29, 5) },
    results: {
      points: via(32, 8, 43, 8, 43, 3),
      label: { text: " RESULTS ", x: 34, y: 8 },
    },
    toPortals: branch(23, 0),
    toApi: branch(23, 1),
    toEmail: branch(23, 2),
  },
};

// Each carrier channel and the branch down to it.
const CHANNELS = [
  ["portals", "toPortals"],
  ["api", "toApi"],
  ["email", "toEmail"],
] as const;

export const thirdPlaneModel: ChartSpec<keyof typeof desk.nodes, keyof typeof desk.routes> = {
  layouts: [
    {
      cols: 48,
      rows: 24,
      shadows: false,
      ...desk,
      notes: [{ x: 31, y: 3, text: "RENEWALS" }],
    },
  ],
  period: 12,
  script: ({ go, work, log }) => {
    // A job every three seconds, overlapping, from new business or a renewal
    // out of the AMS. The desk takes it, works every carrier channel at once
    // and returns the result to the AMS.
    const job = (start: number, source: "newBusiness" | "ams", name: string) => {
      let t = go(source === "ams" ? "renewals" : "newBusiness", work(source, start, 0.4));
      log("log", t, line("ASSIGNED", name));
      t = work("desk", t, 0.8);
      log("log", t, line("SUBMIT", "PORTALS · API · EMAIL"));
      t = Math.max(...CHANNELS.map(([channel, route]) => work(channel, go(route, t), 0.7)));
      t = go("results", work("desk", t, 0.6));
      log("log", t, line("RETURNED", "4 QUOTES · TO AMS"));
      work("ams", t, 0.5);
    };
    job(0, "newBusiness", "NEW BUSINESS · BOP");
    job(3, "ams", "RENEWAL · PACKAGE");
    job(6, "newBusiness", "NEW BUSINESS · AUTO");
    job(9, "ams", "RENEWAL · WORK COMP");
  },
};
