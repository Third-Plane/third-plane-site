import { contact, site } from "../data/content";
import { Display2 } from "./Headings";
import { Section } from "./Section";
import { Button } from "./Ui";

export function Cta({
  title = contact.title,
  body = contact.body,
  label = site.ctaLabel,
  href = site.ctaHref,
  email = site.email,
}: {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
  email?: string;
}) {
  const mailto = `mailto:${email}`;
  return (
    <Section id="contact">
      <div
        className="relative overflow-hidden rounded-3xl bg-deep p-8 text-on-dark md:p-13"
        data-reveal
      >
        <div className="relative max-w-160">
          <Display2 tone="dark">{title}</Display2>
          <p className="mt-5 text-base text-pretty text-on-dark-muted">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button variant="light" href={href}>
              {label}
            </Button>
            <a
              className="border-b border-b-transparent font-medium text-pink transition-colors duration-200 hover:border-b-pink"
              href={mailto}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
