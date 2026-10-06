// The hero charts, by the name a page asks for (data-chart on the canvas).

import { integrations } from "./integrations";
import { placement } from "./placement";
import { security } from "./security";

export const CHARTS = { placement, security, integrations };

export type ChartName = keyof typeof CHARTS;
