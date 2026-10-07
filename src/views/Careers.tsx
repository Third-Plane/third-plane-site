import { careersPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { reveal } from "../lib/style";
import { PageHero } from "../components/PageHero";
import { Section, SectionHeader } from "../components/Section";
import { Arrow, AppLink } from "../components/Ui";

// The hero is its own export: pages/careers.astro puts it in Base's `hero` slot.
export function CareersHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function Careers() {
  return (
    <>
      <Section id="roles" tone="white">
        <SectionHeader title={page.roles.title} />
        {page.roles.items.length ? (
          <ul className="wrap grid gap-3" data-reveal>
            {page.roles.items.map((role) => (
              <li key={role.href}>
                <AppLink
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-6 rounded-2xl bg-card px-7 py-5 text-foreground shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                  href={role.href}
                >
                  <span className="font-heading text-xl font-medium tracking-tight">
                    {role.title}
                  </span>
                  <span className="text-sm text-subtle-foreground">
                    {role.team} · {role.location}
                  </span>
                  <Arrow className="size-4.5 text-accent" />
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-base text-foreground" data-reveal>
            {page.roles.empty}
          </p>
        )}
      </Section>

      <Section tone="blend" id="why">
        <SectionHeader title={page.why.title} />
        <Grid columns={4} className="wrap">
          {page.why.items.map((item, i) => (
            <Point key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>
    </>
  );
}
