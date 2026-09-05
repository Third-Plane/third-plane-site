import { deployment } from '../content'
import { SectionHead } from './ui'

export default function Deployment() {
  return (
    <section className="section section--blend" id="deployment">
      <div className="container">
        <SectionHead eyebrow={deployment.eyebrow} title={deployment.title} body={deployment.body} />

        <div className="grid grid--4">
          {deployment.cards.map((card, i) => (
            <article className="card" key={card.title} data-reveal style={{ '--i': i }}>
              <h3 className="card__title">{card.title}</h3>
              <p className="card__body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
