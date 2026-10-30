import { homeHero, placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Grid, GridItem } from "../components/Grid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionContent, SectionHeader } from "../components/Section";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/Hero";
import { SystemScreen, type SystemName } from "../components/SystemScreens";
import { Button } from "../components/Ui";

// A mock screen for each systems link, in the order of systems.links: the AMS
// for Applied Epic, the inbox for the other integrations.
const systemScreens: SystemName[] = ["ams", "inbox"];

export function PlacementDesk() {
  return (
    <>
      <SplitHero
        title={placementDesk.title}
        lead={placementDesk.problem}
        actions={<Button>{placementDesk.cta.label}</Button>}
      >
        <Ledger chart="placement" panel={homeHero.ledger} />
      </SplitHero>

      <PlacementWorkflowSection id="work" />

      <CarrierChannels />

      <Section theme="white" id="systems">
        <SectionHeader>
          <h2>{placementDesk.systems.title}</h2>
          <p className="lead">{placementDesk.systems.body}</p>
        </SectionHeader>
        <SectionContent>
          <ScreenCycle
            items={placementDesk.systems.links.map((link, i) => ({
              ...link,
              screen: <SystemScreen name={systemScreens[i]} />,
            }))}
          />
        </SectionContent>
      </Section>

      <Section theme="blend" id="human">
        <SectionHeader>
          <h2>{placementDesk.human.title}</h2>
          <p className="lead">{placementDesk.human.body}</p>
        </SectionHeader>
        <SectionContent className="p-0">
          <Grid>
            {placementDesk.human.items.map((item) => (
              <GridItem key={item.title}>
                <h3>{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </GridItem>
            ))}
          </Grid>
        </SectionContent>
      </Section>
    </>
  );
}
