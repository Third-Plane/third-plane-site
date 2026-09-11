import { underwritingDesk as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, Eyebrow, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function UnderwritingDesk() {
  useTitle("Underwriting Desk");
  return (
    <>
      <PageHero crumb={page.crumb} status={page.status} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" />
        <Button variant="ghost" href="/placement-desk">
          See the Placement Desk
        </Button>
      </PageHero>

      <section className="section section--deep" id="work">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container">
          <SectionHead dark eyebrow={page.work.eyebrow} title={page.work.title} />
          <ol className="steps steps--3">
            {page.work.steps.map((step, i) => (
              <li className="step" data-reveal style={delayStyle(i % 3)} key={step.title}>
                <span className="step__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="human">
        <div className="container human">
          <div data-reveal>
            <Eyebrow>{page.human.eyebrow}</Eyebrow>
            <h2 className="display-2">{page.human.title}</h2>
            <p className="company__para">{page.status_note}</p>
          </div>
          <ul className="human__list" data-reveal style={delayStyle(1)}>
            {page.human.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
