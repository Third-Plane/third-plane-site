import { company, horizon } from '../content'
import { Eyebrow, PlaneNetwork } from './ui'

export default function Company() {
  return (
    <>
      <section className="section" id="company">
        <div className="container company">
          <div className="company__copy" data-reveal>
            <Eyebrow>{company.eyebrow}</Eyebrow>
            <h2 className="display-2">{company.title}</h2>
            {company.body.map((paragraph) => (
              <p className="company__para" key={paragraph.slice(0, 20)}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="company__facts" data-reveal style={{ '--i': 1 }}>
            {company.facts.map((fact) => (
              <li key={fact.title}>
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--purple horizon">
        <PlaneNetwork className="horizon__network" />
        <div className="container horizon__inner" data-reveal>
          <h2 className="display-2">{horizon.title}</h2>
          <p className="horizon__body">{horizon.body}</p>
        </div>
      </section>
    </>
  )
}
