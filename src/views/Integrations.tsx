import { integrationsPage as page } from "../data/content";
import { CarrierChannels } from "../components/CarrierChannels";
import type { ChartName } from "../components/Flowchart";
import { Ledger } from "../components/Ledger";
import { SplitHero } from "../components/Hero";
import { ScreenCycle } from "../components/ScreenCycle";
import { Section, SectionContent, SectionHeader } from "../components/Section";
import { SystemScreen, type SystemName } from "../components/SystemScreens";
import { AppLink, Button } from "../components/Ui";
import { Grid, ItemBody, ItemTitle, GridItem } from "../components/Grid";

// A mock screen for each system, in the order of systems.items. The fifth item,
// carrier channels, isn't shown here: CarrierChannels below covers it.
const systemScreens: SystemName[] = ["ams", "documents", "inbox", "data"];

export const chart: ChartName = "integrations";

export function Integrations() {
  return (
    <>
      <SplitHero title={page.title} lead={page.lead} actions={<Button />}>
        <Ledger chart={chart} panel={page.ledger} />
      </SplitHero>

      <Section theme="white" id="systems">
        <SectionHeader>
          <h2>{page.systems.title}</h2>
        </SectionHeader>
        <SectionContent>
          <ScreenCycle
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
              screen: <SystemScreen name={systemScreens[i]} />,
            }))}
          />
        </SectionContent>
      </Section>

      <CarrierChannels />

      <Section theme="deep" id="how">
        <SectionHeader>
          <h2>{page.how.title}</h2>
        </SectionHeader>
        <SectionContent className="p-0">
          <Grid>
            {page.how.steps.map((item) => (
              <GridItem key={item.title}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemBody>{item.body}</ItemBody>
              </GridItem>
            ))}
          </Grid>
        </SectionContent>
      </Section>
    </>
  );
}
