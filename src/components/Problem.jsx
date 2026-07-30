import { Fragment } from 'react'
import { problem } from '../content'
import { ArrowRight, BarsRising, Clock, Doc, SectionHead } from './ui'

/* One glyph per card, in the order the cards are written in content.js: waiting
   on the queue, headcount rising with volume, procedures that are never written
   down. Kept here rather than in content.js so that file stays copy only. */
const icons = [Clock, BarsRising, Doc]

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <SectionHead eyebrow={problem.eyebrow} title={problem.title} body={problem.body} />

        {/* role=list keeps the three cards reading as a clean list even though the
            connective arrows sit between them as siblings. */}
        <div className="tiles" role="list" data-reveal>
          {problem.cards.map((card, i) => {
            const Icon = icons[i]
            return (
              <Fragment key={card.title}>
                {i > 0 && (
                  <span className="tiles__link" aria-hidden="true">
                    <ArrowRight className="tiles__arrow" />
                  </span>
                )}
                <article className="tile" role="listitem">
                  <div className="tile__head">
                    {Icon && <Icon className="tile__icon" />}
                    <h3 className="card__title">{card.title}</h3>
                  </div>
                  <p className="card__body">{card.body}</p>
                </article>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
