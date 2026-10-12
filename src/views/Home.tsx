import { approach, desk, homeHero, problem } from "../data/content";
import { Diagram } from "../components/Diagram";
import type { ChartName } from "../components/Flowchart";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { ProblemCycle } from "../components/ProblemCycle";
import { Section, SectionHeader } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/SplitHero";
import { Button } from "../components/Ui";

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

      <Section theme="white" id="problem">
        <ProblemCycle title={problem.title} body={problem.body} points={problem.points} />
      </Section>

      <Section id="approach" theme="blend">
        <SectionHeader title={approach.title} body={approach.body} />
        <div className="wrap grid gap-5 lg:grid-cols-2">
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
