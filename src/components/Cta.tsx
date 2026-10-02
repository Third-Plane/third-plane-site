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
      <div className="surface-deep relative overflow-hidden rounded-3xl p-8 md:p-13" data-reveal>
        <div className="relative max-w-160">
          <Display2>{title}</Display2>
          <p className="mt-5 text-base text-pretty text-muted-foreground">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href={href}>{label}</Button>
            <a
              className="border-b border-b-transparent font-medium text-accent transition-colors duration-200 hover:border-b-accent"
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
