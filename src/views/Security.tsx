import { securityPage as page } from "../data/content";
import { Cta } from "../components/Cta";
import { Grid, ItemBody, ItemTitle, OutlineCard } from "../components/Grid";
import { Display2 } from "../components/Headings";
import type { ChartName } from "../components/Flowchart";
import { SplitHero } from "../components/SplitHero";
import { Section, SectionHeader } from "../components/Section";
import { cn, reveal } from "../lib/style";

// The hero is its own export: pages/security.astro puts it in Base's `hero` slot,
// outside <main>.
// The page's flowchart: Base shows it, and the hero's ledger follows it.
export const chart: ChartName = "security";

export function SecurityHero() {
  return <SplitHero title={page.title} lead={page.lead} chart={chart} ledger={page.ledger} />;
}

export function Security() {
  return (
    <>
      <Section tone="white" id="authority">
        <div className="grid gap-x-10 border-t border-t-border md:auto-rows-[auto_1fr] md:grid-cols-2 md:items-start">
          {page.authority.sides.map((side, i) => (
            <div
              className={cn(
                "pt-6 md:row-span-2 md:grid md:grid-rows-subgrid",
                i > 0 &&
                  "mt-6 border-t border-t-border/50 md:mt-0 md:border-t-0 md:border-l md:border-l-border/50 md:pl-10",
              )}
              {...reveal(i)}
              key={side.title}
            >
              <Display2 className="mb-5">{side.title}</Display2>
              <ul className="grid">
                {side.items.map((item) => (
                  <li className="border-b border-b-border/50 py-6" key={item.title}>
                    <h3 className="mb-1.5 font-heading text-xl font-medium tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" id="record">
        <SectionHeader title={page.record.title} />
        <Grid columns={3} className="wrap">
          {page.record.items.map((item, i) => (
            <OutlineCard key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </OutlineCard>
          ))}
        </Grid>
      </Section>

      <Section tone="blend" id="data">
        <SectionHeader title={page.data.title} />
        <Grid className="wrap">
          {page.data.items.map((item, i) => (
            <OutlineCard className="px-6 py-5" key={item.title} {...reveal(i)}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </OutlineCard>
          ))}
        </Grid>
      </Section>

      <Cta {...page.cta} />
    </>
  );
}
