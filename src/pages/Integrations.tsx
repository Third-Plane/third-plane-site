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
        <Button variant="ghost" href="/platform">
          About the platform
        </Button>
      </PageHero>

      <section className="section section--white" id="systems">
        <div className="container">
          <SectionHead eyebrow={page.systems.eyebrow} title={page.systems.title} />
          <div className="grid grid--3">
            {page.systems.items.map((item, i) => (
              <article className="point" data-reveal style={delayStyle(i % 3)} key={item.title}>
                <span className="point__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="how">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container">
          <SectionHead dark eyebrow={page.how.eyebrow} title={page.how.title} />
          <ol className="steps">
            {page.how.steps.map((step, i) => (
              <li className="step" data-reveal style={delayStyle(i)} key={step.title}>
                <span className="step__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
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
