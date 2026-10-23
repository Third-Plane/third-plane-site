import { placementDesk } from "../data/content";
import { ChannelScreen, type ChannelName } from "./ChannelScreens";
import { ScreenCycle } from "./ScreenCycle";
import { Section, SectionContent, SectionHeader } from "./Section";

// A mock screen for each channel, in the order of channels.items.
const channelScreens: ChannelName[] = ["portal", "api", "mail", "mcp"];

export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <Section theme="blend" id="channels">
      <SectionHeader>
        <h2>{channels.title}</h2>
        <h3 className="lead">{channels.body}</h3>
      </SectionHeader>
      <SectionContent>
        <ScreenCycle
          items={channels.items.map((item, i) => ({
            ...item,
            screen: <ChannelScreen name={channelScreens[i]} />,
          }))}
        />
      </SectionContent>
    </Section>
  );
}
