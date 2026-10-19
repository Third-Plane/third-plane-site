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

// What the desk may do, and through which channels. The last few are left to
// people: to the producer or the supervisor, or to no one at the desk.
const ACTIONS = [
  { action: "Clear submissions against the AMS", channels: "Applied Epic", on: true },
  { action: "Request missing information", channels: "Email · Teams", on: true },
  { action: "Pull loss runs and documents", channels: "SharePoint · Email", on: true },
  { action: "Check carrier appetite", channels: "Portal · API", on: true },
  { action: "Draft a market plan", channels: "Applied Epic", on: true },
  { action: "Submit to appointed markets", channels: "Portal · API · MCP · Email", on: true },
  { action: "Answer qualifying questions", channels: "Portal", on: true },
  { action: "Complete supplemental applications", channels: "Portal · Email", on: true },
  { action: "Follow up with underwriters", channels: "Email", on: true },
  { action: "Retrieve quotes and indications", channels: "Portal · API · MCP", on: true },
  { action: "Compare quotes", channels: "Applied Epic", on: true },
  { action: "Return results to producers", channels: "Email · Teams", on: true },
  { action: "Write activities to the AMS", channels: "Applied Epic", on: true },
  { action: "Attach documents to the account", channels: "Applied Epic", on: true },
  { action: "Post updates to the renewals channel", channels: "Teams", on: true },
  { action: "Approve the market plan", channels: "Producer", on: false },
  { action: "Change limits or deductibles", channels: "Producer", on: false },
  { action: "Accept quoted terms", channels: "Supervisor", on: false },
  { action: "Submit to non-appointed markets", channels: "Supervisor", on: false },
  { action: "Bind or issue coverage", channels: "Never", on: false },
  { action: "Cancel or endorse a policy", channels: "Never", on: false },
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
        <span className="ml-auto hidden shrink-0 text-deep/50 @md:inline">20 markets</span>
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
  { system: "Applied Epic › Attachments", access: "Read · Write", status: "active" },
  { system: "SharePoint › Clients", access: "Read", status: "active" },
  { system: "SharePoint › Templates", access: "Read", status: "active" },
  { system: "Carrier portals (12)", access: "Submit · Retrieve", status: "active" },
  { system: "Carrier APIs (4)", access: "Submit · Retrieve", status: "active" },
  { system: "Carrier MCP servers (2)", access: "Call quoting tools", status: "active" },
  { system: "Shared drive › Finance", access: "Read", status: "removed" },
  { system: "desk@sampleagency.example", access: "Send · Receive", status: "active" },
  { system: "renewals@sampleagency.example", access: "Receive", status: "active" },
  { system: "Teams › Renewals", access: "Read · Post", status: "active" },
  { system: "Teams › Placement", access: "Read · Post", status: "active" },
  { system: "Outlook calendar › Producers", access: "Read", status: "active" },
  { system: "Comparative rater", access: "Read", status: "active" },
  { system: "Document intake", access: "Read", status: "active" },
  { system: "Data warehouse › Desk", access: "Write", status: "active" },
  { system: "Shared drive › Clients", access: "Read", status: "active" },
  { system: "E-signature", access: "Send for signature", status: "active" },
  { system: "Payroll reports inbox", access: "Receive", status: "active" },
  { system: "Loss control portal", access: "Read", status: "active" },
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
  { task: "Classify incoming email", model: "Model A" },
  { task: "Clear submissions", model: "Model A" },
  { task: "Extract ACORD fields", model: "Model C" },
  { task: "Match documents to accounts", model: "Model A" },
  { task: "Flag missing information", model: "Model B" },
  { task: "Check carrier appetite", model: "Model B" },
  { task: "Draft market plans", model: "Model B" },
  { task: "Answer portal questions", model: "Model A" },
  { task: "Fill supplemental applications", model: "Model C" },
  { task: "Draft underwriter emails", model: "Model B" },
  { task: "Read underwriter replies", model: "Model A" },
  { task: "Extract quote terms", model: "Model C" },
  { task: "Spot coverage gaps", model: "Model B" },
  { task: "Compare quotes", model: "Model B" },
  { task: "Summarize results for producers", model: "Model A" },
  { task: "Write AMS activities", model: "Model A" },
  { task: "Check for exclusions", model: "Model C" },
  { task: "Write the work record", model: "Model A" },
];

