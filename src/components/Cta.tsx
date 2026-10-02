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
  return (
    <Section tone="white">
      <Display2>{title}</Display2>
      <p className="mt-5 max-w-[80ch] text-base text-muted-foreground">{body}</p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button href={href}>{label}</Button>
        {email && (
          <a
            className="border-b border-b-transparent font-medium text-accent transition-colors duration-200 hover:border-b-accent"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        )}
      </div>
    </Section>
  );
}
