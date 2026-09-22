import { carrierChannelsPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { SectionHead } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

export function CarrierChannels() {
  useTitle("Carrier channels", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} />

      <section className="section section--white" id="channels">
        <div className="container">
          <SectionHead title={page.channels.title} />
          <div className="grid grid--3">
            {page.channels.items.map((item, i) => (
              <article className="tier" data-reveal style={delayStyle(i)} key={item.title}>
                <p className="tier__kicker">{item.kicker}</p>
                <h3 className="tier__title">{item.title}</h3>
                <p className="tier__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blend" id="coverage">
        <div className="container">
          <SectionHead title={page.coverage.title} body={page.coverage.body} />
        </div>
      </section>

      <Cta title={page.cta.title} body={page.cta.body} />
    </>
  );
}
