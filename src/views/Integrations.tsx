import { integrationsPage as page } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import { Card, Grid, ItemBody, ItemTitle } from "../components/Grid";
import type { ChartName } from "../components/Flowchart";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/SplitHero";
import { Section, SectionHeader } from "../components/Section";
import { StepList } from "../components/StepList";
import { SystemScreen, type SystemName } from "../components/SystemScreens";
import { AppLink } from "../components/Ui";

// A mock screen for each system, in the order of systems.items. The fifth item,
// carrier channels, isn't shown here: CarrierChannels below covers it.
const systemScreens: SystemName[] = ["ams", "documents", "inbox", "data"];

export const chart: ChartName = "integrations";

export function IntegrationsHero() {
  return (
    <SplitHero title={page.title} lead={page.lead}>
      <Ledger chart={chart} panel={page.ledger} />
    </SplitHero>
  );
}

export function Integrations() {
  return (
    <>
      <Section theme="white" id="systems">
        <SectionHeader title={page.systems.title} />
        <Grid className="wrap">
          {page.systems.items.slice(0, 4).map((item, i) => (
            <Card key={item.title} className="gap-0 p-0">
              <SystemScreen name={systemScreens[i]} />
              <div className="space-y-2 px-6 py-5">
                <ItemTitle>{item.title}</ItemTitle>
                <ItemBody>
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
                </ItemBody>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      <CarrierChannels />

      <Section theme="deep" id="how">
        <SectionHeader title={page.how.title} />
        <StepList steps={page.how.steps} />
      </Section>
    </>
  );
}
