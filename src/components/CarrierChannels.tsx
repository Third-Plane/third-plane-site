import { placementDesk } from "../data/content";
import { Card, Grid, ItemBody, ItemTitle } from "./Grid";
import { reveal } from "../lib/style";
import { Section } from "./Section";
import { ChannelSnippet } from "./ChannelSnippet";

const channelSnippets = ["portal", "api", "mail"] as const;

// The three ways the desk reaches a carrier: portal, API and underwriter
// email. Shown on /placement-desk and /integrations; the copy lives in
// placement-desk.json under `channels`.
export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <Section tone="blend" id="channels" title={channels.title} body={channels.body}>
      <Grid columns={3}>
        {channels.items.map((item, i) => (
          <Card key={item.title} {...reveal(i)} className="gap-0 p-0">
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
