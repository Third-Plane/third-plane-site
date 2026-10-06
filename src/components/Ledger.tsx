import { homeHero, ledgerCopy } from "../data/content";
import { buildFlow, startOf } from "../scripts/flowchart/chart";
import { latest, phrase, type LedgerRow } from "../scripts/flowchart/feed";
import { placement } from "../scripts/flowchart/placement";

export const LEDGER_VISIBLE = 5;

const formatTime = (value: number) => new Date(value).toTimeString().slice(0, 5);

// The panel follows the placement flowchart behind it: each row is a moment
// the chart has just passed (see scripts/flowchart/feed.ts). The opening rows
// are the moments before the chart's starting point, worked out here from the
// same chart, so the first paint already agrees with it.
const flow = buildFlow(placement);
const opening = latest(flow, startOf(flow), LEDGER_VISIBLE)
  .map((note) => phrase(note, ledgerCopy))
  .filter((row): row is LedgerRow => row !== undefined);

// Static markup with the opening rows filled in. scripts/ledger.ts restamps
// them with the reader's clock, then adds a row each time the chart passes
// another moment, worded from the copy carried in `data-copy`.
export function Ledger() {
  const { label, sublabel, legend } = homeHero.ledger;
  const now = Date.now();
  const rows = opening.map((row, i) => ({
    ...row,
    time: formatTime(now - (opening.length - 1 - i) * 47_000),
  }));

  return (
    <figure
      className="pointer-events-auto m-0 rounded-2xl border border-border/50 bg-card px-6 pt-6 pb-5 shadow-2xl"
      data-ledger
      data-copy={JSON.stringify(ledgerCopy)}
      aria-label="Placement Desk activity: work received, worked across carrier channels, and returned to a person"
    >
      <div className="flex items-start justify-between gap-4 border-b border-b-border/50 pb-4">
        <div>
          <p className="font-heading text-lg font-medium tracking-tight text-foreground">{label}</p>
          <p className="mt-0.5 text-sm text-subtle-foreground">{sublabel}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-blue px-3 py-1.5 text-sm font-medium text-deep">
          <i
            className="relative size-1.5 rounded-full bg-purple motion-safe:after:absolute motion-safe:after:-inset-1 motion-safe:after:animate-ledger-pulse motion-safe:after:rounded-full motion-safe:after:border motion-safe:after:border-purple motion-safe:after:content-['']"
            aria-hidden="true"
          />
          Working
        </span>
      </div>
      <ol className="grid py-2" data-rows>
        {rows.map((row, i) => (
          <li
            className="group grid grid-cols-[auto_1fr_auto] items-start gap-3.5 border-b border-b-border/50 py-3 text-sm leading-snug last:border-b-0 motion-safe:animate-row-in"
            data-status={row.status}
            key={i}
          >
            <span className="text-sm text-subtle-foreground tabular-nums" data-time>
              {row.time}
            </span>
            <span className="line-clamp-1 text-foreground" data-task>
              {row.task}
            </span>
            <i
              className="mt-1.5 size-2 rounded-full bg-purple group-data-[status=review]:bg-pink group-data-[status=review]:inset-ring group-data-[status=review]:inset-ring-purple"
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>
      <ul className="flex flex-wrap gap-5 border-t border-t-border/50 pt-3.5 text-base text-subtle-foreground">
        {legend.map((item) => (
          <li
            className="group inline-flex items-center gap-2"
            data-status={item.status}
            key={item.status}
          >
            <i
              className="size-2 rounded-full bg-purple group-data-[status=review]:bg-pink group-data-[status=review]:inset-ring group-data-[status=review]:inset-ring-purple"
              aria-hidden="true"
            />
            {item.label}
          </li>
        ))}
      </ul>
    </figure>
  );
}
