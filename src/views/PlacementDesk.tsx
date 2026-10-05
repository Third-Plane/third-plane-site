import { placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Cta } from "../components/Cta";
import { Card, Grid, ItemBody, ItemTitle } from "../components/Grid";
import { reveal } from "../lib/style";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { Section, SectionHeader } from "../components/Section";
import { SplitHero } from "../components/SplitHero";
import { Button } from "../components/Ui";

// The hero is its own export: pages/placement-desk.astro puts it in Base's `hero`
// slot, outside <main>.
export function PlacementDeskHero() {
  return (
    <SplitHero
      title={placementDesk.title}
      lead={placementDesk.problem}
      actions={<Button>{placementDesk.cta.label}</Button>}
    />
  );
}

export function PlacementDesk() {
  return (
    <>
      <PlacementWorkflowSection id="work" title={placementDesk.work.title} />

      <CarrierChannels />

      <Section tone="white" id="systems">
        <SectionHeader title={placementDesk.systems.title} body={placementDesk.systems.body} />
        <Grid className="wrap">
          {placementDesk.systems.links.map((link, i) => (
            <Card href={link.href} key={link.href} {...reveal(i)}>
              <ItemTitle arrow>{link.title}</ItemTitle>
              <ItemBody>{link.body}</ItemBody>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section tone="blend" id="human">
        <SectionHeader title={placementDesk.human.title} body={placementDesk.human.body} />
        <Grid className="wrap">
          {placementDesk.human.items.map((item, i) => (
            <Card key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Card>
          ))}
        </Grid>
      </Section>

      <Cta {...placementDesk.cta} />
    </>
  );
}
