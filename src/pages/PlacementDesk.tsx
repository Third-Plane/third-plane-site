import { placementDesk } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Cta } from "../components/Cta";
import { Ledger } from "../components/Ledger";
import { PlacementWorkflow } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { AppLink, Arrow, Button } from "../components/Ui";
import { ParticleField } from "../components/ParticleField";
import { delayStyle } from "../lib/style";
import { useTitle } from "../hooks/useTitle";

export function PlacementDesk() {
  useTitle("Placement Desk", placementDesk.problem);
  return (
    <>
      <section className="hero hero--product" id="top">
        <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 className="display-1" data-reveal style={delayStyle(1)}>
              {placementDesk.title.map((line, i) => (
                // The space keeps the lines as separate words for crawlers and
                // screen readers; the spans are blocks, so it never shows.
                <span key={line}>{i > 0 ? ` ${line}` : line}</span>
              ))}
            </h1>
            <p className="hero__lead" data-reveal style={delayStyle(2)}>
              {placementDesk.problem}
            </p>
            <div className="hero__actions" data-reveal style={delayStyle(3)}>
              <Button variant="dark">{placementDesk.cta.label}</Button>
            </div>
          </div>
          <div className="hero__figure" data-reveal style={delayStyle(3)}>
            <Ledger />
          </div>
        </div>
      </section>

      <Section
        tone="deep"
        id="work"
        title={placementDesk.work.title}
        backdrop={
          <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        }
      >
        <PlacementWorkflow />
      </Section>

      <CarrierChannels />

      <Section
        tone="white"
        id="systems"
        title={placementDesk.systems.title}
        body={placementDesk.systems.body}
      >
        <div className="grid grid--2">
          {placementDesk.systems.links.map((link, i) => (
            <AppLink
              className="card card--link"
              href={link.href}
              key={link.href}
              data-reveal
              style={delayStyle(i)}
            >
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
        <div className="grid grid--2">
          {placementDesk.human.items.map((item, i) => (
            <article className="card" data-reveal style={delayStyle(i)} key={item.title}>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Cta
        title={placementDesk.cta.title}
        body={placementDesk.cta.body}
        label={placementDesk.cta.label}
      />
    </>
  );
}
