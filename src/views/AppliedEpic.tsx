import { appliedEpicPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { reveal } from "../lib/style";
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
        <Grid columns={3}>
          {page.who.items.map((item, i) => (
            <Point key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
            </Point>
          ))}
        </Grid>
      </Section>

      <Section tone="blend" id="work" title={page.work.title}>
        <Grid columns={3}>
          {page.work.items.map((item, i) => (
            <Point key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>

      {page.certified ? (
        <Section tone="white" id="meaning" title={page.meaning.title}>
          <Grid>
            {page.meaning.items.map((item, i) => (
              <Point key={item.title} {...reveal(i)}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemBody>{item.body}</ItemBody>
              </Point>
            ))}
          </Grid>
        </Section>
      ) : null}

      {page.quote?.text ? (
        <Section tone="blend" id="quote">
          <blockquote className="m-0 max-w-[58ch]" data-reveal>
            <p className="font-heading text-xl font-medium tracking-tight text-pretty text-foreground">
              {page.quote.text}
            </p>
            {page.quote.attribution ? (
              <footer className="mt-4 text-sm text-subtle-foreground">
                {page.quote.attribution}
              </footer>
            ) : null}
          </blockquote>
        </Section>
      ) : null}

      <Cta {...page.cta} />
    </>
  );
}
