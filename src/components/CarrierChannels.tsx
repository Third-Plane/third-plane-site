import { placementDesk } from "../data/content";
import { Card, Grid, ItemBody, ItemTitle } from "./Grid";
import { reveal } from "../lib/style";
import { Section } from "./Section";
import { CardMark } from "./CardMark";

const channelMarks = ["portal", "api", "mail"] as const;

// The three ways the desk reaches a carrier: portal, API and underwriter
// email. Shown on /placement-desk and /integrations; the copy lives in
// placement-desk.json under `channels`.
export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <Section tone="blend" id="channels" title={channels.title} body={channels.body}>
      <Grid columns={3}>
        {channels.items.map((item, i) => (
          <Card key={item.title} {...reveal(i)}>
            <CardMark name={channelMarks[i]} />
            <ItemTitle>{item.title}</ItemTitle>
            <ItemBody>{item.body}</ItemBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
