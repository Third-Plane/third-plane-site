import { approach, desk, homeHero, problem } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { Ledger } from "../components/Ledger";
import { PlacementWorkflow } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { Arrow, Button } from "../components/Ui";
import { ParticleField } from "../components/ParticleField";
import { delayStyle } from "../lib/style";
import { useTitle } from "../hooks/useTitle";

export function Home() {
  useTitle();
  return (
    <>
      <section className="hero" id="top">
        <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 className="display-1 display-1--inline" data-reveal style={delayStyle(1)}>
              {homeHero.title}
            </h1>
            <p className="lead hero__lead" data-reveal style={delayStyle(2)}>
              {homeHero.lead}
            </p>
            <div className="hero__actions" data-reveal style={delayStyle(3)}>
              <Button variant="dark" />
              <Button variant="ghost" href={homeHero.secondary.href}>
                {homeHero.secondary.label}
              </Button>
            </div>
          </div>
          <div className="hero__figure" data-reveal style={delayStyle(3)}>
            <Ledger />
          </div>
        </div>
      </section>

      <Showcase />

      <Section tone="white" id="problem" title={problem.title} body={problem.body}>
        <ItemGrid variant="card" columns={2} items={problem.points} />
      </Section>

      <Section id="approach" title={approach.title} body={approach.body}>
        <div className="models">
          {approach.models.map((model, i) => (
            <div
              className={model.accent ? "model model--accent" : "model"}
              data-reveal
              style={delayStyle(i)}
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

      <Section
        tone="deep"
        id="desk"
        title={desk.title}
        body={desk.body}
        backdrop={
          <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        }
      >
        <PlacementWorkflow />
      </Section>

      <Cta />
    </>
  );
}
