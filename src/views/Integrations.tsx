import { integrationsPage as page } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import type { ChartName } from "../components/Flowchart";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/Hero";
import { cycleFrame, ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionHeader } from "../components/Section";
import { StepList } from "../components/StepList";
import { SystemScreen, type SystemName } from "../components/SystemScreens";
import { AppLink } from "../components/Ui";

// A mock screen for each system, in the order of systems.items. The fifth item,
// carrier channels, isn't shown here: CarrierChannels below covers it.
const systemScreens: SystemName[] = ["ams", "documents", "inbox", "data"];

export const chart: ChartName = "integrations";

export function Integrations() {
  return (
    <>
      <SplitHero title={page.title} lead={page.lead}>
        <Ledger chart={chart} panel={page.ledger} />
      </SplitHero>

      <Section theme="white" id="systems">
        <ScreenCycle
          title={page.systems.title}
          items={page.systems.items.slice(0, 4).map((item, i) => ({
            title: item.title,
            body: (
              <>
                {item.link || item.names ? (
                  <>
                    <strong className="font-semibold text-foreground">
                      {item.link ? (
                        <AppLink
                          className="underline-offset-[0.15em] hover:text-accent"
                          href={item.link.href}
                        >
                          {item.link.label}
                        </AppLink>
                      ) : null}
                      {item.link && item.names ? ", " : null}
                      {item.names ?? null}
                    </strong>
                    {". "}
                  </>
                ) : null}
                {item.body}
              </>
            ),
            screen: <SystemScreen name={systemScreens[i]} className={cycleFrame} />,
          }))}
        />
      </Section>

      <CarrierChannels />

      <Section theme="deep" id="how">
        <SectionHeader>
          <h2>{page.how.title}</h2>
        </SectionHeader>
        <StepList steps={page.how.steps} />
      </Section>
    </>
  );
}
