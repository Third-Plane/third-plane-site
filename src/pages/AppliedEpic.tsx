import { appliedEpicPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { useTitle } from "../hooks/useTitle";

export function AppliedEpic() {
  const title = page.certified ? page.title : page.titlePending;
  const status = [page.status, page.date].filter(Boolean).join(" · ");
  useTitle("Applied Epic", page.lead);

  return (
    <>
      <PageHero title={title} lead={page.lead} status={page.certified ? status : undefined} />

      <Section tone="white" id="who" title={page.who.title} body={page.who.body}>
        <ItemGrid variant="point" columns={3} items={page.who.items} />
      </Section>

      <Section tone="blend" id="work" title={page.work.title}>
        <ItemGrid variant="point" columns={3} items={page.work.items} />
      </Section>

      {page.certified ? (
        <Section tone="white" id="meaning" title={page.meaning.title}>
          <ItemGrid variant="point" columns={2} items={page.meaning.items} />
        </Section>
      ) : null}

      {page.quote?.text ? (
        <Section tone="blend" id="quote">
          <blockquote className="applied-quote" data-reveal>
            <p>{page.quote.text}</p>
            {page.quote.attribution ? <footer>{page.quote.attribution}</footer> : null}
          </blockquote>
        </Section>
      ) : null}

      <Cta {...page.cta} />
    </>
  );
}
