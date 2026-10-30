import { appliedEpicPage as page } from "../data/content";
import { Faq } from "../components/Faq";
import { Grid, GridItem } from "../components/Grid";
import { Section, SectionContent, SectionHeader } from "../components/Section";
import { PageHero } from "../components/Hero";

export function AppliedEpic() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section theme="white" id="who">
        <SectionHeader>
          <h2>{page.who.title}</h2>
          <p className="lead">{page.who.body}</p>
        </SectionHeader>
        <SectionContent className="p-0">
          <Grid columns={3}>
            {page.who.items.map((item) => (
              <GridItem key={item.title}>
                <h3>{item.title}</h3>
              </GridItem>
            ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section theme="blend" id="work">
        <SectionHeader>
          <h2>{page.work.title}</h2>
        </SectionHeader>
        <SectionContent className="p-0">
          <Grid columns={3}>
            {page.work.items.map((item) => (
              <GridItem key={item.title}>
                <h3>{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </GridItem>
            ))}
          </Grid>
        </SectionContent>
      </Section>

      {page.certified && (
        <Section theme="white" id="meaning">
          <SectionHeader>
            <h2>{page.meaning.title}</h2>
          </SectionHeader>
          <SectionContent className="p-0">
            <Grid>
              {page.meaning.items.map((item) => (
                <GridItem key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </GridItem>
              ))}
            </Grid>
          </SectionContent>
        </Section>
      )}

      {page.quote?.text && (
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
      )}

      {/* Set apart from whichever section comes last above. */}
      <Faq faq={page.faq} theme={page.quote?.text || !page.certified ? "white" : "blend"} />
    </>
  );
}
