import { placementDesk } from "../data/content";
import { Cta } from "../components/Cta";
import { Ledger } from "../components/Ledger";
import { PlacementWorkflow } from "../components/PlacementWorkflow";
import { Button, CardMark, SectionHead, TextLink } from "../components/Ui";
import { ParticleField } from "../components/ParticleField";
import { delayStyle } from "../lib/style";
import { useTitle } from "../hooks/useTitle";

const channelMarks = ["portal", "api", "mail"] as const;

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

      <section className="section section--deep" id="work">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container">
          <SectionHead title={placementDesk.work.title} />
          <PlacementWorkflow />
        </div>
      </section>

      <section className="section section--blend" id="channels">
        <div className="container">
          <SectionHead title={placementDesk.channels.title} body={placementDesk.channels.body} />
          <div className="grid grid--3">
            {placementDesk.channels.items.map((item, i) => (
              <article className="card" data-reveal style={delayStyle(i)} key={item.title}>
                <CardMark name={channelMarks[i]} variant="wide" />
                <h3 className="card__title">{item.title}</h3>
                <p className="card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" id="systems">
        <div className="container coverage">
          <h2 className="display-2" data-reveal>
            {placementDesk.systems.title}
          </h2>
          <div data-reveal style={delayStyle(1)}>
            <p className="lead">{placementDesk.systems.body}</p>
            <div className="coverage__links">
              <TextLink href={placementDesk.systems.link.href}>
                {placementDesk.systems.link.label}
              </TextLink>
              <TextLink href="/applied-epic">Applied Epic</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="human">
        <div className="container human">
          <div data-reveal>
            <h2 className="display-2">{placementDesk.human.title}</h2>
          </div>
          <ul className="human__list" data-reveal style={delayStyle(1)}>
            {placementDesk.human.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta
        title={placementDesk.cta.title}
        body={placementDesk.cta.body}
        label={placementDesk.cta.label}
      />
    </>
  );
}
