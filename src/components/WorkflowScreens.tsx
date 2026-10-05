import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { Frame, Pill, Table, Toolbar } from "./MockUi";

export type StageName = "intake" | "markets" | "results";

// Mock screens for the Placement Desk's three stages, following one BOP
// submission from intake to the producer's inbox. The stage's steps say the
// same thing in words; see MockUi for the pieces.

// Everything the stage pulled together, and where each part came from.
const INTAKE: { field: string; value?: string; source: string }[] = [
  { field: "Named insured", value: "Sample Bakery LLC", source: "ACORD 125" },
  { field: "NAICS", value: "311811", source: "ACORD 125" },
  { field: "Prior carrier", source: "Producer" },
  { field: "Years in business", value: "8", source: "AMS" },
  { field: "Payroll", source: "Producer" },
  { field: "Annual sales", value: "$1,240,000", source: "Email" },
  { field: "BPP limit", value: "$185,000", source: "ACORD 140" },
  { field: "Losses, 3 yrs", value: "None reported", source: "Loss runs" },
];

function Intake() {
  return (
    <>
      <Toolbar title="Sample Bakery LLC" view="BOP" chip={<Pill alert>2 missing</Pill>} />
      <Table
        columns={[
          { label: "Field", cell: (row) => <span className="truncate">{row.field}</span> },
          {
            label: "Value",
            className: "w-28",
            cell: (row) =>
              row.value ? (
                <span className="truncate font-medium">{row.value}</span>
              ) : (
                <Pill alert>Requested</Pill>
              ),
          },
          {
            label: "Source",
            className: "hidden w-16 @sm:flex",
            cell: (row) => <span className="truncate text-deep/50">{row.source}</span>,
          },
        ]}
        rows={INTAKE}
      />
    </>
  );
}

// Fit out of three, as filled bars.
function Appetite({ fit }: { fit: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map((n) => (
        <i
          className={cn("h-1.5 w-2.5 rounded-full", n <= fit ? "bg-purple" : "bg-deep/10")}
          key={n}
        />
      ))}
    </span>
  );
}

const MARKETS: {
  carrier: string;
  incumbent?: boolean;
  fit: number;
  channel?: string;
  status: ReactNode;
}[] = [
  {
    carrier: "Sample Carrier Co.",
    incumbent: true,
    fit: 3,
    channel: "API",
    status: <Pill alert>Quoted</Pill>,
  },
  { carrier: "Demo Mutual", fit: 3, channel: "Portal", status: <Pill>Submitted</Pill> },
  { carrier: "Example Specialty", fit: 2, channel: "Email", status: <Pill>Follow-up, day 2</Pill> },
  { carrier: "Placeholder Insurance", fit: 2, channel: "Portal", status: <Pill>UW answered</Pill> },
  { carrier: "Example Casualty", fit: 2, channel: "Email", status: <Pill>Submitted</Pill> },
  {
    carrier: "Demo Indemnity",
    fit: 0,
    status: <span className="text-deep/50">Out of appetite</span>,
  },
  {
    carrier: "Sample National",
    fit: 1,
    status: <span className="text-deep/50">Not selected</span>,
  },
];

function Markets() {
  return (
    <>
      <Toolbar
        title="Market plan"
        view="Sample Bakery LLC, BOP"
        chip={<Pill>5 of 12 markets</Pill>}
      />
      <Table
        columns={[
          {
            label: "Carrier",
            cell: (row) => (
              <span className="truncate">
                <span className="font-medium">{row.carrier}</span>
                {row.incumbent ? <span className="text-deep/50"> Incumbent</span> : null}
              </span>
            ),
          },
          {
            label: "Appetite",
            className: "hidden w-12 @sm:flex",
            cell: (row) => <Appetite fit={row.fit} />,
          },
          {
            label: "Channel",
            className: "hidden w-11 @xs:flex",
            cell: (row) => <span className="text-deep/50">{row.channel ?? "–"}</span>,
          },
          { label: "Status", className: "w-26", cell: (row) => row.status },
        ]}
        rows={MARKETS}
      />
    </>
  );
}

const RESULTS: { carrier: string; premium?: string }[] = [
  { carrier: "Sample Carrier Co.", premium: "$4,820" },
  { carrier: "Demo Mutual", premium: "$5,140" },
  { carrier: "Example Specialty", premium: "$5,610" },
  { carrier: "Example Casualty" },
];

function Results() {
  return (
    <>
      <Toolbar title="Inbox" view="Producer" chip={<Pill alert>New</Pill>} />
      <div className="border-b border-deep/10 px-4 py-3">
        <p className="flex justify-between gap-3 text-deep/50">
          <span className="truncate">Placement Desk</span>
          <span className="shrink-0">9:42 AM</span>
        </p>
        <p className="mt-1 truncate font-medium">Results: Sample Bakery LLC, BOP</p>
        <p className="mt-0.5 truncate text-deep/50">3 quotes and 1 declination, record attached.</p>
        <p className="mt-2.5 flex gap-1.5">
          <span className="rounded-md border border-deep/10 px-1.5 py-0.5">Quotes.pdf</span>
          <span className="rounded-md border border-deep/10 px-1.5 py-0.5">Work record.pdf</span>
        </p>
      </div>
      <Table
        columns={[
          { label: "Market", cell: (row) => <span className="truncate">{row.carrier}</span> },
          {
            label: "Premium",
            className: "w-20 justify-end",
            cell: (row) =>
              row.premium ? (
                <span className="font-medium tabular-nums">{row.premium}</span>
              ) : (
                <span className="text-deep/50">Declined</span>
              ),
          },
        ]}
        rows={RESULTS}
      />
    </>
  );
}

const SCREENS: Record<StageName, () => ReactNode> = {
  intake: Intake,
  markets: Markets,
  results: Results,
};

// A fixed height rather than the problem cards' 16:9, since the stages are
// different widths and their screens sit in one row. An editor can add stages
// beyond the three drawn here; those get none.
export function StageScreen({ name }: { name?: StageName }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame className="aspect-auto h-72 rounded-none bg-cream/5">
      <Screen />
    </Frame>
  );
}
