import { alpine } from '../content'
import { SectionHead } from './ui'

export default function Alpine() {
  return (
    <section className="section alpine" id="alpine">
      <div className="container">
        <SectionHead title={alpine.title} body={alpine.body} />

        <div className="grid grid--3">
          {alpine.cards.map((card, i) => (
            <article
              className={card.flag ? 'card alpine-card alpine-card--flag' : 'card alpine-card'}
              key={card.index}
              data-reveal
              style={{ '--i': i }}
            >
              {card.flag ? <i className="log__dot alpine-card__flag" aria-hidden="true" /> : null}
              <p className="card__index">
                <span>{card.index}</span> · {card.kicker}
              </p>
              <h3 className="display-3">{card.title}</h3>
              <p className="card__body">{card.body}</p>
              <p className="card__meta">{card.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
