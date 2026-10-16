import { showcase } from "../data/content";
import { Section } from "./Section";

// Video showcase. Renders nothing until a video is set (home.json, showcase), so the
// section appears the moment the production file is ready. The only centred
// section heading, so it sets its own rather than using SectionHeader.
export function Showcase() {
  if (!showcase.src) return null;
  return (
    <Section theme="white" id="video">
      <header className="mx-auto mb-13 max-w-190 text-center">
        <h2>{showcase.title}</h2>
      </header>
      <figure className="m-0 grid justify-items-center gap-4">
        <video
          className="aspect-video w-full max-w-260 rounded-2xl bg-deep shadow-2xl"
          src={showcase.src}
          poster={showcase.poster || undefined}
          controls
          playsInline
          preload="metadata"
        />
        {showcase.caption ? (
          <figcaption className="mt-8 text-base text-subtle-foreground">
            {showcase.caption}
          </figcaption>
        ) : null}
      </figure>
    </Section>
  );
}
