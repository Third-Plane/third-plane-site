import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { BOOK } from "./book";
import { Frame, Pill, Table, Toolbar, type Column } from "./MockUi";

export type ScreenName = "renewed" | "overdue" | "unassigned" | "revenue";

// Mock AMS screens for the homepage's problems, one per point. The point's
// title and body say the same thing in words; see MockUi for the pieces.

type Policy = { name: string; line: string };

function Account({ name, line }: Policy) {
  return (
    <span className="truncate">
      <span className="font-medium">{name}</span> <span className="text-deep/50">{line}</span>
    </span>
  );
}

const account: Column<Policy> = { label: "Account", cell: Account };

// One dot per appointed market, filled for the ones approached.
function MarketDots({ shopped, of }: { shopped: number; of: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: of }, (_, i) => (
        <i
          className={cn("size-1.5 rounded-full", i < shopped ? "bg-purple" : "bg-deep/10")}
          key={i}
        />
      ))}
    </span>
  );
}

// A renewal a day through November, each shopped to one market of its many.
const RENEWED = BOOK.map((policy, i) => ({
  ...policy,
  expires: `Nov ${String(i + 1).padStart(2, "0")}`,
  markets: [12, 9, 7, 11, 8, 10, 6, 9, 11, 12, 8, 7, 10, 9, 6, 11, 12, 7, 8, 10, 9, 11, 6, 8][i],
}));

function Renewed() {
  return (
    <>
      <Toolbar title="Renewals" view="Renewed as-is" chip={<Pill>38 this month</Pill>} />
      <Table
        columns={[
          account,
          { label: "Expires", className: "hidden w-12 @md:flex", cell: (row) => row.expires },
          {
            label: "Markets",
            className: "hidden w-24 @sm:flex",
            cell: (row) => <MarketDots shopped={1} of={row.markets} />,
          },
          { label: "Action", className: "w-22", cell: () => <Pill>Auto-renewed</Pill> },
        ]}
        rows={RENEWED}
      />
    </>
  );
}

// Quotes outstanding, soonest expiry first: the closer the renewal, the longer
// its quote has been late.
const OVERDUE_CARRIERS = ["Demo Mutual", "Example Specialty", "Sample Carrier Co."];
const OVERDUE = BOOK.map((policy, i) => ({
  ...policy,
  carrier: OVERDUE_CARRIERS[i % OVERDUE_CARRIERS.length],
  expires: 6 + i * 2,
  late: Math.max(1, 9 - Math.floor(i / 3)),
}));

function Overdue() {
  return (
    <>
      <Toolbar title="Renewals" view="Quotes outstanding" chip={<Pill alert>31 overdue</Pill>} />
      <Table
        columns={[
          account,
          {
            label: "Carrier",
            className: "hidden w-28 @md:flex",
            cell: (row) => <span className="truncate">{row.carrier}</span>,
          },
          {
            label: "Expires",
            className: "hidden w-12 @sm:flex",
            cell: (row) => (
              <span className={cn(row.expires < 10 && "font-medium text-purple")}>
                in {row.expires}d
              </span>
            ),
          },
          { label: "Quote", className: "w-22", cell: (row) => <Pill alert>{row.late}d late</Pill> },
        ]}
        rows={OVERDUE}
      />
    </>
  );
}

// One renewal has an owner, so the rest read as a gap rather than a column.
const UNASSIGNED: (Policy & { expires: number; owner?: string })[] = BOOK.map((policy, i) => ({
  ...policy,
  expires: 88 - Math.round(i * 1.5),
  owner: i === 2 ? "K. Tran" : undefined,
}));

function Owner({ owner }: { owner?: string }) {
  if (!owner) {
    return (
      <span className="inline-flex items-center gap-1.5 text-deep/50">
        <i className="size-4 rounded-full border border-dashed border-deep/30" />
        Unassigned
      </span>
    );
  }
  const initials = owner.replace(/[^A-Z]/g, "");
  return (
    <span className="inline-flex items-center gap-1.5">
      <i className="grid size-4 place-items-center rounded-full bg-purple text-[0.5rem] font-medium text-white not-italic">
        {initials}
      </i>
      {owner}
    </span>
  );
}

function Unassigned() {
  return (
    <>
      <Toolbar title="Renewals" view="Next 90 days" chip={<Pill alert>23 unassigned</Pill>} />
      <Table
        columns={[
          account,
          {
            label: "Expires",
            className: "hidden w-12 @md:flex",
            cell: (row) => `in ${row.expires}d`,
          },
          { label: "Owner", className: "w-24", cell: (row) => <Owner owner={row.owner} /> },
          {
            label: "Status",
            className: "hidden w-20 @sm:flex",
            cell: (row) =>
              row.owner ? (
                <Pill>In progress</Pill>
              ) : (
                <span className="text-deep/50">Not started</span>
              ),
          },
        ]}
        rows={UNASSIGNED}
      />
    </>
  );
}

// Monthly revenue on a 0–100 scale: six months booked, six projected, and the
// target the book was meant to reach.
const BOOKED = [70, 71, 69.5, 71, 70.5, 71.5, 71];
const PROJECTED = [71, 71.5, 71, 72, 71.5, 72];
const TARGET = [70, 72, 74, 76.5, 79, 81, 83.5, 86, 88, 90.5, 93, 95];

const W = 300;
const H = 100;
const x = (month: number) => (month * W) / 11;
// The chart's floor is 60, so the flat line sits in the lower half.
const y = (value: number) => ((100 - value) / 40) * H;
const points = (values: number[], from = 0) =>
  values.map((v, i) => `${x(from + i)},${y(v)}`).join(" ");

function Revenue() {
  const today = x(BOOKED.length - 1);
  return (
    <>
      <Toolbar title="Revenue" view="12-month projection" chip={<Pill>+0.4% YoY</Pill>} />
      <div className="flex min-h-0 flex-1 flex-col px-4 pt-3 pb-3">
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-medium tracking-tight tabular-nums">
              $4.21M
            </span>
            <span className="text-deep/50">projected</span>
          </div>
          <div className="hidden items-center gap-3 text-deep/50 @sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-3 rounded-full bg-purple" />
              Projected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-3 rounded-full bg-deep/25" />
              Growth target
            </span>
          </div>
        </div>
        <svg
          className="mt-2 min-h-0 w-full flex-1 overflow-visible"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <g className="stroke-deep/8" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <path d={`M0 ${H * f}H${W}`} key={f} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <polygon className="fill-lavender" points={`0,${H} ${points(BOOKED)} ${today},${H}`} />
          <path
            className="stroke-deep/15"
            d={`M${today} 0V${H}`}
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
          />
          <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline
              className="stroke-deep/25"
              points={points(TARGET)}
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              className="stroke-purple"
              points={points(BOOKED)}
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              className="stroke-purple"
              points={points(PROJECTED, BOOKED.length - 1)}
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>
        <div className="mt-1.5 flex justify-between text-deep/40">
          {["Apr", "Jul", "Oct", "Jan", "Mar"].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </>
  );
}

const SCREENS: Record<ScreenName, () => ReactNode> = {
  renewed: Renewed,
  overdue: Overdue,
  unassigned: Unassigned,
  revenue: Revenue,
};

// An editor can add problem points beyond the four drawn here; those get none.
export function ProblemScreen({ name }: { name?: ScreenName }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame>
      <Screen />
    </Frame>
  );
}
