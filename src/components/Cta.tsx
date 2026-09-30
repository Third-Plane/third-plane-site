import { contact, site } from "../data/content";
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
    <section className="section" id="contact">
      <div className="container">
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
      </div>
    </section>
  );
}
