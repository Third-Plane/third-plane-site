import type { Faq as FaqCopy } from "../data/content-types";
import { Section, SectionContent, SectionHeader } from "./Section";
import type { Theme } from "./theme";
import { cn } from "../lib/style";

// A page's questions and answers, the last section before the footer. Each
// question is an h3 holding the button that opens its answer, all closed to
// begin with; scripts/faq.ts sets `data-open` and `aria-expanded`. A closed
// answer is folded away but still in the markup, so a crawler or answer engine
// reads every one, and the page also describes them as an FAQPage in its
// structured data (faqPage in lib/schema.ts). With no questions the section
// is left out.
//
// An answer opens by its row growing from 0fr to 1fr, which animates to the
// height of whatever it holds; its inner box clips it on the way. It is
// invisible while closed, so its text can't be tabbed into or read out, and
// visibility only switches at the end of a close, so it stays shown while it
// folds.
export function Faq({ faq, theme }: { faq?: FaqCopy; theme: Theme }) {
  if (!faq?.items?.length) return null;
  return (
    <Section theme={theme} id="faq">
      <SectionHeader>
        <h2>{faq.title}</h2>
      </SectionHeader>
      <SectionContent>
        <div className="grid">
          {faq.items.map((item, i) => (
            <div
              className="group/faq border-b border-accent/10 last:border-b-0"
              data-open="false"
              data-faq
              key={item.question}
            >
              <h3 className="leading-snug">
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-6 text-left tracking-[inherit] text-inherit transition-colors duration-200 [border:0] [font:inherit] hover:text-accent"
                  type="button"
                  id={`faq-${i}-question`}
                  aria-expanded="false"
                  aria-controls={`faq-${i}`}
                  data-faq-toggle
                >
                  {item.question}
                  <PlusMinus />
                </button>
              </h3>
              <div
                className={cn(
                  "invisible grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
                  "group-data-[open=true]/faq:visible group-data-[open=true]/faq:grid-rows-[1fr]",
                )}
                id={`faq-${i}`}
                role="region"
                aria-labelledby={`faq-${i}-question`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[66ch] pb-7 text-lg leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContent>
    </Section>
  );
}

// A plus that becomes a minus as its answer opens: the upright folds away.
function PlusMinus() {
  return (
    <svg className="size-4 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        className="origin-center transition-transform duration-300 [transform-box:fill-box] group-data-[open=true]/faq:scale-y-0 motion-reduce:transition-none"
        d="M8 2.5v11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
