import type { ReactNode } from "react";
import { AppliedEpic } from "./pages/AppliedEpic";
import { Careers } from "./pages/Careers";
import { CarrierChannels } from "./pages/CarrierChannels";
import { Company } from "./pages/Company";
import { Home } from "./pages/Home";
import { Integrations } from "./pages/Integrations";
import { PlacementDesk } from "./pages/PlacementDesk";
import { Resources } from "./pages/Resources";
import { Security } from "./pages/Security";

// Every page on the site. Each is routed in App.tsx, prerendered to its own
// HTML file at build time and listed in the sitemap.
export const pages: { path: string; element: ReactNode }[] = [
  { path: "/", element: <Home /> },
  { path: "/placement-desk", element: <PlacementDesk /> },
  { path: "/security", element: <Security /> },
  { path: "/carrier-channels", element: <CarrierChannels /> },
  { path: "/integrations", element: <Integrations /> },
  { path: "/applied-epic", element: <AppliedEpic /> },
  { path: "/company", element: <Company /> },
  { path: "/careers", element: <Careers /> },
  { path: "/resources", element: <Resources /> },
];
