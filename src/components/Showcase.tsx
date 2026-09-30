import { showcase } from "../data/content";
import { Section } from "./Section";

// Video showcase. Renders nothing until a video is set (home.json, showcase), so the
// section appears the moment the production file is ready.
export function Showcase() {
  if (!showcase.src) return null;
  return (
    <Section tone="white" className="showcase" id="video" title={showcase.title} align="center">
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
    </Section>
  );
}
