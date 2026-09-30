import { placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { SplitHero } from "../components/SplitHero";
import { AppLink, Arrow, Button } from "../components/Ui";
import { reveal } from "../lib/style";
import { useTitle } from "../hooks/useTitle";

export function PlacementDesk() {
  useTitle("Placement Desk", placementDesk.problem);
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
        <div className="grid grid--2">
          {placementDesk.systems.links.map((link, i) => (
            <AppLink className="card card--link" href={link.href} key={link.href} {...reveal(i)}>
              <h3 className="card__title">
                {link.title}
                <Arrow className="card__arrow" />
              </h3>
              <p className="card__body">{link.body}</p>
            </AppLink>
          ))}
        </div>
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
