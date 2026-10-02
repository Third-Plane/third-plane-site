import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { Display2 } from "../components/Headings";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { StepList } from "../components/StepList";
import { cn, reveal } from "../lib/style";

// The hero is its own export: pages/security.astro puts it in Base's `hero` slot,
// outside <main>.
export function SecurityHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function Security() {
  return (
    <>
      <Section tone="white" id="authority">
        <div className="grid gap-x-10 border-t border-t-line md:auto-rows-[auto_1fr] md:grid-cols-2 md:items-start">
          {page.authority.sides.map((side, i) => (
            <div
              className={cn(
                "pt-6 md:row-span-2 md:grid md:grid-rows-subgrid",
                i > 0 &&
                  "mt-6 border-t border-t-line-soft md:mt-0 md:border-t-0 md:border-l md:border-l-line-soft md:pl-10",
              )}
              {...reveal(i)}
              key={side.title}
            >
              <Display2 className="mb-5">{side.title}</Display2>
              <ul className="grid">
                {side.items.map((item) => (
                  <li className="border-b border-b-line-soft py-6" key={item.title}>
                    <h3 className="mb-1.5 font-heading text-xl font-medium tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="text-base text-ink-body">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" id="record" title={page.record.title}>
        <StepList columns={3} steps={page.record.items} />
      </Section>

      <Section tone="blend" id="data" title={page.data.title}>
        <ItemGrid variant="outline" dense columns={2} items={page.data.items} />
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
