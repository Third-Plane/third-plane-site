import { appliedEpicPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";

// The hero is its own export: pages/applied-epic.astro puts it in Base's `hero`
// slot, outside <main>.
export function AppliedEpicHero() {
  const title = page.certified ? page.title : page.titlePending;
  const status = [page.status, page.date].filter(Boolean).join(" · ");

  return <PageHero title={title} lead={page.lead} status={page.certified ? status : undefined} />;
}

export function AppliedEpic() {
  return (
    <>
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
          <blockquote className="m-0 max-w-[58ch]" data-reveal>
            <p className="font-heading text-title font-medium tracking-head text-pretty text-ink">
              {page.quote.text}
            </p>
            {page.quote.attribution ? (
              <footer className="mt-4 text-label text-ink-muted">{page.quote.attribution}</footer>
            ) : null}
          </blockquote>
        </Section>
      ) : null}

      <Cta {...page.cta} />
    </>
  );
}
