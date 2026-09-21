import { integrationsPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Integrations() {
  useTitle("System integrations", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" />
      </PageHero>

      <section className="section section--white" id="systems">
        <div className="container">
          <SectionHead title={page.systems.title} />
          <div className="fit">
            {page.systems.items.slice(0, 4).map((item, i) => (
              <article
                className="fit__row"
                data-reveal
                style={delayStyle(i)}
                key={item.title}
              >
                <div className="fit__sys">
                  <h3 className="fit__label">{item.title}</h3>
                  {item.names ? <p className="fit__names">{item.names}</p> : null}
                </div>
                <div className="fit__copy">
                  <p className="fit__body">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="how">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container">
          <SectionHead dark title={page.how.title} />
          <ol className="process" data-reveal>
            {page.how.steps.map((step, i) => (
              <li className="process__node" key={step.title}>
                <span className="process__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="process__title">{step.title}</h3>
                  <p className="process__note">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="footnote footnote--dark" data-reveal>
            {page.note}
          </p>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
