import { cn, reveal } from "../lib/style";

const COLUMNS = {
  3: "lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

// Numbered (or plain) steps as tiles. From sm up each step is a subgrid
// spanning its rows (number, if any, then title and body), so titles and
// bodies line up.
export function StepList({
  steps,
  columns,
  numbered = false,
}: {
  steps: ReadonlyArray<{ title: string; body: string }>;
  columns: 3 | 4;
  numbered?: boolean;
}) {
  return (
    <ol
      className={cn(
        "grid gap-5",
        numbered ? "sm:auto-rows-[auto_auto_1fr]" : "sm:auto-rows-[auto_1fr]",
        COLUMNS[columns],
      )}
    >
      {steps.map((step, i) => (
        <li
          className={cn(
            "rounded-2xl border border-border bg-card p-7 sm:grid sm:grid-rows-subgrid",
            numbered ? "sm:row-span-3" : "sm:row-span-2",
          )}
          {...reveal(i)}
          key={step.title}
        >
          {numbered ? (
            <span className="mb-6 block font-heading text-sm font-medium text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <h3 className="mb-2.5 font-heading text-xl font-medium tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="text-base text-pretty text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
