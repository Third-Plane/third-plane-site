import { appliedEpicPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { PageHero } from "../components/PageHero";
import { Section, SectionHeader } from "../components/Section";

export function AppliedEpic() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section theme="white" id="who">
        <SectionHeader title={page.who.title} body={page.who.body} />
        <Grid columns={3} className="wrap">
          {page.who.items.map((item) => (
            <Point key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
            </Point>
          ))}
        </Grid>
      </Section>

      <Section theme="blend" id="work">
        <SectionHeader title={page.work.title} />
        <Grid columns={3} className="wrap">
          {page.work.items.map((item) => (
            <Point key={item.title}>
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
            {page.meaning.items.map((item) => (
              <Point key={item.title}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemBody>{item.body}</ItemBody>
              </Point>
            ))}
          </Grid>
        </Section>
      ) : null}

      {page.quote?.text ? (
        <Section theme="blend" id="quote">
          <blockquote className="m-0 max-w-[58ch]">
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
