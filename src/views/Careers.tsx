import { careersPage as page, site } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Arrow, AppLink } from "../components/Ui";

export function Careers() {
  return (
    <>
      <PageHero family="careers" title={page.title} lead={page.lead} />

      <Section id="roles" title={page.roles.title}>
        {page.roles.items.length ? (
          <ul className="grid gap-3" data-reveal>
            {page.roles.items.map((role) => (
              <li key={role.href}>
                <AppLink
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-6 rounded-card bg-white px-(--pad) py-5 text-ink shadow-card transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  href={role.href}
                >
                  <span className="font-heading text-title font-medium tracking-head">
                    {role.title}
                  </span>
                  <span className="text-[0.9rem] text-ink-muted">
                    {role.team} · {role.location}
                  </span>
                  <Arrow className="size-4.5 text-purple" />
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-copy text-ink" data-reveal>
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
