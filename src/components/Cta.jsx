import { cta, site } from '../content'
import { Button, DotField } from './ui'

export default function Cta({ title = cta.title, body = cta.body }) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta" data-reveal>
          <DotField className="cta__dots" id="cta-dots" direction="right" />
          <div className="cta__inner">
            <h2 className="display-2">{title}</h2>
            <p className="cta__body">{body}</p>
            <div className="cta__actions">
              <Button variant="dark" />
              <a className="cta__email" href={site.mailto}>
                {site.email}
              </a>
            </div>
            <ul className="cta__meta">
              {cta.meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
