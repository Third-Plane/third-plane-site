import { contact, site } from "../data/content";
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
      <div className="cta" data-reveal>
        <div className="cta__inner">
          <h2 className="display-2">{title}</h2>
          <p className="cta__body">{body}</p>
          <div className="cta__actions">
            <Button variant="dark" href={href}>
              {label}
            </Button>
            <a className="cta__email" href={mailto}>
              {email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
