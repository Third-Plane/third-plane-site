import { evidence } from '../content'
import { SectionHead } from './ui'

export default function Evidence() {
  return (
    <section className="section" id="evidence">
      <div className="container">
        <SectionHead eyebrow={evidence.eyebrow} title={evidence.title} body={evidence.body} />

        <div className="stats" data-reveal>
          {evidence.stats.map((stat) => (
            <div className="stat" key={stat.figure + stat.label}>
              <p className="stat__figure">{stat.figure}</p>
              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="footnote" data-reveal style={{ '--i': 1 }}>
          {evidence.footnote}
        </p>
      </div>
    </section>
  )
}
