import { careersPage as page, site } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Arrow, AppLink } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Careers() {
  useTitle("Careers", page.lead);
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
        <div className="grid grid--4">
          {page.why.items.map((item, i) => (
            <article className="point" data-reveal style={delayStyle(i)} key={item.title}>
              <h3 className="point__title">{item.title}</h3>
              <p className="point__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Cta title={page.cta.title} body={page.cta.body} href={site.mailto} />
    </>
  );
}
