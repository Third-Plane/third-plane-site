import { hero } from '../content'
import { Button, Eyebrow, PlaneNetwork, Slash } from './ui'
import Ledger from './Ledger'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <PlaneNetwork className="hero__network" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <div data-reveal>
            <Slash className="hero__slash" />
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1 className="display-1" data-reveal style={{ '--i': 1 }}>
            {hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p className="lead hero__lead" data-reveal style={{ '--i': 2 }}>
            {hero.lead}
          </p>

          <p className="hero__body" data-reveal style={{ '--i': 3 }}>
            {hero.body}
          </p>

          <div className="hero__actions" data-reveal style={{ '--i': 4 }}>
            <Button variant="dark" />
            <Button variant="ghost" href={hero.secondary.href}>
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="hero__figure" data-reveal style={{ '--i': 3 }}>
          <Ledger />
        </div>
      </div>
    </section>
  )
}
