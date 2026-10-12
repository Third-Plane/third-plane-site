import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { Frame, Pill, Table, Toolbar } from "./MockUi";

export type SecurityName =
  | "scope"
  | "access"
  | "models"
  | "supervisor"
  | "checkpoints"
  | "configured";

// Mock screens for /security, one per point under authority's two sides: the
// limits the desk works within (scope, access, models) and the people
// accountable for it (supervisor, checkpoints, configured). They're settings
// and records of the desk itself, for the same agency and book of accounts as
// the other mock screens; see MockUi for the pieces.

// An on/off setting.
function Switch({ on }: { on: boolean }) {
  return (
    <i className={cn("relative h-3 w-5 shrink-0 rounded-full", on ? "bg-purple" : "bg-deep/15")}>
      <i
        className={cn(
          "absolute top-0.5 size-2 rounded-full bg-white shadow-sm",
          on ? "right-0.5" : "left-0.5",
        )}
      />
    </i>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-3 shrink-0 text-purple", className)}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}

// A person's initials in a circle; the desk's own mark is "PD".
function Avatar({ initials, desk = false }: { initials: string; desk?: boolean }) {
  return (
    <i
      className={cn(
        "grid size-4 shrink-0 place-items-center rounded-full text-[0.5rem] font-medium not-italic",
        desk ? "bg-purple text-white" : "bg-pink text-purple",
      )}
    >
      {initials}
    </i>
  );
}

// What the desk may do, and through which channels. The last two are left to
// people: one to the supervisor, one to no one at the desk.
const ACTIONS = [
  { action: "Submit to appointed markets", channels: "Portal · API · Email", on: true },
  { action: "Answer qualifying questions", channels: "Portal", on: true },
  { action: "Follow up with underwriters", channels: "Email", on: true },
  { action: "Write activities to the AMS", channels: "Applied Epic", on: true },
  { action: "Accept quoted terms", channels: "Supervisor", on: false },
  { action: "Bind or issue coverage", channels: "Never", on: false },
];

function Scope() {
  return (
    <>
      <Toolbar title="Placement Desk" view="Settings › Authority" chip={<Pill>Scoped</Pill>} />
      <p className="flex items-center gap-1.5 border-b border-deep/10 px-4 py-2">
        <span className="mr-1 shrink-0 text-deep/50">Lines</span>
        {["BOP", "GL", "WC", "Auto", "Property"].map((line, i) => (
          <span className={cn(i > 2 && "hidden @sm:inline")} key={line}>
            <Pill>{line}</Pill>
          </span>
        ))}
        <span className="ml-auto hidden shrink-0 text-deep/50 @md:inline">12 markets</span>
      </p>
      <Table
        columns={[
          { label: "Action", cell: (row) => <span className="truncate">{row.action}</span> },
          {
            label: "Where",
            className: "hidden w-28 @sm:flex",
            cell: (row) => <span className="truncate text-deep/50">{row.channels}</span>,
          },
          { label: "Allowed", className: "w-12", cell: (row) => <Switch on={row.on} /> },
        ]}
        rows={ACTIONS}
      />
    </>
  );
}

// The systems the desk is connected to; one has just been taken away.
const CONNECTIONS = [
  { system: "Applied Epic", access: "Read · Write activities", status: "active" },
  { system: "SharePoint › Clients", access: "Read", status: "active" },
  { system: "Carrier portals (12)", access: "Submit · Retrieve", status: "active" },
  { system: "Shared drive › Finance", access: "Read", status: "removed" },
  { system: "desk@sampleagency.example", access: "Send · Receive", status: "active" },
  { system: "Teams › Renewals", access: "Read · Post", status: "active" },
];

function Access() {
  return (
    <>
      <Toolbar title="Access" view="Connected systems" chip={<Pill alert>1 removed</Pill>} />
      <p className="flex items-center gap-1.5 border-b border-deep/10 bg-lavender/60 px-4 py-2">
        <Avatar initials="KT" />
        <span className="truncate">
          <span className="font-medium">K. Tran</span> removed Shared drive › Finance.{" "}
          <span className="text-deep/50">4 open submissions unaffected.</span>
        </span>
      </p>
      <Table
        columns={[
          {
            label: "System",
            cell: (row) => (
              <span
                className={cn("truncate", row.status === "removed" && "text-deep/40 line-through")}
              >
                {row.system}
              </span>
            ),
          },
          {
            label: "Access",
            className: "hidden w-32 @sm:flex",
            cell: (row) => <span className="truncate text-deep/50">{row.access}</span>,
          },
          {
            label: "Status",
            className: "w-18",
            cell: (row) =>
              row.status === "removed" ? <Pill alert>Removed</Pill> : <Pill>Active</Pill>,
          },
        ]}
        rows={CONNECTIONS}
      />
    </>
  );
}

// The model behind each task, one of them just changed. They're lettered
// rather than named: the point is that the desk doesn't depend on one.
const TASKS = [
  { task: "Read loss runs and schedules", model: "Model C", was: "Model A" },
  { task: "Answer portal questions", model: "Model A" },
  { task: "Draft underwriter emails", model: "Model B" },
  { task: "Compare quotes", model: "Model B" },
  { task: "Summarize results for producers", model: "Model A" },
];

function Models() {
  return (
    <>
      <Toolbar title="Placement Desk" view="Settings › Models" chip={<Pill>By task</Pill>} />
      <Table
        columns={[
          { label: "Task", cell: (row) => <span className="truncate">{row.task}</span> },
          {
            label: "Model",
            className: "w-16 justify-end gap-2 @sm:w-32",
            cell: (row) =>
              row.was ? (
                <>
                  <span className="hidden text-deep/40 line-through @sm:inline">{row.was}</span>
                  <Pill alert>{row.model}</Pill>
                </>
              ) : (
                <Pill>{row.model}</Pill>
              ),
          },
        ]}
        rows={TASKS}
      />
      {/* What stays put when a model changes. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-deep/60">
        <span className="text-deep/50">Unchanged</span>
        {["Authority", "Review points", "Access", "Record"].map((item) => (
          <span className="inline-flex items-center gap-1" key={item}>
            <Check />
            {item}
          </span>
        ))}
      </div>
    </>
  );
}

// The calls that came back to the desk's supervisor, newest first.
const ESCALATIONS = [
  {
    name: "Sample Bakery LLC",
    decision: "Accept terms with a flood exclusion?",
    status: "waiting",
  },
  { name: "Example Logistics", decision: "Remarket after non-renewal?", status: "approved" },
  { name: "Demo Dental Group", decision: "Go to market without payroll?", status: "declined" },
  { name: "Placeholder Mfg", decision: "Add an E&S market?", status: "approved" },
  { name: "Sample Hardware", decision: "Quote above the TIV limit?", status: "declined" },
];

function Supervisor() {
  return (
    <>
      <Toolbar title="Placement Desk" view="Supervision" chip={<Pill alert>1 waiting</Pill>} />
      <div className="flex items-center gap-2.5 border-b border-deep/10 px-4 py-2.5">
        <i className="grid size-7 shrink-0 place-items-center rounded-full bg-pink text-[0.625rem] font-medium text-purple not-italic">
          KT
        </i>
        <p className="min-w-0">
          <span className="block truncate font-medium">K. Tran</span>
          <span className="block truncate text-deep/50">
            Supervisor · owns this desk’s outcomes
          </span>
        </p>
      </div>
      <Table
        columns={[
          {
            label: "Escalated",
            cell: (row) => (
              <span className="truncate">
                <span className="font-medium">{row.name}</span>{" "}
                <span className="text-deep/50">{row.decision}</span>
              </span>
            ),
          },
          {
            label: "Decision",
            className: "w-18",
            cell: (row) =>
              row.status === "waiting" ? (
                <Pill alert>Waiting</Pill>
              ) : (
                <Pill>{row.status === "approved" ? "Approved" : "Declined"}</Pill>
              ),
          },
        ]}
        rows={ESCALATIONS}
      />
    </>
  );
}

// The desk's steps, and where it stops for a person.
const STEPS = [
  { step: "Intake and clearance" },
  { step: "Choose markets", stop: "Producer approves" },
  { step: "Submit and answer questions" },
  { step: "Follow up with underwriters" },
  { step: "Compare quotes", stop: "Supervisor reviews" },
  { step: "Return results to producer" },
];

function Checkpoints() {
  return (
    <>
      <Toolbar title="Placement workflow" view="Review points" chip={<Pill>2 stops</Pill>} />
      <ol>
        {STEPS.map((row, i) => (
          <li
            className={cn(
              "flex items-center gap-3 border-b border-deep/5 px-4 py-2",
              row.stop && "bg-lavender/60",
            )}
            key={row.step}
          >
            <span className="w-3 shrink-0 text-deep/40 tabular-nums">{i + 1}</span>
            <span className="min-w-0 flex-1 truncate">{row.step}</span>
            {row.stop ? (
              <span className="hidden shrink-0 items-center gap-1.5 font-medium text-purple @sm:inline-flex">
                <i className="size-1.5 rounded-full bg-purple" />
                {row.stop}
              </span>
            ) : null}
            <Switch on={Boolean(row.stop)} />
          </li>
        ))}
      </ol>
    </>
  );
}

// What comes set up with the desk, rather than left for the agency to build.
const SETUP = [
  { item: "Access", detail: "Applied Epic, SharePoint, Outlook, Teams" },
  { item: "Authority", detail: "5 lines, 12 markets, 6 actions" },
  { item: "Review points", detail: "Market selection, quote comparison" },
  { item: "Supervisor", detail: "K. Tran" },
  { item: "Reporting", detail: "Weekly, to K. Tran and agency leadership" },
  { item: "Record", detail: "Every action, kept with its account" },
];

function Configured() {
  return (
    <>
      <Toolbar title="Placement Desk" view="Sample Agency" chip={<Pill>Live</Pill>} />
      <p className="flex items-center gap-1.5 border-b border-deep/10 px-4 py-2 text-deep/50">
        <Avatar initials="PD" desk />
        <span className="truncate">Configured for your agency · Live since 09/15</span>
      </p>
      <Table
        columns={[
          {
            label: "Setup",
            cell: (row) => (
              <span className="flex min-w-0 items-center gap-2">
                <Check />
                <span className="w-20 shrink-0 font-medium">{row.item}</span>
                <span className="hidden truncate text-deep/50 @sm:inline">{row.detail}</span>
              </span>
            ),
          },
          { label: "Status", className: "w-16", cell: () => <Pill>Ready</Pill> },
        ]}
        rows={SETUP}
      />
    </>
  );
}

const SCREENS: Record<SecurityName, () => ReactNode> = {
  scope: Scope,
  access: Access,
  models: Models,
  supervisor: Supervisor,
  checkpoints: Checkpoints,
  configured: Configured,
};

// An editor can add points beyond the ones drawn here; those get none.
// `className` goes to the Frame.
export function SecurityScreen({ name, className }: { name?: SecurityName; className?: string }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame className={className}>
      <Screen />
    </Frame>
  );
}