function Models() {
  return (
    <>
      <Toolbar title="Placement Desk" view="Settings › Models" chip={<Pill>By task</Pill>} />
      {/* What stays put when a model changes. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-deep/10 px-4 py-2 text-deep/60">
        <span className="text-deep/50">Unchanged</span>
        {["Authority", "Review points", "Access", "Record"].map((item) => (
          <span className="inline-flex items-center gap-1" key={item}>
            <Check />
            {item}
          </span>
        ))}
      </div>
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
  { name: "Placeholder Properties", decision: "Accept a higher retention?", status: "approved" },
  { name: "Example Brewing Co.", decision: "Submit with a late loss run?", status: "approved" },
  { name: "Demo Landscaping", decision: "Drop tree work over 30 feet?", status: "declined" },
  {
    name: "Sample Builders Inc.",
    decision: "Release results before all are in?",
    status: "approved",
  },
  { name: "Placeholder Café", decision: "Add a second follow-up market?", status: "approved" },
  { name: "Example Clinic", decision: "Accept a payroll audit condition?", status: "approved" },
  { name: "Demo Auto Body", decision: "Split garage and auto?", status: "approved" },
  { name: "Sample Florist", decision: "Skip the incumbent at renewal?", status: "declined" },
  {
    name: "Placeholder Plumbing",
    decision: "Quote with a subcontractor exclusion?",
    status: "declined",
  },
  { name: "Example Fitness", decision: "Add abuse and molestation cover?", status: "approved" },
  { name: "Demo Veterinary", decision: "Move to a claims-made form?", status: "declined" },
  { name: "Sample Print Shop", decision: "Accept a 30-day quote window?", status: "approved" },
  { name: "Placeholder Trucking", decision: "Add a non-appointed market?", status: "declined" },
  { name: "Example Roofing", decision: "Submit with open claims?", status: "approved" },
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
  { step: "Receive the request" },
  { step: "Clear against the AMS" },
  { step: "Gather documents and loss runs" },
  { step: "Extract application data" },
  { step: "Request missing information" },
  { step: "Check carrier appetite" },
  { step: "Choose markets", stop: "Producer approves" },
  { step: "Prepare submissions" },
  { step: "Submit by portal, API, MCP or email" },
  { step: "Answer qualifying questions" },
  { step: "Complete supplementals" },
  { step: "Follow up with underwriters" },
  { step: "Retrieve quotes and indications" },
  { step: "Compare quotes", stop: "Supervisor reviews" },
  { step: "Write the comparison" },
  { step: "Return results to producer" },
  { step: "Record activities in the AMS" },
  { step: "Close the work record" },
  { step: "Report to agency leadership" },
  { step: "Schedule the next renewal" },
  { step: "Review the desk’s month" },
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
  { item: "Lines", detail: "BOP, GL, WC, Auto, Property" },
  { item: "Markets", detail: "20 appointed, by line and appetite" },
  { item: "Channels", detail: "Portals, APIs, MCP servers, email" },
  { item: "Authority", detail: "5 lines, 20 markets, 21 actions" },
  { item: "Review points", detail: "Market selection, quote comparison" },
  { item: "Supervisor", detail: "K. Tran" },
  { item: "Escalation", detail: "To K. Tran within 2 business hours" },
  { item: "Producers", detail: "14, each with their own book" },
  { item: "Reporting", detail: "Weekly, to K. Tran and agency leadership" },
  { item: "Record", detail: "Every action, kept with its account" },
  { item: "AMS writeback", detail: "Activities and attachments" },
  { item: "Email", detail: "desk@sampleagency.example" },
  { item: "Teams", detail: "Renewals and placement channels" },
  { item: "Templates", detail: "Agency letterhead and signatures" },
  { item: "Business hours", detail: "7am–7pm CT, follow-ups on weekdays" },
  { item: "Models", detail: "Chosen by task, reviewed quarterly" },
  { item: "Retention", detail: "Records kept 7 years" },
  { item: "Notifications", detail: "Producers by email, supervisor in Teams" },
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
export function SecurityScreen({ name }: { name?: SecurityName }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame>
      <Screen />
    </Frame>
  );
}
