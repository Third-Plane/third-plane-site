import { appliedEpicPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
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
        <article className="point" data-reveal style={delayStyle(i)} key={item.title}>
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
      <PageHero title={title} lead={page.lead} status={page.certified ? status : undefined} />

      <Section tone="white" id="who" title={page.who.title} body={page.who.body}>
        <PointGrid items={page.who.items} />
      </Section>

      <Section tone="blend" id="work" title={page.work.title}>
        <PointGrid items={page.work.items} />
      </Section>

      {page.certified ? (
        <Section tone="white" id="meaning" title={page.meaning.title}>
          <PointGrid items={page.meaning.items} columns={2} />
        </Section>
      ) : null}

      {page.quote?.text ? (
        <Section tone="blend" id="quote">
          <blockquote className="applied-quote" data-reveal>
            <p>{page.quote.text}</p>
            {page.quote.attribution ? <footer>{page.quote.attribution}</footer> : null}
          </blockquote>
        </Section>
      ) : null}

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
