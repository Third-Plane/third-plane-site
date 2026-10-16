import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { Frame, Pill, Table, Toolbar } from "./MockUi";

export type StageName = "intake" | "markets" | "results";

// Mock screens for the Placement Desk's three stages, following one BOP
// submission from intake to the producer's inbox. Each stage's screen has a
// state for each of its steps, in the order of the stage's steps, so as the
// steps go by the same screen moves the work along. See MockUi for the pieces.

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

// 0: gathered and structured, with gaps. 1: the gaps flagged and requested.
function Intake({ step }: { step: number }) {
  const flagged = step >= 1;
  return (
    <>
      <Toolbar
        title="Sample Bakery LLC"
        view="BOP"
        chip={flagged ? <Pill alert>2 missing</Pill> : <Pill>5 sources</Pill>}
      />
      <Table
        columns={[
          { label: "Field", cell: (row) => <span className="truncate">{row.field}</span> },
          {
            label: "Value",
            className: "w-28",
            cell: (row) =>
              row.value ? (
                <span className="truncate font-medium">{row.value}</span>
              ) : flagged ? (
                <Pill alert>Requested</Pill>
              ) : (
                <span className="text-deep/50">–</span>
              ),
          },
          {
            label: "Source",
            className: "hidden w-16 @sm:flex",
            cell: (row) => (
              <span className="truncate text-deep/50">
                {row.value || flagged ? row.source : "–"}
              </span>
            ),
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

// The appointed markets the plan was drawn from, each with its fit and, once
// selected, how it takes submissions and where it stands in follow-up.
const MARKETS: {
  carrier: string;
  incumbent?: boolean;
  fit: number;
  channel?: string;
  followUp?: ReactNode;
}[] = [
  {
    carrier: "Sample Carrier Co.",
    incumbent: true,
    fit: 3,
    channel: "API",
    followUp: <Pill alert>Quoted</Pill>,
  },
  { carrier: "Demo Mutual", fit: 3, channel: "Portal", followUp: <Pill>Submitted</Pill> },
  {
    carrier: "Example Specialty",
    fit: 2,
    channel: "Email",
    followUp: <Pill>Follow-up, day 2</Pill>,
  },
  {
    carrier: "Placeholder Insurance",
    fit: 2,
    channel: "Portal",
    followUp: <Pill>UW answered</Pill>,
  },
  {
    carrier: "Example Casualty",
    fit: 2,
    channel: "Email",
    followUp: <Pill>Supplemental sent</Pill>,
  },
  { carrier: "Demo Indemnity", fit: 0 },
  { carrier: "Sample National", fit: 1 },
];

const muted = (text: string) => <span className="text-deep/50">{text}</span>;

// A market's status at each step: 0, appetite assessed; 1, the plan drawn;
// 2, submitted; 3, in follow-up.
function marketStatus(row: (typeof MARKETS)[number], step: number) {
  if (step === 0) return row.fit ? <Pill>In appetite</Pill> : muted("Out of appetite");
  if (!row.channel) return muted(row.fit ? "Not selected" : "Out of appetite");
  if (step === 1) return <Pill>Selected</Pill>;
  if (step === 2) return <Pill>Submitted</Pill>;
  return row.followUp;
}

const MARKET_CHIPS = [
  <Pill key={0}>12 appointed</Pill>,
  <Pill key={1}>5 of 12 markets</Pill>,
  <Pill key={2}>5 submitted</Pill>,
  <Pill alert key={3}>
    4 open
  </Pill>,
];

function Markets({ step }: { step: number }) {
  return (
    <>
      <Toolbar
        title={step === 0 ? "Appetite" : "Market plan"}
        view="Sample Bakery LLC, BOP"
        chip={MARKET_CHIPS[step]}
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
            cell: (row) => (
              <span className="text-deep/50">{step >= 1 ? (row.channel ?? "–") : "–"}</span>
            ),
          },
          { label: "Status", className: "w-28", cell: (row) => marketStatus(row, step) },
        ]}
        rows={MARKETS}
      />
    </>
  );
}

// What each submitted market sent back.
const RESULTS: { carrier: string; response?: string; premium?: string }[] = [
  { carrier: "Sample Carrier Co.", response: "Quote", premium: "$4,820" },
  { carrier: "Demo Mutual", response: "Quote", premium: "$5,140" },
  { carrier: "Example Specialty", response: "Indication", premium: "$5,610" },
  { carrier: "Example Casualty", response: "Declination" },
  { carrier: "Placeholder Insurance" },
];

function Responses() {
  return (
    <Table
      columns={[
        { label: "Market", cell: (row) => <span className="truncate">{row.carrier}</span> },
        {
          label: "Response",
          className: "hidden w-20 @xs:flex",
          cell: (row) =>
            row.response === "Declination" ? (
              muted("Declined")
            ) : row.response ? (
              <span>{row.response}</span>
            ) : (
              <Pill>Awaiting</Pill>
            ),
        },
        {
          label: "Premium",
          className: "w-16 justify-end",
          cell: (row) =>
            row.premium ? (
              <span className="font-medium tabular-nums">{row.premium}</span>
            ) : (
              muted("–")
            ),
        },
      ]}
      rows={RESULTS}
    />
  );
}

// 0: the responses coming in. 1: the results in the producer's inbox.
function Results({ step }: { step: number }) {
  if (step === 0)
    return (
      <>
        <Toolbar title="Responses" view="Sample Bakery LLC, BOP" chip={<Pill>4 of 5 in</Pill>} />
        <Responses />
      </>
    );
  return (
    <>
      <Toolbar title="Inbox" view="Producer" chip={<Pill alert>New</Pill>} />
      <div className="border-b border-deep/10 px-4 py-3">
        <p className="flex justify-between gap-3 text-deep/50">
          <span className="truncate">Placement Desk</span>
          <span className="shrink-0">9:42 AM</span>
        </p>
        <p className="mt-1 truncate font-medium">Results: Sample Bakery LLC, BOP</p>
        <p className="mt-0.5 truncate text-deep/50">
          2 quotes, 1 indication and 1 declination, record attached.
        </p>
        <p className="mt-2.5 flex gap-1.5">
          <span className="rounded-md border border-deep/10 px-1.5 py-0.5">Quotes.pdf</span>
          <span className="rounded-md border border-deep/10 px-1.5 py-0.5">Work record.pdf</span>
        </p>
      </div>
      <Responses />
    </>
  );
}

// Each stage's screen, and how many steps it has a state for.
const SCREENS: Record<
  StageName,
  { Screen: (props: { step: number }) => ReactNode; steps: number }
> = {
  intake: { Screen: Intake, steps: 2 },
  markets: { Screen: Markets, steps: 4 },
  results: { Screen: Results, steps: 2 },
};

// An editor can add stages beyond the three drawn here; those get none. A
// step beyond those drawn for its stage gets the stage's last state.
export function StageScreen({
  name,
  step = 0,
  className,
}: {
  name?: StageName;
  step?: number;
  className?: string;
}) {
  if (!name) return null;
  const { Screen, steps } = SCREENS[name];
  return (
    <Frame className={className}>
      <Screen step={Math.min(step, steps - 1)} />
    </Frame>
  );
}
