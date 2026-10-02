import { approach, desk, homeHero, problem } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { SplitHero } from "../components/SplitHero";
import { Arrow, Button } from "../components/Ui";
import { cn, reveal } from "../lib/style";

// The two operating models, one a plain card and one accented (its own surface,
// see index.css). The accented model's last step is filled.

// The hero is its own export: pages/index.astro puts it in Base's `hero` slot,
// outside <main>.
export function HomeHero() {
  return <SplitHero title={homeHero.title} lead={homeHero.lead} actions={<Button />} />;
}

export function Home() {
  return (
    <>
      <PlacementWorkflowSection id="desk" title={desk.title} body={desk.body} />

      <Showcase />

      <Section tone="white" id="problem" title={problem.title} body={problem.body}>
        <ItemGrid variant="outline" columns={2} items={problem.points} />
      </Section>

      <Section id="approach" title={approach.title} body={approach.body}>
        <div className="grid gap-5">
          {approach.models.map((model, i) => {
            return (
              <div
                className={cn(
                  "rounded-2xl border p-7 transition-colors duration-200 hover:border-accent/45",
                  model.accent ? "surface-accent border-transparent" : "border-border bg-card",
                )}
                {...reveal(i)}
                key={model.kicker}
              >
                <p
                  className={cn(
                    "mb-5 font-heading text-xl leading-tight font-medium tracking-tight text-foreground",
                  )}
                >
                  {model.kicker}
                </p>
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2.5" role="list">
                  {model.chain.map((step, stepIndex) => (
                    <span
                      className="inline-flex items-center gap-x-3 gap-y-2.5"
                      role="listitem"
                      key={step}
                    >
                      {stepIndex > 0 ? (
                        <Arrow className="size-4.5 flex-none text-subtle-foreground" />
                      ) : null}
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-4 py-3 font-heading text-base font-medium tracking-tight whitespace-nowrap",
                          model.accent && stepIndex === model.chain.length - 1
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-muted text-foreground",
                        )}
                      >
                        {step}
                      </span>
                    </span>
                  ))}
                </div>
                <p className="mt-5 max-w-[64ch] text-base text-muted-foreground">{model.note}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Cta label="Discuss your placement operation" />
    </>
  );
}
