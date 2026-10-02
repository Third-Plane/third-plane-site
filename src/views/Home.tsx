import { approach, desk, homeHero, problem } from "../data/content";
import { Cta } from "../components/Cta";
import { ItemGrid } from "../components/ItemGrid";
import { PlacementWorkflowSection } from "../components/PlacementWorkflow";
import { Section } from "../components/Section";
import { Showcase } from "../components/Showcase";
import { SplitHero } from "../components/SplitHero";
import { Arrow, Button } from "../components/Ui";
import { cn, reveal } from "../lib/style";

// The two operating models, one plain and one accented. Each part's colours are
// listed whole so Tailwind can see them; the accented model's last step is
// filled.
const MODEL = {
  plain: {
    box: "border-deep/10 bg-white hover:border-purple/45",
    kicker: "text-deep",
    step: "border-deep/10 bg-cream text-deep",
    lastStep: "border-deep/10 bg-cream text-deep",
    arrow: "text-ink-muted",
    note: "text-ink-body",
  },
  accent: {
    box: "border-transparent bg-purple hover:border-transparent hover:bg-purple/90",
    kicker: "text-cream",
    step: "border-white/35 bg-transparent text-cream",
    lastStep: "border-white bg-white text-purple",
    arrow: "text-white/70",
    note: "text-white/90",
  },
} as const;

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
            const tone = model.accent ? MODEL.accent : MODEL.plain;
            return (
              <div
                className={cn("rounded-2xl border p-7 transition-colors duration-200", tone.box)}
                {...reveal(i)}
                key={model.kicker}
              >
                <p
                  className={cn(
                    "mb-5 font-heading text-xl leading-tight font-medium tracking-tight",
                    tone.kicker,
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
                        <Arrow className={cn("size-4.5 flex-none", tone.arrow)} />
                      ) : null}
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-4 py-3 font-heading text-base font-medium tracking-tight whitespace-nowrap",
                          stepIndex === model.chain.length - 1 ? tone.lastStep : tone.step,
                        )}
                      >
                        {step}
                      </span>
                    </span>
                  ))}
                </div>
                <p className={cn("mt-5 max-w-[64ch] text-base", tone.note)}>{model.note}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Cta label="Discuss your placement operation" />
    </>
  );
}
