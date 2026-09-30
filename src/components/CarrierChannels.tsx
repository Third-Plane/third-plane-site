import { placementDesk } from "../data/content";
import { ItemGrid } from "./ItemGrid";
import { Section } from "./Section";
import { CardMark } from "./Iso";

const channelMarks = ["portal", "api", "mail"] as const;

// The three ways the desk reaches a carrier: portal, API and underwriter
// email. Shown on /placement-desk and /integrations; the copy lives in
// placement-desk.json under `channels`.
export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <Section tone="blend" id="channels" title={channels.title} body={channels.body}>
      <ItemGrid
        variant="card"
        columns={3}
        items={channels.items}
        media={(i) => <CardMark name={channelMarks[i]} variant="wide" />}
      />
    </Section>
  );
}
