import { homeHero, ledgerTasks } from "../data/content";

export const LEDGER_VISIBLE = 5;

const formatTime = (value: number) => new Date(value).toTimeString().slice(0, 5);

// Static markup with the first rows filled in. scripts/ledger.ts restamps
// them with the reader's clock and then keeps the list moving, using the
// tasks carried in `data-tasks`.
export function Ledger() {
  const { label, sublabel, legend } = homeHero.ledger;
  const tasks = ledgerTasks;
  const now = Date.now();
  const rows = tasks.slice(0, LEDGER_VISIBLE).map((task, i) => ({
    ...task,
    time: formatTime(now - (LEDGER_VISIBLE - 1 - i) * 47_000),
  }));

  return (
    <figure
      className="pointer-events-auto m-0 rounded-2xl border border-border/50 bg-card px-6 pt-6 pb-5 shadow-2xl"
      data-ledger
      data-tasks={JSON.stringify(tasks)}
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
        {rows.map((row) => (
          <li
            className="group grid grid-cols-[auto_1fr_auto] items-start gap-3.5 border-b border-b-border/50 py-3 text-sm leading-snug last:border-b-0 motion-safe:animate-row-in"
            data-status={row.status}
            key={row.task}
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
