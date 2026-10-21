import { appliedEpicPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { Section, SectionHeader } from "../components/Section";
import { PageHero } from "../components/Hero";

export function AppliedEpic() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section theme="white" id="who">
        <SectionHeader>
          <h2>{page.who.title}</h2>
          <h3 className="lead">{page.who.body}</h3>
        </SectionHeader>
        <Grid columns={3}>
          {page.who.items.map((item) => (
            <Point key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
            </Point>
          ))}
        </Grid>
      </Section>

      <Section theme="blend" id="work">
        <SectionHeader>
          <h2>{page.work.title}</h2>
        </SectionHeader>
        <Grid columns={3}>
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
          <SectionHeader>
            <h2>{page.meaning.title}</h2>
          </SectionHeader>
          <Grid>
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
