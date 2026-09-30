import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { useTitle } from "../hooks/useTitle";
import { reveal } from "../lib/style";

export function Security() {
  useTitle("Security and governance", page.lead);
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section tone="white" id="authority">
        <div className="split">
          {page.authority.sides.map((side, i) => (
            <div className="split__col" {...reveal(i)} key={side.title}>
              <h2 className="display-2">{side.title}</h2>
              <ul className="company__facts">
                {side.items.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" id="record" title={page.record.title}>
        <ol className="steps steps--3">
          {page.record.items.map((item, i) => (
            <li className="step" {...reveal(i)} key={item.title}>
              <h3 className="step__title">{item.title}</h3>
              <p className="step__body">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="blend" id="data" title={page.data.title}>
        <ItemGrid variant="card" columns={2} items={page.data.items} />
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
