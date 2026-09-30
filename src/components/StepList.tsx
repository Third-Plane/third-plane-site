import { reveal } from "../lib/style";

const COLUMNS = {
  3: "grid-cols-3 max-[1020px]:grid-cols-1",
  4: "grid-cols-4 max-[1020px]:grid-cols-2 max-[640px]:grid-cols-1",
} as const;

// Numbered (or plain) steps on a dark band. Above 640px each step is a subgrid
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
    <ol className={`grid gap-(--gap) min-[641px]:auto-rows-[auto_auto_1fr] ${COLUMNS[columns]}`}>
      {steps.map((step, i) => (
        <li
          className="rounded-card border border-line-dark bg-[#f6f3f00a] p-(--pad) min-[641px]:row-span-3 min-[641px]:grid min-[641px]:grid-rows-subgrid"
          {...reveal(i)}
          key={step.title}
        >
          {numbered ? (
            <span className="mb-6 block font-heading text-[0.9rem] font-medium text-pink">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <h3 className="mb-[0.6rem] font-heading text-title font-medium tracking-head text-on-dark">
            {step.title}
          </h3>
          <p className="text-copy text-pretty text-on-dark-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
