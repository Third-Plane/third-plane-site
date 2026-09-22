import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { ParticleField } from "../components/ParticleField";
import { Button, SectionHead } from "../components/Ui";
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
          <div className="split">
            {page.authority.sides.map((side, i) => (
              <div
                className="split__col"
                data-reveal
                style={delayStyle(i)}
                key={side.title}
              >
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
        </div>
      </section>

      <section className="section section--deep" id="record">
        <ParticleField
          className="section__particles"
          tone="cream"
          alpha={0.75}
          density={0.8}
        />
        <div className="container">
          <SectionHead dark title={page.record.title} />
          <ol className="audit">
            {page.record.items.map((item, i) => (
              <li
                className="audit__row"
                data-reveal
                style={delayStyle(i)}
                key={item.title}
              >
                <p className="audit__title">{item.title}</p>
                <p className="audit__body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--blend" id="data">
        <div className="container coverage">
          <h2 className="display-2" data-reveal>
            {page.data.title}
          </h2>
          <ul className="company__facts" data-reveal style={delayStyle(1)}>
            {page.data.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
