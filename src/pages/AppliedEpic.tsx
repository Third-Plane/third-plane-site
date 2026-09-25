import { appliedEpicPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { delayStyle } from "../lib/style";
import { useTitle } from "../hooks/useTitle";

function PointGrid({
  items,
  columns = 3,
}: {
  items: Array<{ title: string; body?: string }>;
  columns?: 2 | 3 | 4;
}) {
  return (
    <div className={`grid grid--${columns}`}>
      {items.map((item, i) => (
        <article
          className="point"
          data-reveal
          style={delayStyle(i)}
          key={item.title}
        >
          <h3 className="point__title">{item.title}</h3>
          {item.body ? <p className="point__body">{item.body}</p> : null}
        </article>
      ))}
    </div>
  );
}

export function AppliedEpic() {
  const title = page.certified ? page.title : page.titlePending;
  const status = [page.status, page.date].filter(Boolean).join(" · ");
  useTitle("Applied Epic", page.lead);

  return (
    <>
      <PageHero
        title={title}
        lead={page.lead}
        status={page.certified ? status : undefined}
      />

      <section className="section section--white" id="who">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 className="display-2">{page.who.title}</h2>
            <p className="lead">{page.who.body}</p>
          </div>
          <PointGrid items={page.who.items} />
        </div>
      </section>

      <section className="section section--blend" id="work">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 className="display-2">{page.work.title}</h2>
          </div>
          <PointGrid items={page.work.items} />
        </div>
      </section>

      {page.certified ? (
        <section className="section section--white" id="meaning">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 className="display-2">{page.meaning.title}</h2>
            </div>
            <PointGrid items={page.meaning.items} columns={2} />
          </div>
        </section>
      ) : null}

      {page.quote.text ? (
        <section className="section section--blend" id="quote">
          <div className="container">
            <blockquote className="applied-quote" data-reveal>
              <p>{page.quote.text}</p>
              {page.quote.attribution ? (
                <footer>{page.quote.attribution}</footer>
              ) : null}
            </blockquote>
          </div>
        </section>
      ) : null}

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
