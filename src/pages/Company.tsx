import { companyPage as page, horizon } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, Eyebrow, Network, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Company() {
  useTitle("Company");
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" />
        <Button variant="ghost" href="/careers">
          Careers
        </Button>
      </PageHero>

      <section className="section section--white" id="origin">
        <div className="container company">
          <div className="company__copy" data-reveal>
            <Eyebrow>{page.origin.eyebrow}</Eyebrow>
            <h2 className="display-2">{page.origin.title}</h2>
            {page.origin.body.map((paragraph) => (
              <p className="company__para" key={paragraph.slice(0, 20)}>
                {paragraph}
              </p>
            ))}
          </div>
          <figure className="team" data-reveal style={delayStyle(1)}>
            {page.team.photo.src ? (
              <img src={page.team.photo.src} alt={page.team.photo.alt} />
            ) : (
              <div className="team__placeholder" aria-label={page.team.photoNote}>
                <ParticleField tone="purple" alpha={0.8} density={1.2} />
                <span>{page.team.photoNote}</span>
              </div>
            )}
          </figure>
        </div>
      </section>

      <section className="section" id="principles">
        <div className="container">
          <SectionHead eyebrow={page.principles.eyebrow} title={page.principles.title} />
          <div className="grid grid--3">
            {page.principles.items.map((item, i) => (
              <article className="point" data-reveal style={delayStyle(i % 3)} key={item.title}>
                <span className="point__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blend" id="team">
        <div className="container">
          <SectionHead eyebrow={page.team.eyebrow} title={page.team.title} body={page.team.body} />
        </div>
      </section>

      <section className="section section--purple horizon">
        <ParticleField className="section__particles" tone="white" alpha={0.8} density={0.9} />
        <Network className="horizon__network" />
        <div className="container horizon__inner" data-reveal>
          <h2 className="display-2">{horizon.title}</h2>
          <p className="horizon__body">{horizon.body}</p>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
