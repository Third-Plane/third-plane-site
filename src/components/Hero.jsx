import { hero } from '../content'
import { Button, Pill } from './ui'
import Diagram from './Diagram'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div data-reveal>
            <Pill>{hero.eyebrow}</Pill>
          </div>

          <h1 className="display-1 hero__title" data-reveal style={{ '--i': 1 }}>
            <span>{hero.titleLead}</span>
            <span className="accent">{hero.titleAccent}</span>
          </h1>

          <p className="lead hero__body" data-reveal style={{ '--i': 2 }}>
            {hero.body}
          </p>

          <div data-reveal style={{ '--i': 3 }}>
            <Button />
          </div>

          <ul className="mono hero__meta" data-reveal style={{ '--i': 4 }}>
            {hero.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ '--i': 2 }}>
          <Diagram />
        </div>
      </div>
    </section>
  )
}
