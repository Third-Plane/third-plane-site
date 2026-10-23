import { contact, site } from "../data/content";
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
      <div className="mb-10 space-y-4">
        <h2 className="text-white">{title}</h2>
        <h3 className="lead text-white/75">{body}</h3>
      </div>
      <Button href={href}>{label}</Button>
    </div>
  );
}
