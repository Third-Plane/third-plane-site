import { evidence } from '../content'
import { SectionHead } from './ui'

export default function Evidence() {
  return (
    <section className="section evidence" id="evidence">
      <div className="container">
        <SectionHead eyebrow={evidence.eyebrow} title={evidence.title} body={evidence.body} />

        <div className="stats" data-reveal>
          {evidence.stats.map((group) => (
            <div
              className={group.figures.length > 1 ? 'stat stat--pair' : 'stat'}
              key={group.figures.map((f) => f.figure).join('/')}
            >
              <div className="stat__figures">
                {group.figures.map((f) => (
                  <div className="stat__item" key={f.figure}>
                    <p className="stat__figure">{f.figure}</p>
                    <p className="stat__label">{f.label}</p>
                  </div>
                ))}
              </div>
              <p className="stat__body">{group.body}</p>
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
