import { showcase } from "../data/content";
import { Eyebrow } from "./Ui";

// Video showcase. Renders nothing until a source is set in content.ts, so the
// section appears the moment the production file is ready.
export function Showcase() {
  if (!showcase.src) return null;
  return (
    <section className="section section--white showcase" id="video">
      <div className="container">
        <header className="section-head section-head--center" data-reveal>
          <Eyebrow>{showcase.eyebrow}</Eyebrow>
          <h2 className="display-2">{showcase.title}</h2>
        </header>
        <figure className="showcase__frame" data-reveal>
          <video
            className="showcase__video"
            src={showcase.src}
            poster={showcase.poster || undefined}
            controls
            playsInline
            preload="metadata"
          />
          {showcase.caption ? <figcaption className="footnote">{showcase.caption}</figcaption> : null}
        </figure>
      </div>
    </section>
  );
}
