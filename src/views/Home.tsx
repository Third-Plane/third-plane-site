import { approach, desk, homeHero, problem } from "../data/content";
import { Diagram } from "../components/Diagram";
import type { ChartName } from "../components/Flowchart";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { ProblemScreen, type ScreenName } from "../components/ProblemScreens";
import { cycleFrame, ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionHeader } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/Hero";
import { Button } from "../components/Ui";

// A mock AMS screen for each problem point, in the order of problem.points.
const problemScreens: ScreenName[] = ["renewed", "overdue", "unassigned", "revenue"];

// A diagram for each operating model, in the order of approach.models (see
// scripts/flowchart/models.ts), one a plain card and one accented (its own
// theme, see index.css).
const modelCharts: ChartName[] = ["toolModel", "thirdPlaneModel"];

export function Home() {
  return (
    <>
      <SplitHero title={homeHero.title} lead={homeHero.lead} actions={<Button />}>
        <Ledger chart="placement" panel={homeHero.ledger} />
      </SplitHero>

      <PlacementWorkflowSection id="desk" title={desk.title} body={desk.body} />

      <Showcase />

      <Section theme="blend" id="problem">
        <ScreenCycle
          title={problem.title}
          body={problem.body}
          items={problem.points.map((point, i) => ({
            ...point,
            screen: <ProblemScreen name={problemScreens[i]} className={cycleFrame} />,
          }))}
        />
      </Section>

      <Section id="approach" theme="white">
        <SectionHeader>
          <h2>{approach.title}</h2>
          <p className="lead">{approach.body}</p>
        </SectionHeader>
        <div className="wrap mt-(--gutter) grid gap-5 lg:grid-cols-2">
          {approach.models.map((model, i) => (
            <Diagram
              key={model.kicker}
              chart={modelCharts[i]}
              title={model.kicker}
              caption={model.note}
              description={model.chain.join(", then ")}
              accent={model.accent}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
