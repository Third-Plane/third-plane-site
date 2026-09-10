import { contact, site } from "../data/content";
import { Button, Dots } from "./Ui";

export function Cta({
  title = contact.title,
  body = contact.body,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta" data-reveal>
          <Dots className="cta__dots" id="cta-dots" direction="right" />
          <div className="cta__inner">
            <h2 className="display-2">{title}</h2>
            <p className="cta__body">{body}</p>
            <div className="cta__actions">
              <Button variant="dark" />
              <a className="cta__email" href={site.mailto}>
                {site.email}
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
