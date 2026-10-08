// The charts, by the name a page asks for (data-chart on the canvas): the
// heroes', and the diagrams set in figures.

import { integrations } from "./integrations";
import { thirdPlaneModel, toolModel } from "./models";
import { placement } from "./placement";
import { security } from "./security";

export const CHARTS = { placement, security, integrations, toolModel, thirdPlaneModel };

export type ChartName = keyof typeof CHARTS;
