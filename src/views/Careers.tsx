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
          <ul className="roles" data-reveal>
            {page.roles.items.map((role) => (
              <li key={role.href}>
                <AppLink className="role" href={role.href}>
                  <span className="role__title">{role.title}</span>
                  <span className="role__meta">
                    {role.team} · {role.location}
                  </span>
                  <Arrow className="role__arrow" />
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="roles__empty" data-reveal>
            {page.roles.empty}
          </p>
        )}
      </Section>

      <Section tone="white" id="why" title={page.why.title}>
        <ItemGrid variant="point" columns={4} items={page.why.items} />
      </Section>

      <Cta {...page.cta} href={site.mailto} />
    </>
  );
}
