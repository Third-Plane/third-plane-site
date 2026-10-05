import { companyPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { Display2 } from "../components/Headings";
import { PageHero } from "../components/PageHero";
import { Section, SectionHeader } from "../components/Section";
import { cn, reveal } from "../lib/style";

// The hero is its own export: pages/company.astro puts it in Base's `hero` slot,
// outside <main>.
export function CompanyHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function Company() {
  return (
    <>
      <Section tone="white" id="origin">
        <div className="wrap grid items-start gap-x-17 gap-y-13 md:grid-cols-2">
          <div data-reveal>
            <Display2>{page.origin.title}</Display2>
            {page.origin.body.map((paragraph, i) => (
              <p
                className={cn(
                  "max-w-[58ch] text-pretty",
                  i === 0
                    ? "mt-6 text-base font-medium text-foreground"
                    : "mt-5 text-muted-foreground",
                )}
                key={paragraph.slice(0, 20)}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <figure
            className="relative m-0 aspect-4/3 overflow-hidden rounded-2xl bg-muted"
            {...reveal(1)}
          >
            {page.team.photo.src ? (
              <img
                className="size-full object-cover"
                src={page.team.photo.src}
                alt={page.team.photo.alt}
              />
            ) : (
              <div
                className="absolute inset-0 grid place-items-center rounded-2xl border border-dashed border-border text-sm text-subtle-foreground"
                aria-label={page.team.photoNote}
              >
                <span className="relative z-2 rounded-full bg-muted px-3 py-1.5">
                  {page.team.photoNote}
                </span>
              </div>
            )}
          </figure>
        </div>
      </Section>

      <Section id="principles" tone="blend">
        <SectionHeader title={page.principles.title} />
        <Grid className="wrap">
          {page.principles.items.map((item, i) => (
            <Point key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
