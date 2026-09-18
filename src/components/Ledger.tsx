import { useEffect, useRef, useState } from "react";
import { homeHero, ledgerTasks } from "../data/content";

const VISIBLE = 5;
const formatTime = (value: number) =>
  new Date(value).toTimeString().slice(0, 5);

type LedgerTask = (typeof ledgerTasks)[number];
type Row = LedgerTask & { key: number; time: string };

type Props = {
  label?: string;
  sublabel?: string;
  legend?: (typeof homeHero.ledger.legend)[number][];
  tasks?: LedgerTask[];
};

export function Ledger({
  label = homeHero.ledger.label,
  sublabel = homeHero.ledger.sublabel,
  legend = homeHero.ledger.legend,
  tasks = ledgerTasks,
}: Props) {
  const index = useRef(VISIBLE);
  const [rows, setRows] = useState<Row[]>(() => {
    const now = Date.now();
    return tasks.slice(0, VISIBLE).map((task, i) => ({
      ...task,
      key: i,
      time: formatTime(now - (VISIBLE - 1 - i) * 47_000),
    }));
  });

  useEffect(() => {
    let timeout: number;
    const tick = () => {
      const next: Row = {
        ...tasks[index.current % tasks.length],
        key: index.current,
        time: formatTime(Date.now()),
      };
      index.current += 1;
      setRows((current) => [...current.slice(1), next]);
      timeout = window.setTimeout(tick, 3800 + Math.random() * 2400);
    };
    timeout = window.setTimeout(tick, 3000);
    return () => window.clearTimeout(timeout);
  }, [tasks]);

  return (
    <figure
      className="ledger"
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
          <li className="ledger__row" data-status={row.status} key={row.key}>
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
