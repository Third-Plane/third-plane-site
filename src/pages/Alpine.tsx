import { alpinePage as page, securityPage } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { TextLink } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

const delivery = page.real.facts.filter(
  (fact) => fact.title !== "Every action recorded",
);

export function Alpine() {
  useTitle("Platform", page.lead);
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <section className="section section--white" id="proven">
        <div className="container company">
          <div className="company__copy" data-reveal>
            <h2 className="display-2">{page.real.title}</h2>
            <p className="company__para">{page.real.body}</p>
            <TextLink href="/security">{securityPage.crumb}</TextLink>
          </div>
          <ul className="company__facts" data-reveal style={delayStyle(1)}>
            {delivery.map((fact) => (
              <li key={fact.title}>
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
