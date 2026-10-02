import { cn, reveal } from "../lib/style";

const COLUMNS = {
  3: "grid-cols-3 max-lg:grid-cols-1",
  4: "grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1",
} as const;

// Numbered (or plain) steps on a dark band. From sm up each step is a subgrid
// spanning three rows (number, title, body), so titles and bodies line up.
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
    <ol className={cn("grid gap-5 sm:auto-rows-[auto_auto_1fr]", COLUMNS[columns])}>
      {steps.map((step, i) => (
        <li
          className="rounded-2xl border border-line-dark bg-cream/5 p-7 sm:row-span-3 sm:grid sm:grid-rows-subgrid"
          {...reveal(i)}
          key={step.title}
        >
          {numbered ? (
            <span className="mb-6 block font-heading text-sm font-medium text-pink">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <h3 className="mb-2.5 font-heading text-xl font-medium tracking-tight text-on-dark">
            {step.title}
          </h3>
          <p className="text-base text-pretty text-on-dark-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
