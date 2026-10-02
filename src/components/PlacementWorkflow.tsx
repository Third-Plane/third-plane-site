import { placementDesk } from "../data/content";
import { ParticleField } from "./ParticleField";
import { Section } from "./Section";
import { Arrow } from "./Ui";
import { cn } from "../lib/style";

// The Placement Desk's three stages, from work going in to results coming
// back, with the steps under each. Shown on the homepage and on
// /placement-desk; each page supplies its own id and heading.
function PlacementWorkflow() {
  return (
    <div
      className="mt-1 grid auto-rows-[auto_1fr] grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] items-stretch gap-x-5 gap-y-0 max-lg:auto-rows-auto max-lg:grid-cols-1 max-lg:gap-y-5"
      data-reveal
    >
      {placementDesk.work.stages.map((stage, i) => (
        <div
          className={cn(
            "relative row-span-2 grid grid-rows-subgrid rounded-2xl border p-7 max-lg:row-auto max-lg:block",
            stage.accent
              ? "border-transparent bg-purple text-on-dark"
              : "border-line-dark bg-cream/5",
          )}
          key={stage.kicker}
        >
          {i > 0 ? (
            <Arrow className="absolute top-1/2 -left-5.25 z-1 size-5.5 -translate-y-1/2 rounded-full bg-deep p-0.5 text-pink max-lg:-top-5.25 max-lg:left-7 max-lg:translate-y-0 max-lg:rotate-90" />
          ) : null}
          <p className="mb-5 font-heading text-2xl leading-tight font-medium tracking-tight text-on-dark">
            {stage.kicker}
          </p>
          <ul className="grid content-start">
            {stage.steps.map((step) => (
              <li
                className="border-b border-b-line-dark py-3.5 first:pt-0 last:border-b-0 last:pb-0"
                key={step.title}
              >
                <p className="font-heading text-base font-medium tracking-tight text-on-dark">
                  {step.title}
                </p>
                <p className="mt-1 text-base text-pretty text-on-dark-muted">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PlacementWorkflowSection({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body?: string;
}) {
  return (
    <Section
      tone="deep"
      id={id}
      title={title}
      body={body}
      backdrop={<ParticleField mask="section" tone="cream" alpha={0.75} density={0.8} />}
    >
      <PlacementWorkflow />
    </Section>
  );
}
