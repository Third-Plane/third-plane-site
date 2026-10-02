import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { Display2 } from "../components/Headings";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { StepList } from "../components/StepList";
import { reveal } from "../lib/style";

// The hero is its own export: pages/security.astro puts it in Base's `hero` slot,
// outside <main>.
export function SecurityHero() {
  return <PageHero title={page.title} lead={page.lead} />;
}

export function Security() {
  return (
    <>
      <Section tone="white" id="authority">
        <div className="grid grid-cols-2 gap-x-[clamp(1.5rem,4vw,3.5rem)] border-t-[1.5px] border-t-line max-md:grid-cols-1 md:auto-rows-[auto_1fr] md:items-start">
          {page.authority.sides.map((side, i) => (
            <div
              className={`pt-6 md:row-span-2 md:grid md:grid-rows-subgrid ${
                i > 0
                  ? "border-l border-l-line-soft pl-[clamp(1.5rem,4vw,3.5rem)] max-md:mt-6 max-md:border-t max-md:border-l-0 max-md:border-t-line-soft max-md:pt-6 max-md:pl-0"
                  : ""
              }`}
              {...reveal(i)}
              key={side.title}
            >
              <Display2 className="mb-5">{side.title}</Display2>
              <ul className="grid">
                {side.items.map((item) => (
                  <li className="border-b border-b-line-soft py-6" key={item.title}>
                    <h3 className="mb-[0.35rem] font-heading text-title font-medium tracking-head text-ink">
                      {item.title}
                    </h3>
                    <p className="text-copy text-ink-body">{item.body}</p>
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
