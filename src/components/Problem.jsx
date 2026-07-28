import { problem } from '../content'
import { SectionHead } from './ui'

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <SectionHead eyebrow={problem.eyebrow} title={problem.title} body={problem.body} />

        <div className="grid grid--3">
          {problem.cards.map((card, i) => (
            <article className="card" key={card.title} data-reveal style={{ '--i': i }}>
              <p className="card__figure">{card.figure}</p>
              <h3 className="card__title">{card.title}</h3>
              <p className="card__body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
