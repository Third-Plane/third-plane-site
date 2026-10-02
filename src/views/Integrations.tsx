import { integrationsPage as page } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { StepList } from "../components/StepList";
import { AppLink } from "../components/Ui";
import { reveal } from "../lib/style";

// The hero is its own export: pages/integrations.astro puts it in Base's `hero` slot,
// outside <main>.
export function IntegrationsHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function Integrations() {
  return (
    <>
      <Section tone="white" id="systems" title={page.systems.title}>
        <div className="border-t border-t-line">
          {page.systems.items.slice(0, 4).map((item, i) => (
            <article
              className="grid items-start gap-3 border-b border-b-line-soft py-8 md:grid-cols-4 md:gap-10"
              {...reveal(i)}
              key={item.title}
            >
              <h3 className="font-heading text-2xl leading-tight font-medium tracking-tight text-balance text-ink">
                {item.title}
              </h3>
              <div className="grid max-w-[62ch] justify-items-start gap-4 md:col-span-3">
                <p className="text-base text-pretty text-ink-body">
                  {item.link || item.names ? (
                    <>
                      <strong className="font-semibold text-ink">
                        {item.link ? (
                          <AppLink
                            className="underline-offset-[0.15em] hover:text-purple"
                            href={item.link.href}
                          >
                            {item.link.label}
                          </AppLink>
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
        <StepList columns={4} numbered steps={page.how.steps} />
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
