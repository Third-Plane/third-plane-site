import { deskOverview } from '../content'
import { ArrowRight, SectionHead, TextLink } from './ui'

export default function DeskOverview() {
  return (
    <section className="section section--white" id="desk">
      <div className="container">
        <SectionHead eyebrow={deskOverview.eyebrow} title={deskOverview.title} body={deskOverview.body} />

        <div className="flow" data-reveal>
          {deskOverview.columns.map((col, i) => (
            <div className={col.accent ? 'flow__col flow__col--accent' : 'flow__col'} key={col.kicker}>
              {i > 0 ? <ArrowRight className="flow__arrow" /> : null}
              <p className="flow__kicker">{col.kicker}</p>
              <ul className="flow__list">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flow__foot" data-reveal>
          <p className="closing closing--left">{deskOverview.closing}</p>
          <TextLink href={deskOverview.cta.href}>{deskOverview.cta.label}</TextLink>
        </div>
      </div>
    </section>
  )
}
