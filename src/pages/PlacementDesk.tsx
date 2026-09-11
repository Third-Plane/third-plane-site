import { placementDesk } from "../data/content";
import { Cta } from "../components/Cta";
import {
  Button,
  CardMark,
  Dots,
  Eyebrow,
  Network,
  SectionHead,
  Slash,
} from "../components/Ui";
import { delayStyle } from "../lib/style";

const channelMarks = ["portal", "api", "mail"] as const;

export function PlacementDesk() {
  return (
    <>
      <section className="hero hero--page" id="top">
        <Network className="hero__network hero__network--page" />
        <div className="container hero__page-copy">
          <div data-reveal>
            <Slash className="hero__slash" />
            <Eyebrow>{placementDesk.crumb}</Eyebrow>
          </div>
          <h1 className="display-1" data-reveal style={delayStyle(1)}>
            {placementDesk.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="lead hero__lead" data-reveal style={delayStyle(2)}>
            {placementDesk.lead}
          </p>
          <p className="hero__body" data-reveal style={delayStyle(3)}>
            {placementDesk.body}
          </p>
          <div className="hero__actions" data-reveal style={delayStyle(4)}>
            <Button variant="dark" />
          </div>
        </div>
      </section>

      <section className="section section--white" id="entry">
        <div className="container">
          <SectionHead
            eyebrow={placementDesk.entry.eyebrow}
            title={placementDesk.entry.title}
          />
          <div className="grid grid--3">
            {placementDesk.entry.items.map((item, i) => (
              <article
                className="point"
                data-reveal
                style={delayStyle(i)}
                key={item.title}
              >
                <span className="point__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="work">
        <Dots className="section__dots" id="work-dots" direction="up" />
        <div className="container">
          <SectionHead
            dark
            eyebrow={placementDesk.work.eyebrow}
            title={placementDesk.work.title}
          />
          <ol className="steps">
            {placementDesk.work.steps.map((step, i) => (
              <li
                className="step"
                data-reveal
                style={delayStyle(i % 4)}
                key={step.title}
              >
                <span className="step__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--white" id="scope">
        <div className="container">
          <SectionHead
            eyebrow={placementDesk.scope.eyebrow}
            title={placementDesk.scope.title}
          />
          <div className="grid grid--2">
            {placementDesk.scope.tiers.map((tier, i) => (
              <article
                className="tier"
                data-reveal
                style={delayStyle(i)}
                key={tier.title}
              >
                <p className="tier__kicker">{tier.kicker}</p>
                <h3 className="tier__title">{tier.title}</h3>
                <p className="tier__body">{tier.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blend" id="channels">
        <div className="container">
          <SectionHead
            eyebrow={placementDesk.channels.eyebrow}
            title={placementDesk.channels.title}
          />
          <div className="grid grid--3">
            {placementDesk.channels.items.map((item, i) => (
              <article
                className="card"
                data-reveal
                style={delayStyle(i)}
                key={item.title}
              >
                <CardMark name={channelMarks[i]} variant="wide" />
                <h3 className="card__title">{item.title}</h3>
                <p className="card__body">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="footnote" data-reveal>
            {placementDesk.channels.note}
          </p>
        </div>
      </section>

      <section className="section" id="human">
        <div className="container human">
          <div data-reveal>
            <Eyebrow>{placementDesk.human.eyebrow}</Eyebrow>
            <h2 className="display-2">{placementDesk.human.title}</h2>
          </div>
          <ul className="human__list" data-reveal style={delayStyle(1)}>
            {placementDesk.human.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={placementDesk.cta.title} body={placementDesk.cta.body} />
    </>
  );
}
