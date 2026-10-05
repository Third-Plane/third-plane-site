import { reveal } from "../lib/style";

// Numbered steps as tiles. From sm up each step is a subgrid spanning its
// rows (number, title and body), so titles and bodies line up.
export function StepList({ steps }: { steps: ReadonlyArray<{ title: string; body: string }> }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li
          className="space-y-3 rounded-2xl border border-border bg-card p-6 sm:row-span-3"
          {...reveal(i)}
          key={step.title}
        >
          <h3 className="flex font-heading text-xl font-medium tracking-tight text-foreground">
            {step.title}
            <span className="ml-auto block font-bold text-accent/25">
              {String(i + 1).padStart(2, "0")}
            </span>
          </h3>
          <p className="text-base text-pretty text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
