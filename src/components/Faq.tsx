import type { Faq as FaqCopy } from "../data/content-types";
import { Section, SectionContent, SectionHeader } from "./Section";
import type { Theme } from "./theme";

// A page's questions and answers, the last section before the footer. Every
// answer is in the markup and always open, not folded away, so a reader can
// scan them and a crawler or answer engine can quote each one on its own: a
// question is an h3 and its answer the paragraph after it. The page also
// describes them as an FAQPage in its structured data (faqPage in
// lib/schema.ts). With no questions the section is left out.
export function Faq({ faq, theme }: { faq?: FaqCopy; theme: Theme }) {
  if (!faq?.items?.length) return null;
  return (
    <Section theme={theme} id="faq">
      <SectionHeader>
        <h2>{faq.title}</h2>
      </SectionHeader>
      <SectionContent>
        <div className="grid">
          {faq.items.map((item) => (
            <div
              className="grid gap-x-(--gutter) gap-y-2 border-b border-accent/10 py-7 first:pt-0 last:border-b-0 lg:grid-cols-[2fr_3fr]"
              key={item.question}
            >
              <h3 className="leading-snug">{item.question}</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </SectionContent>
    </Section>
  );
}
