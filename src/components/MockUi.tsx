import type { ReactNode } from "react";
import { cn } from "../lib/style";

// The pieces of the mock app screens shown beside a ScreenCycle's items
// (ProblemScreens, WorkflowScreens, SystemScreens, SecurityScreens). They're
// illustrations, so they are hidden from assistive tech, and their rows live
// in code rather than in the CMS. The window is a container, so a Table's
// columns can drop out as it narrows; its first column always stays and takes
// what room is left.

// An app window, edge to edge, like a crop of a larger screen: 16:9 below lg,
// and from lg up as tall as the column it's in (see ScreenCycle). What runs
// past its foot is cut off, so a screen has rows enough to reach it at any
// size.
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      className="@container flex aspect-video flex-col overflow-hidden rounded-2xl border border-deep/10 bg-white text-xs text-deep shadow-lg lg:aspect-auto lg:h-full"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function Toolbar({ title, view, chip }: { title: string; view: string; chip: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-deep/10 px-4 py-3">
      <p className="min-w-0 truncate">
        <span className="font-heading text-sm font-medium tracking-tight">{title}</span>
        <span className="hidden text-deep/50 @xs:inline"> · {view}</span>
      </p>
      {chip}
    </div>
  );
}

export function Pill({ alert = false, children }: { alert?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-medium whitespace-nowrap",
        alert ? "bg-pink text-purple" : "bg-blue text-deep/70",
      )}
    >
      {children}
    </span>
  );
}

// A column renders its own cell from a row. `className` sets its width and
// the container size it appears from; the first column takes the rest.
export type Column<Row> = { label: string; className?: string; cell: (row: Row) => ReactNode };

export function Table<Row>({ columns, rows }: { columns: Column<Row>[]; rows: readonly Row[] }) {
  const cell = (i: number) =>
    cn("flex shrink-0 items-center", i === 0 && "min-w-0 flex-1", columns[i].className);
  return (
    <div>
      <div className="flex gap-3 border-b border-deep/10 bg-cream/60 px-4 py-1.5 text-deep/50">
        {columns.map((column, i) => (
          <span className={cell(i)} key={column.label}>
            {column.label}
          </span>
        ))}
      </div>
      {rows.map((row, r) => (
        <div className="flex gap-3 border-b border-deep/5 px-4 py-2" key={r}>
          {columns.map((column, i) => (
            <span className={cell(i)} key={column.label}>
              {column.cell(row)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
