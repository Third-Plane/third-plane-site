import { capacity } from '../content'
import { SectionHead } from './ui'

export default function Capacity() {
  return (
    <section className="section section--white" id="problem">
      <div className="container">
        <SectionHead eyebrow={capacity.eyebrow} title={capacity.title} body={capacity.body} />

        <div className="grid grid--3">
          {capacity.points.map((point, i) => (
            <article className="point" key={point.title} data-reveal style={{ '--i': i }}>
              <span className="point__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="point__title">{point.title}</h3>
              <p className="point__body">{point.body}</p>
            </article>
          ))}
        </div>

        <p className="closing" data-reveal>
          {capacity.closing}
        </p>
      </div>
    </section>
  )
}
