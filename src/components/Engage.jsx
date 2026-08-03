import { engage } from '../content'
import { SectionHead } from './ui'

export default function Engage() {
  return (
    <section className="section" id="engage">
      <div className="container">
        <SectionHead eyebrow={engage.eyebrow} title={engage.title} body={engage.body} />

        <ol className="grid grid--4">
          {engage.steps.map((step, i) => (
            <li className="card step" key={step.index} data-reveal style={{ '--i': i }}>
              <p className="step__index">{step.index}</p>
              <h3 className="card__title">{step.title}</h3>
              <p className="card__body">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="engage__timeline" data-reveal style={{ '--i': 4 }}>
          {engage.timeline}
        </p>
      </div>
    </section>
  )
}
