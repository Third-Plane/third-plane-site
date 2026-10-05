import { placementDesk } from "../data/content";
import { ParticleField } from "./ParticleField";
import { Section, SectionHeader } from "./Section";
import { Arrow } from "./Ui";
import { StageScreen, type StageName } from "./WorkflowScreens";
import { cn } from "../lib/style";

// A mock screen for each stage, in the order of placementDesk.work.stages.
const stageScreens: StageName[] = ["intake", "markets", "results"];

// The Placement Desk's three stages, from work going in to results coming
// back, with a screen and the steps under each. Shown on the homepage and on
// /placement-desk; each page supplies its own id and heading. From lg the
// stages share their rows, so the screens, names and step lists line up.
function PlacementWorkflow() {
  return (
    <div
      className="grid gap-5 lg:auto-rows-[auto_auto_1fr] lg:grid-cols-[3fr_4fr_3fr] lg:gap-y-0"
      data-reveal
    >
      {placementDesk.work.stages.map((stage, i) => (
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border lg:row-span-3 lg:grid lg:grid-rows-subgrid",
            stage.accent ? "surface-accent border-transparent" : "border-border bg-card",
          )}
          key={stage.kicker}
        >
          {i > 0 ? (
            <Arrow className="absolute -top-5.25 left-7 z-1 size-5.5 rotate-90 rounded-full bg-background p-0.5 text-accent lg:top-1/2 lg:-left-5.25 lg:-translate-y-1/2 lg:rotate-0" />
          ) : null}
          <StageScreen name={stageScreens[i]} />
          <p className="px-7 pt-6 pb-5 font-heading text-2xl leading-tight font-medium tracking-tight text-foreground">
            {stage.kicker}
          </p>
          <ul className="grid content-start px-7 pb-7">
            {stage.steps.map((step) => (
              <li
                className="border-b border-b-border py-3.5 first:pt-0 last:border-b-0 last:pb-0"
                key={step.title}
              >
                <p className="font-heading text-base font-medium tracking-tight text-foreground">
                  {step.title}
                </p>
                <p className="mt-1 text-base text-pretty text-muted-foreground">{step.body}</p>
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
    <Section tone="deep" id={id}>
      <ParticleField mask="section" tone="cream" alpha={0.75} density={0.8} />
      <SectionHeader title={title} body={body} />
      <PlacementWorkflow />
    </Section>
  );
}
