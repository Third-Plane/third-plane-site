import { contact, site } from "../data/content";
import { Display2 } from "./Headings";
import { Button } from "./Ui";

// What a page says in its call to action. Anything it leaves out comes from
// the site's defaults: the contact copy, and the main button and its link.
export type CtaCopy = {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
};

// The call to action that opens every page's footer (see Footer).
export function Cta({
  title = contact.title,
  body = contact.body,
  label = site.ctaLabel,
  href = site.ctaHref,
}: CtaCopy) {
  return (
    <div className="wrap z-4 max-w-3xl rounded-xl px-(--gutter) py-12 shadow-2xl inset-ring-1 shadow-black/15 inset-ring-white/25 backdrop-blur-lg backdrop-invert-5">
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
  );
}
