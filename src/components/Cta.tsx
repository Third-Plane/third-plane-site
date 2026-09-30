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
      <div
        className="relative overflow-hidden rounded-[calc(var(--radius)_+_8px)] bg-deep p-[clamp(2rem,5vw,4.5rem)] text-on-dark"
        data-reveal
      >
        <div className="relative max-w-[640px]">
          <h2 className="display-2 text-on-dark">{title}</h2>
          <p className="mt-5 text-copy text-pretty text-on-dark-muted">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button variant="light" href={href}>
              {label}
            </Button>
            <a
              className="border-b-[1.5px] border-b-transparent font-medium text-pink transition-[border-color] duration-200 hover:border-b-pink"
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
