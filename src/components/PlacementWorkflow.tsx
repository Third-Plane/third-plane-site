import { placementDesk } from "../data/content";
import { ParticleField } from "./ParticleField";
import { Section } from "./Section";
import { Arrow } from "./Ui";

// The Placement Desk's three stages, from work going in to results coming
// back, with the steps under each. Shown on the homepage and on
// /placement-desk; each page supplies its own id and heading.
function PlacementWorkflow() {
  return (
    <div
      className="mt-1 grid auto-rows-[auto_1fr] grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] items-stretch gap-x-(--gap) gap-y-0 max-lg:auto-rows-auto max-lg:grid-cols-1 max-lg:gap-y-(--gap)"
      data-reveal
    >
      {placementDesk.work.stages.map((stage, i) => (
        <div
          className={`relative row-span-2 grid grid-rows-subgrid rounded-card border p-(--pad) max-lg:row-auto max-lg:block ${
            stage.accent
              ? "border-transparent bg-purple text-on-dark"
              : "border-line-dark bg-[#f6f3f00a]"
          }`}
          key={stage.kicker}
        >
          {i > 0 ? (
            <Arrow className="absolute top-1/2 left-[calc(-1*var(--gap)/2_-_11px)] z-1 size-5.5 -translate-y-1/2 rounded-[50%] bg-deep p-0.5 text-pink max-lg:top-[calc(-1*var(--gap)/2_-_11px)] max-lg:left-(--pad) max-lg:translate-y-0 max-lg:rotate-90" />
          ) : null}
          <p className="mb-[1.15rem] font-heading text-[clamp(1.45rem,2.2vw,1.85rem)] leading-[1.15] font-medium tracking-head-tight text-on-dark">
            {stage.kicker}
          </p>
          <ul className="grid content-start">
            {stage.steps.map((step) => (
              <li
                className="border-b border-b-line-dark py-[0.85rem] first:pt-0 last:border-b-0 last:pb-0"
                key={step.title}
              >
                <p className="font-heading text-copy font-medium tracking-head text-on-dark">
                  {step.title}
                </p>
                <p className="mt-[0.3rem] text-copy text-pretty text-on-dark-muted">{step.body}</p>
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
