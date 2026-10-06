// The Integrations hero: the desk between the brokerage's own systems. It
// reads from the AMS, document stores and email where it is allowed to, works
// the placement, and writes back where results are expected: the AMS, the
// producer's inbox, the data lake and the carriers, whose quotes come back to
// the desk. Every read and every write lands in the access log.

import { entry, type ChartSpec, type RouteSpec } from "./chart";
import { via } from "./grid";

// The places results land fan out from scoped write.
const fan = (y: number): RouteSpec => ({
  points: via(120, 8, 126, 8, 126, y, 131, y),
  head: "hollow",
});

const nodes = {
  ams: { x: 2, y: 1, w: 28, label: ["AMS", "EPIC · AMS360 · SAGITTA"] },
  docs: { x: 2, y: 7, w: 28, label: ["DOCUMENTS", "IMAGERIGHT · SHAREPOINT"] },
  mail: { x: 2, y: 13, w: 28, label: ["EMAIL", "OUTLOOK · TEAMS"] },

  read: { x: 38, y: 6, w: 22, label: ["SCOPED READ", "WHERE YOU ALLOW"], worker: true },
  desk: { x: 68, y: 6, w: 22, label: ["PLACEMENT DESK", "AI WORKFORCE"], worker: true },
  write: { x: 98, y: 6, w: 22, label: ["SCOPED WRITE", "WHERE YOU EXPECT"], worker: true },

  amsOut: { x: 132, y: 0, w: 28, label: ["AMS", "ACTIVITIES · DOCUMENTS"] },
  inbox: { x: 132, y: 5, w: 28, label: ["PRODUCER INBOX", "RESULTS · WORK RECORD"] },
  data: { x: 132, y: 10, w: 28, label: ["DATA LAKE", "EVERY ACTION · OUTCOME"] },
  carriers: { x: 132, y: 15, w: 28, label: ["CARRIERS", "PORTAL · API · EMAIL"] },

  log: { x: 38, y: 24, w: 82, label: "ACCESS LOG", log: 5 },
};

const routes = {
  readAms: { points: via(30, 3, 33, 3, 33, 8, 37, 8) },
  readDocs: { points: via(30, 8, 37, 8) },
  readMail: { points: via(30, 14, 33, 14, 33, 8, 37, 8) },
  toDesk: { points: via(60, 8, 67, 8) },
  toWrite: { points: via(90, 8, 97, 8) },

  toAms: fan(2),
  toInbox: fan(7),
  toData: fan(12),
  toCarriers: fan(17),
  quotes: {
    points: via(146, 19, 146, 21, 79, 21, 79, 11),
    label: { text: " QUOTES · INDICATIONS ", x: 114, y: 21 },
  },

  readLog: { points: via(55, 11, 55, 23) },
  writeLog: { points: via(109, 11, 109, 23) },
};

type NodeId = keyof typeof nodes;
type RouteId = keyof typeof routes;

// Each source, the route it is read along and its log line.
const SOURCES = {
  ams: { route: "readAms", line: entry("READ", "AMS", "ACCOUNT · POLICY DATA") },
  docs: { route: "readDocs", line: entry("READ", "IMAGERIGHT", "LOSS RUNS · SCHEDULES") },
  mail: { route: "readMail", line: entry("READ", "OUTLOOK", "SUBMISSION · ACORD 125") },
} as const satisfies Partial<Record<NodeId, { route: RouteId; line: string }>>;

// Each place a result lands, the route there and its log line.
const TARGETS = {
  amsOut: { route: "toAms", line: entry("WRITE", "AMS", "ACTIVITY · DOCUMENTS") },
  inbox: { route: "toInbox", line: entry("SEND", "PRODUCER INBOX", "RESULTS · WORK RECORD") },
  data: { route: "toData", line: entry("EXPORT", "DATA LAKE", "ACTIONS · OUTCOMES") },
  carriers: {
    route: "toCarriers",
    line: entry("SUBMIT", "CARRIER PORTAL", "APPLICATION · 3 MKTS"),
  },
} as const satisfies Partial<Record<NodeId, { route: RouteId; line: string }>>;

type Source = keyof typeof SOURCES;
type Target = keyof typeof TARGETS;

// Four placements, a quarter of the loop apart, each read from its own
// sources and written to its own places. One goes to market and comes back
// with quotes, which are written on to the producer and the AMS.
const JOBS: { reads: Source[]; writes: Target[]; then?: Target[] }[] = [
  { reads: ["ams", "docs"], writes: ["amsOut", "data"] },
  { reads: ["mail"], writes: ["carriers"], then: ["inbox", "amsOut"] },
  { reads: ["ams", "mail"], writes: ["inbox", "data"] },
  { reads: ["docs"], writes: ["amsOut"] },
];

const SPACING = 6.5;

export const integrations: ChartSpec<NodeId, RouteId> = {
  cols: 172,
  rows: 32,
  nodes,
  routes,
  plate: { x: 2, y: 22, w: 30, lines: ["THIRD PLANE", "INTEGRATIONS", "READ · WRITE · RECORD"] },
  notes: [
    { x: 2, y: 19, text: "YOUR SYSTEMS, AS THEY ARE", strong: true },
    { x: 132, y: 23, text: "RESULTS WHERE YOU EXPECT", strong: true },
  ],
  period: SPACING * JOBS.length,
  script: ({ go, work, log }) => {
    // Write out to some places, each write logged as it goes.
    const write = (t: number, targets: Target[]) => {
      t = go("toWrite", t);
      t = work("write", t, 0.8);
      let end = t;
      targets.forEach((target, i) => {
        const at = t + i * 0.4;
        log("log", go("writeLog", at), TARGETS[target].line);
        end = Math.max(end, work(target, go(TARGETS[target].route, at), 0.8));
      });
      return end;
    };

    JOBS.forEach((job, k) => {
      let t = k * SPACING;
      let ready = t;
      job.reads.forEach((source, i) => {
        const read = work(source, t + i * 0.3, 0.5);
        ready = Math.max(ready, go(SOURCES[source].route, read));
      });
      t = work("read", ready, 0.9);
      job.reads.forEach((source, i) => {
        log("log", go("readLog", t + i * 0.4), SOURCES[source].line);
      });
      t = go("toDesk", t);
      t = work("desk", t, 1.4);
      t = write(t, job.writes);
      if (job.then) {
        t = work("carriers", t, 1.2);
        t = go("quotes", t);
        t = work("desk", t, 0.8);
        write(t, job.then);
      }
    });
  },
};
