import { integrationsPage as page } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { AppLink } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { reveal } from "../lib/style";

export function Integrations() {
  useTitle("System integrations", page.lead);
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section tone="white" id="systems" title={page.systems.title}>
        <div className="fit">
          {page.systems.items.slice(0, 4).map((item, i) => (
            <article className="fit__row" {...reveal(i)} key={item.title}>
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
      </Section>

      <CarrierChannels />

      <Section tone="deep" id="how" title={page.how.title}>
        <ol className="steps">
          {page.how.steps.map((step, i) => (
            <li className="step" {...reveal(i)} key={step.title}>
              <span className="step__index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
