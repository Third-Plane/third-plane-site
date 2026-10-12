import { securityPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, OutlineCard } from "../components/Grid";
import type { ChartName } from "../components/Flowchart";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/SplitHero";
import { cycleFrame, ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionHeader } from "../components/Section";
import { SecurityScreen, type SecurityName } from "../components/SecurityScreens";
import type { Theme } from "../components/theme";

export const chart: ChartName = "security";

// authority's two sides, each a section of its own, with a mock screen for
// each point, in the order of side.items.
const sides: { id: string; theme: Theme; screens: SecurityName[] }[] = [
  { id: "authority", theme: "white", screens: ["scope", "access", "models"] },
  { id: "accountability", theme: "blend", screens: ["supervisor", "checkpoints", "configured"] },
];

export function Security() {
  return (
    <>
      <SplitHero title={page.title} lead={page.lead}>
        <Ledger chart={chart} panel={page.ledger} />
      </SplitHero>

      {page.authority.sides.map((side, i) => (
        <Section theme={sides[i].theme} id={sides[i].id} key={sides[i].id}>
          <ScreenCycle
            title={side.title}
            body={side.body}
            items={side.items.map((item, j) => ({
              ...item,
              screen: <SecurityScreen name={sides[i].screens[j]} className={cycleFrame} />,
            }))}
          />
        </Section>
      ))}

      <Section theme="deep" id="record">
        <SectionHeader title={page.record.title} />
        <Grid columns={3} className="wrap">
          {page.record.items.map((item) => (
            <OutlineCard key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </OutlineCard>
          ))}
        </Grid>
      </Section>

      <Section theme="blend" id="data">
        <SectionHeader title={page.data.title} />
        <Grid className="wrap">
          {page.data.items.map((item) => (
            <OutlineCard className="px-6 py-5" key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </OutlineCard>
          ))}
        </Grid>
      </Section>
    </>
  );
}
