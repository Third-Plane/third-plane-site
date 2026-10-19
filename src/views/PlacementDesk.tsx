import { homeHero, placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Card, Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
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

      <PlacementWorkflowSection id="work" title={placementDesk.work.title} />

      <CarrierChannels />

      <Section theme="white" id="systems">
        <SectionHeader>
          <h2>{placementDesk.systems.title}</h2>
          <p className="lead">{placementDesk.systems.body}</p>
        </SectionHeader>
        <Grid>
          {placementDesk.systems.links.map((link, i) => (
            <Card href={link.href} key={link.href} className="gap-0 p-0">
              <SystemScreen name={systemScreens[i]} />
              <div className="space-y-2 px-6 py-5">
                <ItemTitle arrow>{link.title}</ItemTitle>
                <ItemBody>{link.body}</ItemBody>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section theme="blend" id="human">
        <SectionHeader>
          <h2>{placementDesk.human.title}</h2>
          <p className="lead">{placementDesk.human.body}</p>
        </SectionHeader>
        <Grid>
          {placementDesk.human.items.map((item) => (
            <Point key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>
    </>
  );
}
