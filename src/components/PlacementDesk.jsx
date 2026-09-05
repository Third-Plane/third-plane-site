import { placementDesk as pd } from '../content'
import Cta from './Cta'
import { Button, DotField, Eyebrow, PlaneNetwork, SectionHead, Slash } from './ui'

export default function PlacementDesk() {
  return (
    <>
      <section className="hero hero--page" id="top">
        <PlaneNetwork className="hero__network hero__network--page" />
        <div className="container hero__page-copy">
          <div data-reveal>
            <Slash className="hero__slash" />
            <Eyebrow>{pd.crumb}</Eyebrow>
          </div>
          <h1 className="display-1" data-reveal style={{ '--i': 1 }}>
            {pd.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="lead hero__lead" data-reveal style={{ '--i': 2 }}>
            {pd.lead}
          </p>
          <p className="hero__body" data-reveal style={{ '--i': 3 }}>
            {pd.body}
          </p>
          <div className="hero__actions" data-reveal style={{ '--i': 4 }}>
            <Button variant="dark" />
          </div>
        </div>
      </section>

      <section className="section section--white" id="entry">
        <div className="container">
          <SectionHead eyebrow={pd.entry.eyebrow} title={pd.entry.title} />
          <div className="grid grid--3">
            {pd.entry.items.map((item, i) => (
              <article className="point" key={item.title} data-reveal style={{ '--i': i }}>
                <span className="point__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="work">
        <DotField className="section__dots" id="work-dots" direction="up" />
        <div className="container">
          <SectionHead dark eyebrow={pd.work.eyebrow} title={pd.work.title} />
          <ol className="steps">
            {pd.work.steps.map((step, i) => (
              <li className="step" key={step.title} data-reveal style={{ '--i': i % 4 }}>
                <span className="step__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--white" id="scope">
        <div className="container">
          <SectionHead eyebrow={pd.scope.eyebrow} title={pd.scope.title} />
          <div className="grid grid--2">
            {pd.scope.tiers.map((tier, i) => (
              <article className="tier" key={tier.title} data-reveal style={{ '--i': i }}>
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
          <SectionHead eyebrow={pd.channels.eyebrow} title={pd.channels.title} />
          <div className="grid grid--3">
            {pd.channels.items.map((item, i) => (
              <article className="card" key={item.title} data-reveal style={{ '--i': i }}>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__body">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="footnote" data-reveal>
            {pd.channels.note}
          </p>
        </div>
      </section>

      <section className="section" id="human">
        <div className="container human">
          <div data-reveal>
            <Eyebrow>{pd.human.eyebrow}</Eyebrow>
            <h2 className="display-2">{pd.human.title}</h2>
          </div>
          <ul className="human__list" data-reveal style={{ '--i': 1 }}>
            {pd.human.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={pd.cta.title} body={pd.cta.body} />
    </>
  )
}
