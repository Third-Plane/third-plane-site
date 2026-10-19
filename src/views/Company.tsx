import { companyPage as page } from "../data/content";
import { Grid, ItemBody, ItemTitle, Point } from "../components/Grid";
import { Section, SectionHeader } from "../components/Section";
import { Arrow, AppLink } from "../components/Ui";
import { cn } from "../lib/style";
import { SplitHero } from "../components/Hero";

export function Company() {
  return (
    <>
      <SplitHero title={page.title} lead={page.lead}>
        <div
          className="rounded-2xl border border-border/50 bg-card px-6 pt-6 pb-2 shadow-2xl"
          id="roles"
        >
          <h2 className="border-b border-b-border/50 pb-4 text-lg">{page.roles.title}</h2>
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

      <Section theme="white" id="why">
        <SectionHeader>
          <h2>{page.why.title}</h2>
        </SectionHeader>
        <Grid columns={4}>
          {page.why.items.map((item) => (
            <Point key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>

      <Section theme="blend" id="origin">
        <div className="wrap grid items-start gap-x-17 gap-y-13 md:grid-cols-2">
          <div>
            <h2>{page.origin.title}</h2>
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
          <figure className="relative m-0 aspect-4/3 overflow-hidden rounded-2xl bg-muted">
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

      <Section id="principles" theme="white">
        <SectionHeader>
          <h2>{page.principles.title}</h2>
        </SectionHeader>
        <Grid>
          {page.principles.items.map((item) => (
            <Point key={item.title}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </Point>
          ))}
        </Grid>
      </Section>
    </>
  );
}
