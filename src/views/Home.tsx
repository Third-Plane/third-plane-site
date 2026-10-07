import { approach, desk, homeHero, problem } from "../data/content";
import { Card, Grid, ItemBody, ItemTitle } from "../components/Grid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { ProblemScreen, type ScreenName } from "../components/ProblemScreens";
import { Section, SectionHeader } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { SplitHero } from "../components/SplitHero";
import { Arrow, Button } from "../components/Ui";
import { cn, reveal } from "../lib/style";

// A mock AMS screen for each problem point, in the order of problem.points.
const problemScreens: ScreenName[] = ["renewed", "overdue", "unassigned", "revenue"];

// The two operating models, one a plain card and one accented (its own surface,
// see index.css). The accented model's last step is filled.

// The hero is its own export: pages/index.astro puts it in Base's `hero` slot.
export function HomeHero() {
  return (
    <SplitHero
      title={homeHero.title}
      lead={homeHero.lead}
      actions={<Button />}
      ledger={homeHero.ledger}
    />
  );
}

export function Home() {
  return (
    <>
      <PlacementWorkflowSection id="desk" title={desk.title} body={desk.body} />

      <Showcase />

      <Section tone="white" id="problem">
        <SectionHeader title={problem.title} body={problem.body} />
        <Grid className="wrap">
          {problem.points.map((point, i) => (
            <Card key={point.title} {...reveal(i)} className="gap-0 p-0">
              <ProblemScreen name={problemScreens[i]} />
              <div className="space-y-2 px-6 py-5">
                <ItemTitle>{point.title}</ItemTitle>
                <ItemBody>{point.body}</ItemBody>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="approach" tone="blend">
        <SectionHeader title={approach.title} body={approach.body} />
        <div className="wrap grid gap-5">
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
    </>
  );
}
