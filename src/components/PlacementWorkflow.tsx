import { desk, placementDesk } from "../data/content";
import { cycleFrame, StagedScreenCycle } from "./ScreenCycle";
import { Section } from "./Section";
import { StageScreen, type StageName } from "./WorkflowScreens";
import { cn } from "../lib/style";

// A mock screen for each stage, in the order of placementDesk.work.stages.
const stageScreens: StageName[] = ["intake", "markets", "results"];

// The Placement Desk's three stages, from work going in to results coming
// back, as one cycle through every stage's steps: a tab for each stage, and
// for each step its stage's screen in that step's state. Shown on the homepage
// and on /placement-desk, under the homepage's Placement Desk heading on both;
// each page supplies its own id.
export function PlacementWorkflowSection({ id }: { id: string }) {
  return (
    <Section theme="white" id={id}>
      <StagedScreenCycle
        title={desk.title}
        body={desk.body}
        duration={5}
        stages={placementDesk.work.stages.map((stage, i) => ({
          title: stage.kicker,
          items: stage.steps.map((step, j) => ({
            ...step,
            screen: <StageScreen name={stageScreens[i]} step={j} className={cn(cycleFrame)} />,
          })),
        }))}
      />
    </Section>
  );
}
