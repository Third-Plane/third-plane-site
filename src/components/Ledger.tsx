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
      className="ledger"
      data-ledger
      data-tasks={JSON.stringify(tasks)}
      aria-label="Placement Desk activity: work received, worked across carrier channels, and returned to a person"
    >
      <div className="ledger__head">
        <div>
          <p className="ledger__label">{label}</p>
          <p className="ledger__sublabel">{sublabel}</p>
        </div>
        <span className="ledger__live">
          <i aria-hidden="true" />
          Working
        </span>
      </div>
      <ol className="ledger__rows">
        {rows.map((row) => (
          <li className="ledger__row" data-status={row.status} key={row.task}>
            <span className="ledger__time">{row.time}</span>
            <span className="ledger__task">{row.task}</span>
            <i className="ledger__dot" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <ul className="ledger__legend">
        {legend.map((item) => (
          <li data-status={item.status} key={item.status}>
            <i aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </figure>
  );
}
