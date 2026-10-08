import { appliedEpicPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { reveal } from "../lib/style";
import { PageHero } from "../components/PageHero";
import { Section, SectionHeader } from "../components/Section";

// The hero is its own export: pages/applied-epic.astro puts it in Base's `hero`
// slot.
export function AppliedEpicHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function AppliedEpic() {
  return (
    <>
      <Section theme="white" id="who">
        <SectionHeader title={page.who.title} body={page.who.body} />
        <Grid columns={3} className="wrap">
          {page.who.items.map((item, i) => (
            <Point key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
            </Point>
          ))}
        </Grid>
      </Section>

      <Section theme="blend" id="work">
        <SectionHeader title={page.work.title} />
        <Grid columns={3} className="wrap">
          {page.work.items.map((item, i) => (
            <Point key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>

      {page.certified ? (
        <Section theme="white" id="meaning">
          <SectionHeader title={page.meaning.title} />
          <Grid className="wrap">
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
        <Section theme="blend" id="quote">
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
    </>
  );
}
