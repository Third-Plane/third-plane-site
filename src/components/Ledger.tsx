import { homeHero, ledgerTasks } from "../data/content";

export const LEDGER_VISIBLE = 5;

const formatTime = (value: number) => new Date(value).toTimeString().slice(0, 5);

type LedgerTask = (typeof ledgerTasks)[number];

type Props = {
  label?: string;
  sublabel?: string;
  legend?: (typeof homeHero.ledger.legend)[number][];
  tasks?: LedgerTask[];
};

// Static markup with the first rows filled in. scripts/ledger.ts restamps
// them with the reader's clock and then keeps the list moving, using the
// tasks carried in `data-tasks`.
export function Ledger({
  label = homeHero.ledger.label,
  sublabel = homeHero.ledger.sublabel,
  legend = homeHero.ledger.legend,
  tasks = ledgerTasks,
}: Props) {
  const now = Date.now();
  const rows = tasks.slice(0, LEDGER_VISIBLE).map((task, i) => ({
    ...task,
    time: formatTime(now - (LEDGER_VISIBLE - 1 - i) * 47_000),
  }));

  return (
    <figure
      className="pointer-events-auto m-0 rounded-card border border-line-soft bg-white px-6 pt-6 pb-5 shadow-lg"
      data-ledger
      data-tasks={JSON.stringify(tasks)}
      aria-label="Placement Desk activity: work received, worked across carrier channels, and returned to a person"
    >
      <div className="flex items-start justify-between gap-4 border-b border-b-line-soft pb-4">
        <div>
          <p className="font-heading text-[1.1rem] font-medium tracking-head text-ink">{label}</p>
          <p className="mt-[0.1rem] text-label text-ink-muted">{sublabel}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-pill bg-blue px-3 py-[0.35rem] text-label font-medium text-deep">
          <i
            className="relative size-[7px] rounded-[50%] bg-purple motion-safe:after:absolute motion-safe:after:-inset-1 motion-safe:after:animate-ledger-pulse motion-safe:after:rounded-[50%] motion-safe:after:border motion-safe:after:border-purple motion-safe:after:content-['']"
            aria-hidden="true"
          />
          Working
        </span>
      </div>
      <ol className="grid py-2" data-rows>
        {rows.map((row) => (
          <li
            className="group grid grid-cols-[3.1rem_minmax(0,1fr)_auto] items-start gap-[0.85rem] border-b border-b-line-soft py-[0.7rem] text-[0.925rem] leading-[1.4] last:border-b-0 motion-safe:animate-row-in"
            data-status={row.status}
            key={row.task}
          >
            <span className="pt-[0.05rem] text-label text-ink-muted tabular-nums" data-time>
              {row.time}
            </span>
            <span className="text-ink" data-task>
              {row.task}
            </span>
            <i
              className="mt-[0.4rem] size-[9px] rounded-[50%] bg-purple group-data-[status=review]:bg-pink group-data-[status=review]:inset-ring-[1.5px] group-data-[status=review]:inset-ring-purple"
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>
      <ul className="flex flex-wrap gap-5 border-t border-t-line-soft pt-[0.9rem] text-copy text-ink-muted">
        {legend.map((item) => (
          <li
            className="group inline-flex items-center gap-2"
            data-status={item.status}
            key={item.status}
          >
            <i
              className="size-[9px] rounded-[50%] bg-purple group-data-[status=review]:bg-pink group-data-[status=review]:inset-ring-[1.5px] group-data-[status=review]:inset-ring-purple"
              aria-hidden="true"
            />
            {item.label}
          </li>
        ))}
      </ul>
    </figure>
  );
}
