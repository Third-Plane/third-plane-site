import { companyPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { Display2 } from "../components/Headings";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { cn, reveal } from "../lib/style";

// The hero is its own export: pages/company.astro puts it in Base's `hero` slot,
// outside <main>.
export function CompanyHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function Company() {
  return (
    <>
      <Section
        tone="white"
        id="origin"
        containerClassName="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start gap-x-[clamp(2.5rem,6vw,6rem)] gap-y-[clamp(2.5rem,5vw,4rem)] max-md:grid-cols-1"
      >
        <div data-reveal>
          <Display2>{page.origin.title}</Display2>
          {page.origin.body.map((paragraph, i) => (
            <p
              className={cn(
                "max-w-[58ch] text-pretty",
                i === 0 ? "mt-6 text-base font-medium text-ink" : "mt-5 text-ink-body",
              )}
              key={paragraph.slice(0, 20)}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <figure
          className="relative m-0 aspect-4/3 overflow-hidden rounded-2xl bg-cream"
          {...reveal(1)}
        >
          {page.team.photo.src ? (
            <img
              className="size-full object-cover"
              src={page.team.photo.src}
              alt={page.team.photo.alt}
            />
          ) : (
            <div
              className="absolute inset-0 grid place-items-center rounded-2xl border border-dashed border-line text-sm text-ink-muted"
              aria-label={page.team.photoNote}
            >
              <span className="relative z-2 rounded-full bg-cream px-3 py-1.5">
                {page.team.photoNote}
              </span>
            </div>
          )}
        </figure>
      </Section>

      <Section id="principles" title={page.principles.title}>
        <ItemGrid variant="point" columns={2} items={page.principles.items} />
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
