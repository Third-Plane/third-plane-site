import type { ReactNode } from "react";
import { cn } from "../lib/style";

// The pieces of the mock app screens drawn into cards (ProblemScreens,
// WorkflowScreens). They're illustrations, so they are hidden from assistive
// tech, and their rows live in code rather than in the CMS. The window is a
// container, so a Table's columns can drop out as the card narrows; its first
// column always stays and takes what room is left.

// A window on a ground, running off the bottom edge like a crop of a larger
// screen. The ground is lavender and 16:9 unless `className` says otherwise.
export function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-t-2xl border-b border-border/10 bg-lavender",
        className,
      )}
      aria-hidden="true"
    >
      <div className="@container absolute inset-x-6 top-6 -bottom-6 flex flex-col overflow-hidden rounded-xl border border-deep/10 bg-white text-xs text-deep shadow-xl shadow-deep/10">
        {children}
      </div>
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
