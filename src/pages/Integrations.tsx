import { integrationsPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { AppLink, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Integrations() {
  useTitle("System integrations", page.lead);
  return (
    <>
      <PageHero title={page.title} lead={page.lead} body={page.body} />

      <section className="section section--white" id="systems">
        <div className="container">
          <SectionHead title={page.systems.title} />
          <div className="fit">
            {page.systems.items.slice(0, 4).map((item, i) => (
              <article className="fit__row" data-reveal style={delayStyle(i)} key={item.title}>
                <div className="fit__sys">
                  <h3 className="fit__label">{item.title}</h3>
                </div>
                <div className="fit__copy">
                  <p className="fit__body">
                    {item.link || item.names ? (
                      <>
                        <strong className="fit__inline-names">
                          {item.link ? (
                            <AppLink href={item.link.href}>{item.link.label}</AppLink>
                          ) : null}
                          {item.link && item.names ? ", " : null}
                          {item.names ?? null}
                        </strong>
                        {". "}
                      </>
                    ) : null}
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="how">
        <div className="container">
          <SectionHead dark title={page.how.title} />
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
