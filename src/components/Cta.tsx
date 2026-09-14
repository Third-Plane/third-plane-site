import { contact, site } from "../data/content";
import { Button } from "./Ui";
import { ParticleField } from "./ParticleField";

export function Cta({
  title = contact.title,
  body = contact.body,
  email = site.email,
  meta,
}: {
  title?: string;
  body?: string;
  email?: string;
  meta?: string[];
}) {
  const mailto = `mailto:${email}`;
  const items =
    meta ?? (title === contact.title && body === contact.body ? contact.meta : []);
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta" data-reveal>
          <ParticleField
            className="cta__particles"
            tone="cream"
            alpha={0.7}
            density={0.9}
          />
          <div className="cta__inner">
            <h2 className="display-2">{title}</h2>
            <p className="cta__body">{body}</p>
            <div className="cta__actions">
              <Button variant="dark" href={mailto} />
              <a className="cta__email" href={mailto}>
                {email}
              </a>
            </div>
            {items.length ? (
              <ul className="cta__meta">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
