import { contact, site } from "../data/content";
import { Halftone } from "./Halftone";
import { Display2 } from "./Headings";
import { Section } from "./Section";
import { Button } from "./Ui";

export function Cta({
  title = contact.title,
  body = contact.body,
  label = site.ctaLabel,
  href = site.ctaHref,
}: {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
}) {
  return (
    <Section tone="deep">
      <img
        src="/media/oosterink_20.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 z-1 backdrop-blur-[6px]" />
      <Halftone src="/media/oosterink_20.jpg" fixed className="z-2 opacity-5 mix-blend-overlay" />
      <Halftone src="/media/oosterink_20.jpg" fixed shine className="z-3 opacity-30" />
      <div className="wrap z-4 max-w-2xl rounded-xl p-12 shadow-2xl inset-ring-1 shadow-black/50 inset-ring-white/25 backdrop-blur-xl backdrop-brightness-110">
        <Display2 className="text-white">{title}</Display2>
        <p className="mt-5 max-w-[80ch] text-base text-white/75">{body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button href={href}>{label}</Button>
          <a
            className="border-b border-b-transparent font-medium text-white transition-colors duration-200 hover:border-b-white"
            href={site.mailto}
          >
            {site.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
