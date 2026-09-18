import { carrierChannelsPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, Eyebrow, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function CarrierChannels() {
  useTitle("Carrier channels", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" />
        <Button variant="ghost" href="/placement-desk">
          See the Placement Desk
        </Button>
      </PageHero>

      <section className="section section--white" id="channels">
        <div className="container">
          <SectionHead eyebrow={page.channels.eyebrow} title={page.channels.title} />
          <div className="grid grid--3">
            {page.channels.items.map((item, i) => (
              <article className="tier" data-reveal style={delayStyle(i)} key={item.title}>
                <p className="tier__kicker">{item.kicker}</p>
                <h3 className="tier__title">{item.title}</h3>
                <p className="tier__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="identity">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container human">
          <div data-reveal>
            <Eyebrow dark>{page.identity.eyebrow}</Eyebrow>
            <h2 className="display-2">{page.identity.title}</h2>
            <p className="human__body">{page.identity.body}</p>
          </div>
          <ul className="human__list human__list--dark" data-reveal style={delayStyle(1)}>
            {page.identity.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--blend" id="coverage">
        <div className="container">
          <SectionHead eyebrow={page.coverage.eyebrow} title={page.coverage.title} body={page.coverage.body} />
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
