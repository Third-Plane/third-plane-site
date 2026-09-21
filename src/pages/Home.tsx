import { approach, desk, homeHero, problem } from "../data/content";
import { Cta } from "../components/Cta";
import { Ledger } from "../components/Ledger";
import { Showcase } from "../components/Showcase";
import {
  Arrow,
  Button,
  Eyebrow,
  SectionHead,
  Slash,
  TextLink,
} from "../components/Ui";
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

      <Showcase />

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
                className="card"
                data-reveal
                style={delayStyle(i)}
                key={point.title}
              >
                <h3 className="card__title">{point.title}</h3>
                <p className="card__body">{point.body}</p>
              </article>
            ))}
          </div>
          <p className="closing closing--left" data-reveal>
            {problem.closing}
          </p>
        </div>
      </section>

      <section className="section" id="approach">
        <div className="container">
          <SectionHead
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
                    <span className="model__item" role="listitem" key={step}>
                      {stepIndex > 0 ? (
                        <Arrow className="model__arrow" />
                      ) : null}
                      <span className="model__step">{step}</span>
                    </span>
                  ))}
                </div>
                <p className="model__note">{model.note}</p>
              </div>
            ))}
          </div>
          <div className="definition" data-reveal>
            <p className="definition__kicker">{approach.definition.kicker}</p>
            <p className="definition__body">{approach.definition.body}</p>
          </div>
        </div>
      </section>

      <section className="section section--deep desk-stage" id="desk">
        <ParticleField
          className="section__particles"
          tone="cream"
          alpha={0.75}
          density={0.8}
        />
        <div className="container">
          <h2 className="desk-stage__name" data-reveal>
            {desk.name}
          </h2>
          <div className="desk-stage__board">
            <div className="desk-stage__head" data-reveal>
              <p className="display-2">{desk.title}</p>
              <p className="lead">{desk.body}</p>
            </div>
            <div className="flow flow--dark" data-reveal>
              {desk.columns.map((column, i) => (
                <div
                  className={
                    column.accent ? "flow__col flow__col--accent" : "flow__col"
                  }
                  key={column.kicker}
                >
                  {i > 0 ? <Arrow className="flow__arrow" /> : null}
                  <p className="flow__kicker">{column.kicker}</p>
                  <p className="flow__line">{column.line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="desk-stage__foot" data-reveal>
            <p className="closing closing--left desk-stage__closing">
              {desk.closing}
            </p>
            <TextLink href={desk.cta.href}>{desk.cta.label}</TextLink>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
