import { alpine } from '../content'
import { SectionHead } from './ui'

export default function Alpine() {
  return (
    <section className="section" id="alpine">
      <div className="container">
        <SectionHead eyebrow={alpine.eyebrow} title={alpine.title} body={alpine.body} />

        <div className="grid grid--3">
          {alpine.cards.map((card, i) => (
            <article className="card alpine-card" key={card.index} data-reveal style={{ '--i': i }}>
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
