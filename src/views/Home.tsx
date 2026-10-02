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
    box: "border-line bg-white hover:border-[color-mix(in_srgb,var(--purple)_35%,var(--line))]",
    kicker: "text-ink",
    step: "border-line bg-cream text-ink",
    lastStep: "border-line bg-cream text-ink",
    arrow: "text-ink-muted",
    note: "text-ink-body",
  },
  accent: {
    box: "border-transparent bg-purple hover:border-transparent hover:bg-[color-mix(in_srgb,var(--purple)_88%,var(--white))]",
    kicker: "text-on-dark",
    step: "border-[#ffffff59] bg-transparent text-on-dark",
    lastStep: "border-white bg-white text-purple",
    arrow: "text-[#ffffffb3]",
    note: "text-[#ffffffe0]",
  },
} as const;

// The hero is its own export: pages/index.astro puts it in Base's `hero` slot,
// outside <main>.
export function HomeHero() {
  return (
    <SplitHero title={homeHero.title} lead={homeHero.lead} actions={<Button variant="dark" />} />
  );
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
        <div className="grid gap-(--gap)">
          {approach.models.map((model, i) => {
            const tone = model.accent ? MODEL.accent : MODEL.plain;
            return (
              <div
                className={cn(
                  "rounded-2xl border p-(--pad) transition-[border-color,background] duration-200",
                  tone.box,
                )}
                {...reveal(i)}
                key={model.kicker}
              >
                <p
                  className={cn(
                    "mb-5 font-heading text-xl leading-[1.2] font-medium tracking-tight",
                    tone.kicker,
                  )}
                >
                  {model.kicker}
                </p>
                <div
                  className="flex flex-wrap items-center gap-x-[0.35rem] gap-y-[0.65rem]"
                  role="list"
                >
                  {model.chain.map((step, stepIndex) => (
                    <span
                      className="inline-flex items-center gap-x-3 gap-y-[0.6rem]"
                      role="listitem"
                      key={step}
                    >
                      {stepIndex > 0 ? (
                        <Arrow className={cn("size-4.5 flex-none", tone.arrow)} />
                      ) : null}
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border-[1.5px] px-[1.1rem] py-[0.7rem] font-heading text-base font-medium tracking-tight whitespace-nowrap",
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
