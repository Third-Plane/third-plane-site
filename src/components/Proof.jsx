import { proof } from '../content'
import { SectionHead } from './ui'

export default function Proof() {
  return (
    <section className="proof" id="proof">
      <div className="container">
        <div className="proof__shell">
          <SectionHead eyebrow={proof.eyebrow} title={proof.title} body={proof.body} dark />

          <div className="grid grid--4">
            {proof.cards.map((card, i) => (
              <article className="card card--dark" key={card.index} data-reveal style={{ '--i': i }}>
                <p className="card__index">
                  <span>{card.index}</span> · {card.kicker}
                </p>
                <h3 className="card__title">{card.title}</h3>
                <p className="card__body">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
