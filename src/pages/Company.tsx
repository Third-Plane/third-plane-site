import { companyPage as page, desk } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Company() {
  useTitle("Company", page.lead);
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
            <h2 className="display-2">{page.origin.title}</h2>
            {page.origin.body.map((paragraph) => (
              <p className="company__para" key={paragraph.slice(0, 20)}>
                {paragraph}
              </p>
            ))}
            <ul className="company__facts company__facts--inline">
              {page.origin.facts.map((fact) => (
                <li key={fact.title}>
                  <h3>{fact.title}</h3>
                  <p>{fact.body}</p>
                </li>
              ))}
            </ul>
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
          <SectionHead title={page.principles.title} />
          <div className="grid grid--3">
            {page.principles.items.map((item, i) => (
              <article className="point" data-reveal style={delayStyle(i % 3)} key={item.title}>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blend" id="team">
        <div className="container">
          <SectionHead title={page.team.title} body={page.team.body} />
        </div>
      </section>

      <section className="section" id="next">
        <div className="container">
          <div className="desk-next desk-next--page" data-reveal>
            <p className="status-pill">{desk.next.status}</p>
            <h2 className="display-2">{desk.next.title}</h2>
            <p className="lead">{desk.next.body}</p>
          </div>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
