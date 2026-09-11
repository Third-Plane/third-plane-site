import { contact, site } from "../data/content";
import { Button } from "./Ui";
import { ParticleField } from "./ParticleField";

export function Cta({
  title = contact.title,
  body = contact.body,
  email = site.email,
}: {
  title?: string;
  body?: string;
  email?: string;
}) {
  const mailto = `mailto:${email}`;
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
            <ul className="cta__meta">
              {contact.meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
