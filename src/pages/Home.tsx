import { Fragment } from "react";
import {
  approach,
  company,
  deployment,
  desk,
  homeHero,
  horizon,
  problem,
} from "../data/content";
import { Cta } from "../components/Cta";
import { Ledger } from "../components/Ledger";
import {
  Arrow,
  Button,
  CardMark,
  Dots,
  Eyebrow,
  Network,
  SectionHead,
  Slash,
  TextLink,
} from "../components/Ui";
import { delayStyle } from "../lib/style";

export function Home() {
  return (
    <>
      <section className="hero" id="top">
        <Network className="hero__network" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <div data-reveal>
              <Slash className="hero__slash" />
              <Eyebrow>{homeHero.eyebrow}</Eyebrow>
            </div>
            <h1 className="display-1" data-reveal style={delayStyle(1)}>
              {homeHero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="lead hero__lead" data-reveal style={delayStyle(2)}>
              {homeHero.lead}
            </p>
            <p className="hero__body" data-reveal style={delayStyle(3)}>
              {homeHero.body}
            </p>
            <div className="hero__actions" data-reveal style={delayStyle(4)}>
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

      <section className="section section--white" id="problem">
        <div className="container">
          <SectionHead
            eyebrow={problem.eyebrow}
            title={problem.title}
            body={problem.body}
          />
          <div className="grid grid--3">
            {problem.points.map((point, i) => (
              <article
                className="point"
                data-reveal
                style={delayStyle(i)}
                key={point.title}
              >
                <span className="point__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="point__title">{point.title}</h3>
                <p className="point__body">{point.body}</p>
              </article>
            ))}
          </div>
          <p className="closing" data-reveal>
            {problem.closing}
          </p>
        </div>
      </section>

      <section className="section section--deep" id="approach">
        <Dots className="section__dots" id="shift-dots" direction="up" />
        <div className="container">
          <SectionHead
            dark
            eyebrow={approach.eyebrow}
            title={approach.title}
            body={approach.body}
          />
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
                    <Fragment key={step}>
                      {stepIndex > 0 ? (
                        <Arrow className="model__arrow" />
                      ) : null}
                      <span className="model__step" role="listitem">
                        {step}
                      </span>
                    </Fragment>
                  ))}
                </div>
                <p className="model__note">{model.note}</p>
              </div>
            ))}
          </div>
          <div className="definition" data-reveal>
            <p className="definition__kicker">{approach.definition.kicker}</p>
            <ul className="definition__list">
              {approach.definition.items.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--white" id="desk">
        <div className="container">
          <SectionHead
            eyebrow={desk.eyebrow}
            title={desk.title}
            body={desk.body}
          />
          <div className="flow" data-reveal>
            {desk.columns.map((column, i) => (
              <div
                className={
                  column.accent ? "flow__col flow__col--accent" : "flow__col"
                }
                key={column.kicker}
              >
                {i > 0 ? <Arrow className="flow__arrow" /> : null}
                <p className="flow__kicker">{column.kicker}</p>
                <ul className="flow__list">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flow__foot" data-reveal>
            <p className="closing closing--left">{desk.closing}</p>
            <TextLink href={desk.cta.href}>{desk.cta.label}</TextLink>
          </div>
        </div>
      </section>

      <section className="section section--blend" id="deployment">
        <div className="container">
          <SectionHead
            eyebrow={deployment.eyebrow}
            title={deployment.title}
            body={deployment.body}
          />
          <div className="grid grid--4">
            {deployment.cards.map((card, i) => (
              <article
                className="card"
                data-reveal
                style={delayStyle(i)}
                key={card.title}
              >
                <CardMark name={card.icon} />
                <h3 className="card__title">{card.title}</h3>
                <p className="card__body">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="company">
        <div className="container company">
          <div className="company__copy" data-reveal>
            <Eyebrow>{company.eyebrow}</Eyebrow>
            <h2 className="display-2">{company.title}</h2>
            {company.body.map((paragraph) => (
              <p className="company__para" key={paragraph.slice(0, 20)}>
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="company__facts" data-reveal style={delayStyle(1)}>
            {company.facts.map((fact) => (
              <li key={fact.title}>
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </li>
            ))}
          </ul>
          <figure className="still company__still" data-reveal>
            <img
              src="/brand/still-perspective.jpg"
              alt="A new perspective on wholesale insurance."
              width="2416"
              height="1523"
            />
          </figure>
        </div>
      </section>

      <section className="section section--purple horizon">
        <Network className="horizon__network" />
        <div className="container horizon__inner" data-reveal>
          <h2 className="display-2">{horizon.title}</h2>
          <p className="horizon__body">{horizon.body}</p>
        </div>
      </section>

      <Cta />
    </>
  );
}
