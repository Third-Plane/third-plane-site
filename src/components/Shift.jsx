import { Fragment } from 'react'
import { shift } from '../content'
import { ArrowRight, DotField, SectionHead } from './ui'

/* The two operating models drawn as chains. The tool model ends at a task the
   person still owns; the Third Plane model ends at a completed outcome. */
export default function Shift() {
  return (
    <section className="section section--deep" id="approach">
      <DotField className="section__dots" id="shift-dots" direction="up" />
      <div className="container">
        <SectionHead dark eyebrow={shift.eyebrow} title={shift.title} body={shift.body} />

        <div className="models">
          {shift.models.map((model, i) => (
            <div className={model.accent ? 'model model--accent' : 'model'} key={model.kicker} data-reveal style={{ '--i': i }}>
              <p className="model__kicker">{model.kicker}</p>
              <div className="model__chain" role="list">
                {model.chain.map((step, j) => (
                  <Fragment key={step}>
                    {j > 0 ? <ArrowRight className="model__arrow" /> : null}
                    <span className="model__step" role="listitem">
                      {step}
                    </span>
                  </Fragment>
                ))}
              </div>
              <p className="model__note">{model.note}</p>
            </div>
          ))}
        </div>

        <div className="definition" data-reveal>
          <p className="definition__kicker">{shift.definition.kicker}</p>
          <ul className="definition__list">
            {shift.definition.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
