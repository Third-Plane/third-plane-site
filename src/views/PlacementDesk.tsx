import { placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { SplitHero } from "../components/SplitHero";
import { Button } from "../components/Ui";

export function PlacementDesk() {
  return (
    <>
      <SplitHero
        className="hero--product"
        title={placementDesk.title}
        lead={placementDesk.problem}
        actions={<Button variant="dark">{placementDesk.cta.label}</Button>}
      />

      <PlacementWorkflowSection id="work" title={placementDesk.work.title} />

      <CarrierChannels />

      <Section
        tone="white"
        id="systems"
        title={placementDesk.systems.title}
        body={placementDesk.systems.body}
      >
        <ItemGrid variant="card" columns={2} items={placementDesk.systems.links} />
      </Section>

      <Section
        tone="blend"
        id="human"
        title={placementDesk.human.title}
        body={placementDesk.human.body}
      >
        <ItemGrid variant="card" columns={2} items={placementDesk.human.items} />
      </Section>

      <Cta {...placementDesk.cta} />
    </>
  );
}
