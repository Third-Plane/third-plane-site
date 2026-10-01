import { showcase } from "../data/content";
import { Section } from "./Section";

// Video showcase. Renders nothing until a video is set (home.json, showcase), so the
// section appears the moment the production file is ready.
export function Showcase() {
  if (!showcase.src) return null;
  return (
    <Section tone="white" id="video" title={showcase.title} align="center">
      <figure className="m-0 grid justify-items-center gap-4" data-reveal>
        <video
          className="aspect-video w-full max-w-[1040px] rounded-card bg-deep shadow-lg"
          src={showcase.src}
          poster={showcase.poster || undefined}
          controls
          playsInline
          preload="metadata"
        />
        {showcase.caption ? (
          <figcaption className="mt-8 text-copy text-ink-muted">{showcase.caption}</figcaption>
        ) : null}
      </figure>
    </Section>
  );
}
