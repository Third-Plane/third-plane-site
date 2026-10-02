import { careersPage as page, site } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Arrow, AppLink } from "../components/Ui";

// The hero is its own export: pages/careers.astro puts it in Base's `hero` slot,
// outside <main>.
export function CareersHero() {
  return <PageHero family="careers" title={page.title} lead={page.lead} />;
}

export function Careers() {
  return (
    <>
      <Section id="roles" title={page.roles.title}>
        {page.roles.items.length ? (
          <ul className="grid gap-3" data-reveal>
            {page.roles.items.map((role) => (
              <li key={role.href}>
                <AppLink
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-6 rounded-2xl bg-white px-7 py-5 text-ink shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                  href={role.href}
                >
                  <span className="font-heading text-xl font-medium tracking-tight">
                    {role.title}
                  </span>
                  <span className="text-sm text-ink-muted">
                    {role.team} · {role.location}
                  </span>
                  <Arrow className="size-4.5 text-purple" />
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-base text-ink" data-reveal>
            {page.roles.empty}
          </p>
        )}
      </Section>

      <Section tone="white" id="why" title={page.why.title} compactHead>
        <ItemGrid variant="point" spaced columns={4} items={page.why.items} />
      </Section>

      <Cta {...page.cta} href={site.mailto} />
    </>
  );
}
