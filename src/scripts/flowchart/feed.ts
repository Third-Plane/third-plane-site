// A chart's notes, as the page sees them: which ones fall in a stretch of the
// chart's running time, and the activity panel's line for each. Pure, so the
// panel's first rows can be worked out at build time (Ledger.tsx) and the rest
// as the chart runs (scripts/ledger.ts), from the same notes.
//
// Time here is the chart's own clock, in seconds, which runs on across loops.
// A note is told with the loop its job started in, so each pass through the
// chart can be a different account, and a job keeps its account across the
// loop's seam.

import type { Flow, NoteData } from "./chart";

export type Note = { kind: string; data: NoteData; loop: number; at: number };

// The notes after `from` up to and including `to`.
export function crossed(flow: Flow, from: number, to: number): Note[] {
  const out: Note[] = [];
  const { notes, period } = flow;
  for (let loop = Math.floor(from / period); loop * period <= to; loop++) {
    for (const n of notes) {
      const at = loop * period + n.start;
      if (at > from && at <= to) out.push({ kind: n.kind, data: n.data, loop: loop - n.lap, at });
    }
  }
  return out;
}

// The last `count` notes up to `t`, oldest first.
export function latest(flow: Flow, t: number, count: number): Note[] {
  if (!flow.notes.length) return [];
  const loops = Math.ceil(count / flow.notes.length) + 1;
  return crossed(flow, t - loops * flow.period, t).slice(-count);
}

// The panel's copy (home.json, ledger): a line and its status for each kind of
// note, and the accounts and carriers its {account}, {line} and {carrier}
// slots are filled from.
export type LedgerCopy = {
  accounts: { name: string; line: string }[];
  carriers: string[];
  events: Record<string, { task: string; status: string }>;
};

export type LedgerRow = { task: string; status: string };

// An index into a list of `n`, for any whole number (loops before the first
// are negative).
const wrap = (i: number, n: number) => ((i % n) + n) % n;

// A note's line. The job's running number across loops picks the account, so
// the same job is a new account each time round. The carrier steps on one
// place a loop (and three a job, plus data.slot among a job's own), so every
// carrier comes round whatever the number of jobs. data.count fills {count}.
export function phrase(note: Note, copy: LedgerCopy): LedgerRow | undefined {
  const event = copy.events[note.kind];
  if (!event) return undefined;
  const { job = 0, jobs = 1, slot = 0, count = 0 } = note.data;
  const account = copy.accounts[wrap(note.loop * jobs + job, copy.accounts.length)];
  const carrier = copy.carriers[wrap(note.loop * 7 + job * 3 + slot, copy.carriers.length)];
  const task = event.task
    .replaceAll("{account}", account?.name ?? "")
    .replaceAll("{line}", account?.line ?? "")
    .replaceAll("{carrier}", carrier ?? "")
    .replaceAll("{count}", String(count));
  return { task, status: event.status };
}
