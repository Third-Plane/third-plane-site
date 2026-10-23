import { placementDesk } from "../data/content";
import { ChannelScreen, type ChannelName } from "./ChannelScreens";
import { ScreenCycle } from "./ScreenCycle";
import { Section, SectionContent } from "./Section";

// A mock screen for each channel, in the order of channels.items.
const channelScreens: ChannelName[] = ["portal", "api", "mail", "mcp"];

export function CarrierChannels() {
  const { channels } = placementDesk;
  return (
    <Section theme="blend" id="channels">
      <SectionContent>
        <ScreenCycle
          title={channels.title}
          body={channels.body}
          items={channels.items.map((item, i) => ({
            ...item,
            screen: <ChannelScreen name={channelScreens[i]} />,
          }))}
        />
      </SectionContent>
    </Section>
  );
}
