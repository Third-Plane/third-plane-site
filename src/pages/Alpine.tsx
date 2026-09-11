import { alpinePage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Arrow, Button, Eyebrow, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Alpine() {
  useTitle("Platform", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" />
        <Button variant="ghost" href="/security">
          Security and governance
        </Button>
      </PageHero>

      <section className="section section--white" id="layers">
        <div className="container">
          <SectionHead eyebrow={page.layers.eyebrow} title={page.layers.title} />
          <div className="grid grid--4">
            {page.layers.items.map((item, i) => (
              <article className="point" data-reveal style={delayStyle(i)} key={item.title}>
                <span className="point__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="architecture">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container">
          <SectionHead dark eyebrow={page.architecture.eyebrow} title={page.architecture.title} />
          <div className="flow flow--dark" data-reveal>
            {page.architecture.columns.map((column, i) => (
              <div className={column.accent ? "flow__col flow__col--accent" : "flow__col"} key={column.kicker}>
                {i > 0 ? <Arrow className="flow__arrow" /> : null}
                <p className="flow__kicker">{column.kicker}</p>
                <ul className="flow__list">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="footnote footnote--dark" data-reveal>
            {page.architecture.note}
          </p>
        </div>
      </section>

      <section className="section" id="proven">
        <div className="container company">
          <div className="company__copy" data-reveal>
            <Eyebrow>{page.real.eyebrow}</Eyebrow>
            <h2 className="display-2">{page.real.title}</h2>
            <p className="company__para">{page.real.body}</p>
          </div>
          <ul className="company__facts" data-reveal style={delayStyle(1)}>
            {page.real.facts.map((fact) => (
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
