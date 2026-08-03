import { cta, site } from '../content'
import { Button, Eyebrow } from './ui'

export default function Cta() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta__shell" data-reveal>
          <Eyebrow>{cta.eyebrow}</Eyebrow>
          <h2 className="display-2">{cta.title}</h2>
          <p className="lead">{cta.body}</p>
          <Button />
          <ul className="mono cta__meta">
            <li>
              <a href={site.mailto}>{site.email}</a>
            </li>
            {cta.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
