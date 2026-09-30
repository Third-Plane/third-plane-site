import { companyPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Company() {
  useTitle("Company", page.lead);
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section tone="white" id="origin" containerClassName="company">
        <div className="company__copy" data-reveal>
          <h2 className="display-2">{page.origin.title}</h2>
          {page.origin.body.map((paragraph) => (
            <p className="company__para" key={paragraph.slice(0, 20)}>
              {paragraph}
            </p>
          ))}
        </div>
        <figure className="team" data-reveal style={delayStyle(1)}>
          {page.team.photo.src ? (
            <img src={page.team.photo.src} alt={page.team.photo.alt} />
          ) : (
            <div className="team__placeholder" aria-label={page.team.photoNote}>
              <span>{page.team.photoNote}</span>
            </div>
          )}
        </figure>
      </Section>

      <Section id="principles" title={page.principles.title}>
        <ItemGrid variant="point" columns={2} items={page.principles.items} />
      </Section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
