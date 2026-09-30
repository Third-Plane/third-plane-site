import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { Display2 } from "../components/Headings";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { StepList } from "../components/StepList";
import { reveal } from "../lib/style";

export function Security() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} />

      <Section tone="white" id="authority">
        <div className="grid grid-cols-2 gap-x-[clamp(1.5rem,4vw,3.5rem)] border-t-[1.5px] border-t-line max-[760px]:grid-cols-1 min-[901px]:auto-rows-[auto_1fr] min-[901px]:items-start">
          {page.authority.sides.map((side, i) => (
            <div
              className={`pt-6 min-[901px]:row-span-2 min-[901px]:grid min-[901px]:grid-rows-subgrid ${
                i > 0
                  ? "border-l border-l-line-soft pl-[clamp(1.5rem,4vw,3.5rem)] max-[760px]:mt-6 max-[760px]:border-t max-[760px]:border-l-0 max-[760px]:border-t-line-soft max-[760px]:pt-6 max-[760px]:pl-0"
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
