import { securityPage as page } from "../data/content";
import type { ChartName } from "../components/Flowchart";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/Hero";
import { ScreenCycle, StagedScreenCycle } from "../components/ScreenCycle";
import { Section } from "../components/Section";
import { SecurityScreen, type SecurityName } from "../components/SecurityScreens";
import { Button } from "../components/Ui";

export const chart: ChartName = "security";

// A mock screen for each point of authority's stages, from definition to
// evaluation: the limits, the people, the record. In the order of
// authority.sides and each side's items.
const stageScreens: SecurityName[][] = [
  ["scope", "access", "models"],
  ["supervisor", "checkpoints", "configured"],
  ["audit", "context", "performance"],
];

// A mock screen for each data point, in the order of data.items.
const dataScreens: SecurityName[] = ["isolation", "sso", "privacy"];

export function Security() {
  return (
    <>
      <SplitHero title={page.title} lead={page.lead} actions={<Button />}>
        <Ledger chart={chart} panel={page.ledger} />
      </SplitHero>

      <Section theme="white" id="authority">
        <StagedScreenCycle
          title={page.authority.title}
          body={page.authority.body}
          duration={5}
          stages={page.authority.sides.map((side, i) => ({
            title: side.title,
            items: side.items.map((item, j) => ({
              ...item,
              screen: <SecurityScreen name={stageScreens[i]?.[j]} />,
            })),
          }))}
        />
      </Section>

      <Section theme="blend" id="data">
        <ScreenCycle
          title={page.data.title}
          body={page.data.body}
          items={page.data.items.map((item, i) => ({
            ...item,
            screen: <SecurityScreen name={dataScreens[i]} />,
          }))}
        />
      </Section>
    </>
  );
}
