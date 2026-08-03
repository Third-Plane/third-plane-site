import { evidence } from '../content'
import { SectionHead } from './ui'

export default function Evidence() {
  const { strategies } = evidence

  return (
    <section className="section section--band evidence" id="evidence">
      <div className="container">
        <SectionHead eyebrow={evidence.eyebrow} title={evidence.title} body={evidence.body} />

        <div className="stats" data-reveal>
          {evidence.stats.map((stat) => (
            <div className="stat" key={stat.figure}>
              <p className="stat__figure">{stat.figure}</p>
              <p className="stat__body">{stat.body}</p>
            </div>
          ))}
        </div>

        <p className="footnote" data-reveal style={{ '--i': 1 }}>
          {evidence.footnote}
        </p>

        <div className="strategies">
          <header className="strategies__head" data-reveal>
            <h2 className="display-2">{strategies.title}</h2>
            <p className="lead">{strategies.body}</p>
          </header>

          <div className="strategies__grid" data-reveal style={{ '--i': 1 }}>
            {strategies.options.map((option) => (
              <article className="strategy" key={option.title}>
                <p className="strategy__kicker">{option.kicker}</p>
                <h3 className="strategy__title">{option.title}</h3>
                <p className="strategy__body">{option.body}</p>
                <ul className="strategy__lines">
                  {option.lines.map((line) => (
                    <li className="strategy__line" key={line.cohort}>
                      <span className="strategy__cohort">{line.cohort}</span>
                      <span className="strategy__result">{line.result}</span>
                      <span className="strategy__delta">{line.delta}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="strategies__payback" data-reveal style={{ '--i': 2 }}>
            {strategies.payback}
          </p>
          <p className="strategies__disclaimer" data-reveal style={{ '--i': 3 }}>
            {strategies.disclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
