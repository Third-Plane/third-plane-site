import { careersPage as page, site } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { Arrow, Button, Eyebrow, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Careers() {
  useTitle("Careers", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" href="/careers#roles">
          See open roles
        </Button>
        <Button variant="ghost" href={site.careersMailto}>
          Write to us
        </Button>
      </PageHero>

      <section className="section section--white" id="why">
        <div className="container">
          <SectionHead eyebrow={page.why.eyebrow} title={page.why.title} />
          <div className="grid grid--4">
            {page.why.items.map((item, i) => (
              <article className="point" data-reveal style={delayStyle(i)} key={item.title}>
                <span className="point__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container human">
          <div data-reveal>
            <Eyebrow>{page.how.eyebrow}</Eyebrow>
            <h2 className="display-2">{page.how.title}</h2>
          </div>
          <ul className="human__list human__list--prose" data-reveal style={delayStyle(1)}>
            {page.how.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--blend" id="roles">
        <div className="container">
          <SectionHead eyebrow={page.roles.eyebrow} title={page.roles.title} />
          {page.roles.items.length ? (
            <ul className="roles" data-reveal>
              {page.roles.items.map((role) => (
                <li key={role.title}>
                  <a className="role" href={role.href}>
                    <span className="role__title">{role.title}</span>
                    <span className="role__meta">
                      {role.team} · {role.location}
                    </span>
                    <Arrow className="role__arrow" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="roles__empty" data-reveal>
              {page.roles.empty}
            </p>
          )}
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} email={site.careersEmail} />
    </>
  );
}
