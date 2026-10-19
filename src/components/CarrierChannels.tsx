import { placementDesk } from "../data/content";
import { Card, Grid, ItemBody, ItemTitle } from "./Grid";
import { Section, SectionHeader } from "./Section";
import { ChannelSnippet } from "./ChannelSnippet";

const channelSnippets = ["portal", "api", "mail", "mcp"] as const;

export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <Section theme="blend" id="channels">
      <SectionHeader>
        <h2>{channels.title}</h2>
        <p className="lead">{channels.body}</p>
      </SectionHeader>
      <Grid columns={4}>
        {channels.items.map((item, i) => (
          <Card key={item.title} className="gap-0 p-0">
            <ChannelSnippet name={channelSnippets[i]} />
            <div className="space-y-2 px-6 py-5">
              <ItemTitle>{item.title}</ItemTitle>
              <ItemBody>{item.body}</ItemBody>
            </div>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
