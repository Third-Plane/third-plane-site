import { approach, homeHero, problem } from "../data/content";
import { Diagram } from "../components/Diagram";
import type { ChartName } from "../components/Flowchart";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { ProblemScreen, type ScreenName } from "../components/ProblemScreens";
import { ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionContent, SectionHeader } from "../components/Section";
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

      <PlacementWorkflowSection id="desk" />

      <Section theme="blend" id="problem">
        <SectionHeader>
          <h2>{problem.title}</h2>
          <p className="lead">{problem.body}</p>
        </SectionHeader>
        <SectionContent>
          <ScreenCycle
            items={problem.points.map((point, i) => ({
              ...point,
              screen: <ProblemScreen name={problemScreens[i]} />,
            }))}
          />
        </SectionContent>
      </Section>

      <Section id="approach" theme="white">
        <SectionHeader>
          <h2>{approach.title}</h2>
          <p className="lead">{approach.body}</p>
        </SectionHeader>
        <SectionContent>
          <div className="grid gap-5 lg:grid-cols-2">
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
        </SectionContent>
      </Section>
    </>
  );
}
