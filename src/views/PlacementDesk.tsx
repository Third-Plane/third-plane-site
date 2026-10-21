import { homeHero, placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionHeader } from "../components/Section";
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
        <ScreenCycle
          title={placementDesk.systems.title}
          body={placementDesk.systems.body}
          items={placementDesk.systems.links.map((link, i) => ({
            ...link,
            screen: <SystemScreen name={systemScreens[i]} />,
          }))}
        />
      </Section>

      <Section theme="blend" id="human">
        <div className="wrap">
          <SectionHeader>
            <h2>{placementDesk.human.title}</h2>
            <h3 className="lead">{placementDesk.human.body}</h3>
          </SectionHeader>
          <Grid>
            {placementDesk.human.items.map((item) => (
              <Point key={item.title}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemBody>{item.body}</ItemBody>
              </Point>
            ))}
          </Grid>
        </div>
      </Section>
    </>
  );
}
