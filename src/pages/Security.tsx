import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, Eyebrow, SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function Security() {
  useTitle("Security and governance", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} body={page.body}>
        <Button variant="dark" />
      </PageHero>

      <section className="section section--white" id="authority">
        <div className="container">
          <SectionHead eyebrow={page.authority.eyebrow} title={page.authority.title} />
          <div className="grid grid--4">
            {page.authority.items.map((item, i) => (
              <article className="point" data-reveal style={delayStyle(i)} key={item.title}>
                <span className="point__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="point__title">{item.title}</h3>
                <p className="point__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep" id="record">
        <ParticleField className="section__particles" tone="cream" alpha={0.75} density={0.8} />
        <div className="container">
          <SectionHead dark eyebrow={page.record.eyebrow} title={page.record.title} />
          <ol className="steps steps--3">
            {page.record.items.map((item, i) => (
              <li className="step" data-reveal style={delayStyle(i)} key={item.title}>
                <span className="step__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__title">{item.title}</h3>
                <p className="step__body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--blend" id="data">
        <div className="container">
          <SectionHead eyebrow={page.data.eyebrow} title={page.data.title} />
          <div className="grid grid--4">
            {page.data.items.map((item, i) => (
              <article className="card" data-reveal style={delayStyle(i)} key={item.title}>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="human">
        <div className="container human">
          <div data-reveal>
            <Eyebrow>{page.human.eyebrow}</Eyebrow>
            <h2 className="display-2">{page.human.title}</h2>
          </div>
          <ul className="human__list" data-reveal style={delayStyle(1)}>
            {page.human.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
