import { approach, desk, homeHero, problem } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { SplitHero } from "../components/SplitHero";
import { Arrow, Button } from "../components/Ui";
import { reveal } from "../lib/style";

export function Home() {
  return (
    <>
      <SplitHero
        title={homeHero.title}
        lead={homeHero.lead}
        actions={
          <>
            <Button variant="dark" />
            <Button variant="ghost" href={homeHero.secondary.href}>
              {homeHero.secondary.label}
            </Button>
          </>
        }
      />

      <Showcase />

      <Section tone="white" id="problem" title={problem.title} body={problem.body}>
        <ItemGrid variant="card" columns={2} items={problem.points} />
      </Section>

      <Section id="approach" title={approach.title} body={approach.body}>
        <div className="models">
          {approach.models.map((model, i) => (
            <div
              className={model.accent ? "model model--accent" : "model"}
              {...reveal(i)}
              key={model.kicker}
            >
              <p className="model__kicker">{model.kicker}</p>
              <div className="model__chain" role="list">
                {model.chain.map((step, stepIndex) => (
                  <span className="model__item" role="listitem" key={step}>
                    {stepIndex > 0 ? <Arrow className="model__arrow" /> : null}
                    <span className="model__step">{step}</span>
                  </span>
                ))}
              </div>
              <p className="model__note">{model.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <PlacementWorkflowSection id="desk" title={desk.title} body={desk.body} />

      <Cta />
    </>
  );
}
