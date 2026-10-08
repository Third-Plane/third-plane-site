import { careersPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { Section, SectionHeader } from "../components/Section";
import { SplitHero } from "../components/SplitHero";
import { Arrow, AppLink } from "../components/Ui";

// The hero is its own export: pages/careers.astro puts it in Base's `hero` slot.
// The open roles sit beside the copy, in a panel like the other heroes' ledger.
export function CareersHero() {
  return (
    <SplitHero title={page.title.join(" ")} lead={page.lead}>
      <div
        className="rounded-2xl border border-border/50 bg-card px-6 pt-6 pb-2 shadow-2xl"
        id="roles"
      >
        <h2 className="border-b border-b-border/50 pb-4 font-heading text-lg font-medium tracking-tight text-foreground">
          {page.roles.title}
        </h2>
        {page.roles.items.length ? (
          <ul>
            {page.roles.items.map((role) => (
              <li className="border-b border-b-border/50 last:border-b-0" key={role.href}>
                <AppLink
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 py-4 text-foreground"
                  href={role.href}
                >
                  <span className="font-heading text-xl font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
                    {role.title}
                  </span>
                  <Arrow className="row-span-2 size-4.5 text-accent transition-transform duration-200 group-hover:translate-x-0.75" />
                  <span className="text-sm text-subtle-foreground">
                    {role.team} · {role.location}
                  </span>
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-4 text-base text-foreground">{page.roles.empty}</p>
        )}
      </div>
    </SplitHero>
  );
}

export function Careers() {
  return (
    <Section theme="blend" id="why">
      <SectionHeader title={page.why.title} />
      <Grid columns={4} className="wrap">
        {page.why.items.map((item) => (
          <Point key={item.title}>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemBody>{item.body}</ItemBody>
          </Point>
        ))}
      </Grid>
    </Section>
  );
}
