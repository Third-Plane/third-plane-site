import { placementDesk } from "../data/content";
import { delayStyle } from "../lib/style";
import { CardMark, SectionHead } from "./Ui";

const channelMarks = ["portal", "api", "mail"] as const;

// The three ways the desk reaches a carrier: portal, API and underwriter
// email. Shown on /placement-desk and /integrations; the copy lives in
// placement-desk.json under `channels`.
export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <section className="section section--blend" id="channels">
      <div className="container">
        <SectionHead title={channels.title} body={channels.body} />
        <div className="grid grid--3">
          {channels.items.map((item, i) => (
            <article className="card" data-reveal style={delayStyle(i)} key={item.title}>
              <CardMark name={channelMarks[i]} variant="wide" />
              <h3 className="card__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
