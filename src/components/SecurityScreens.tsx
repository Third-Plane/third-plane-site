import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { Frame, Pill, Table, Toolbar } from "./MockUi";

export type SecurityName =
  | "scope"
  | "access"
  | "models"
  | "supervisor"
  | "checkpoints"
  | "configured"
  | "audit"
  | "context"
  | "performance"
  | "isolation"
  | "sso"
  | "privacy";

// Mock screens for /security, one per point under authority's three stages:
// the limits the desk works within (scope, access, models), the people
// accountable for it (supervisor, checkpoints, configured) and the record it
// leaves (audit, context, performance); and one per point under data
// (isolation, sso, privacy). They're settings and records of the
// desk itself, for the same agency and book of accounts as the other mock
// screens; see MockUi for the pieces.

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

// Every action the desk took, newest first: what, through which channel and
// under whose authority (the desk's own scope, or a person's decision).
const TRAIL = [
  {
    time: "9:42",
    action: "Results returned",
    account: "Sample Bakery LLC",
    channel: "Email",
    by: "Scope",
  },
  {
    time: "9:40",
    action: "Comparison approved",
    account: "Sample Bakery LLC",
    channel: "Teams",
    by: "K. Tran",
  },
  {
    time: "9:31",
    action: "Quote retrieved",
    account: "Sample Bakery LLC",
    channel: "API",
    by: "Scope",
  },
  {
    time: "9:24",
    action: "Submitted",
    account: "Example Brewing Co.",
    channel: "Portal",
    by: "Scope",
  },
  {
    time: "9:20",
    action: "Market plan approved",
    account: "Example Brewing Co.",
    channel: "Teams",
    by: "J. Avery",
  },
  {
    time: "9:12",
    action: "Results returned",
    account: "Placeholder Mfg",
    channel: "Email",
    by: "Scope",
  },
  {
    time: "9:05",
    action: "Bind request refused",
    account: "Placeholder Mfg",
    channel: "Email",
    by: "Blocked",
  },
  {
    time: "8:58",
    action: "Follow-up sent",
    account: "Placeholder Café",
    channel: "Email",
    by: "Scope",
  },
  {
    time: "8:47",
    action: "Reply read",
    account: "Sample Bakery LLC",
    channel: "Email",
    by: "Scope",
  },
  {
    time: "8:41",
    action: "Questions answered",
    account: "Demo Auto Body",
    channel: "Portal",
    by: "Scope",
  },
  {
    time: "8:30",
    action: "Payroll requested",
    account: "Demo Dental Group",
    channel: "Email",
    by: "Scope",
  },
  { time: "8:22", action: "Tools called", account: "Sample Hardware", channel: "MCP", by: "Scope" },
  {
    time: "8:15",
    action: "Activity written",
    account: "Example Logistics",
    channel: "Applied Epic",
    by: "Scope",
  },
  {
    time: "8:09",
    action: "Remarket approved",
    account: "Example Logistics",
    channel: "Teams",
    by: "K. Tran",
  },
  {
    time: "8:02",
    action: "Loss runs pulled",
    account: "Sample Florist",
    channel: "SharePoint",
    by: "Scope",
  },
  {
    time: "7:55",
    action: "Quote retrieved",
    account: "Placeholder Properties",
    channel: "Portal",
    by: "Scope",
  },
  {
    time: "7:48",
    action: "Cleared",
    account: "Example Clinic",
    channel: "Applied Epic",
    by: "Scope",
  },
  {
    time: "7:40",
    action: "Submitted",
    account: "Example Brewing Co.",
    channel: "Email",
    by: "Scope",
  },
  {
    time: "7:31",
    action: "Appetite checked",
    account: "Sample Print Shop",
    channel: "API",
    by: "Scope",
  },
];

function Audit() {
  return (
    <>
      <Toolbar title="Audit trail" view="Today" chip={<Pill>{TRAIL.length} actions</Pill>} />
      <Table
        columns={[
          {
            label: "Action",
            cell: (row) => (
              <span className="flex min-w-0 items-center gap-2">
                <span className="w-7 shrink-0 text-deep/40 tabular-nums">{row.time}</span>
                <span className="truncate">
                  <span className="font-medium">{row.action}</span>{" "}
                  <span className="text-deep/50">{row.account}</span>
                </span>
              </span>
            ),
          },
          {
            label: "Channel",
            className: "hidden w-20 @sm:flex",
            cell: (row) => <span className="truncate text-deep/50">{row.channel}</span>,
          },
          {
            label: "Authority",
            className: "w-18",
            cell: (row) =>
              row.by === "Blocked" ? (
                <Pill alert>Blocked</Pill>
              ) : row.by === "Scope" ? (
                <Pill>Scope</Pill>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Avatar initials={row.by.replace(/[^A-Z]/g, "")} />
                  {row.by}
                </span>
              ),
          },
        ]}
        rows={TRAIL}
      />
    </>
  );
}

// One placement's record, its inputs, actions and outcomes kept together.
const RECORD: { kind: "Input" | "Action" | "Outcome"; entry: string; date: string }[] = [
  { kind: "Input", entry: "Request from J. Avery, eff. 11/01", date: "09/27" },
  { kind: "Input", entry: "ACORD 125 and 140", date: "09/28" },
  { kind: "Input", entry: "Loss runs 2023–2026", date: "09/30" },
  { kind: "Input", entry: "Schedule of values", date: "09/30" },
  { kind: "Input", entry: "Payroll and prior carrier, from producer", date: "10/01" },
  { kind: "Action", entry: "Cleared against Applied Epic", date: "09/28" },
  { kind: "Action", entry: "Missing information requested", date: "09/29" },
  { kind: "Action", entry: "Appetite checked across 20 markets", date: "09/30" },
  { kind: "Action", entry: "Market plan approved by J. Avery", date: "10/01" },
  { kind: "Action", entry: "Submitted to 5 markets by API, portal, MCP and email", date: "10/02" },
  { kind: "Action", entry: "Supplemental sent to Example Casualty", date: "10/03" },
  { kind: "Action", entry: "Qualifying questions answered", date: "10/04" },
  { kind: "Action", entry: "3 follow-ups sent", date: "10/05" },
  { kind: "Action", entry: "Flood exclusion escalated to K. Tran", date: "10/06" },
  { kind: "Outcome", entry: "2 quotes, 1 indication, 1 declination", date: "10/05" },
  { kind: "Outcome", entry: "Comparison approved by K. Tran", date: "10/06" },
  { kind: "Outcome", entry: "Results returned to J. Avery", date: "10/06" },
  { kind: "Outcome", entry: "Activities written to Applied Epic", date: "10/06" },
];

function Context() {
  return (
    <>
      <Toolbar title="Sample Bakery LLC" view="Work record · BOP" chip={<Pill>Complete</Pill>} />
      <p className="flex items-center gap-3 border-b border-deep/10 px-4 py-2 text-deep/60">
        {["5 inputs", "9 actions", "4 outcomes"].map((item, i) => (
          <span
            className={cn("inline-flex items-center gap-1", i > 1 && "hidden @xs:inline-flex")}
            key={item}
          >
            <Check />
            {item}
          </span>
        ))}
        <span className="ml-auto hidden shrink-0 text-deep/50 @md:inline">
          Kept with the account
        </span>
      </p>
      <Table
        columns={[
          { label: "Entry", cell: (row) => <span className="truncate">{row.entry}</span> },
          {
            label: "Date",
            className: "hidden w-9 @sm:flex",
            cell: (row) => <span className="text-deep/50 tabular-nums">{row.date}</span>,
          },
          {
            label: "Kind",
            className: "w-16",
            cell: (row) =>
              row.kind === "Outcome" ? <Pill alert>{row.kind}</Pill> : <Pill>{row.kind}</Pill>,
          },
        ]}
        rows={RECORD}
      />
    </>
  );
}

// The desk's quarter against the standards the agency set for it; two
// fell short, and are flagged for review.
const STANDARDS = [
  { standard: "Days to results", target: "≤ 5", actual: "4.1", met: true },
  { standard: "Markets per placement", target: "≥ 4", actual: "5.2", met: true },
  { standard: "Quotes per placement", target: "≥ 2", actual: "3.2", met: true },
  { standard: "Follow-up within 2 days", target: "100%", actual: "98%", met: false },
  { standard: "Gaps flagged at intake", target: "≥ 95%", actual: "97%", met: true },
  { standard: "Escalations answered same day", target: "100%", actual: "100%", met: true },
  { standard: "Actions outside authority", target: "0", actual: "0", met: true },
  { standard: "Plans approved before submission", target: "100%", actual: "100%", met: true },
  { standard: "Results with a work record", target: "100%", actual: "100%", met: true },
  { standard: "Declinations explained", target: "100%", actual: "96%", met: false },
  { standard: "Renewals started 60 days out", target: "≥ 90%", actual: "93%", met: true },
  { standard: "Writeback within 1 hour", target: "≥ 99%", actual: "99.6%", met: true },
  { standard: "Producer questions answered", target: "≤ 4h", actual: "1.8h", met: true },
  { standard: "Exceptions reviewed", target: "100%", actual: "100%", met: true },
  { standard: "Incumbent included at renewal", target: "100%", actual: "100%", met: true },
];

const STATS = [
  { value: "142", label: "placements" },
  { value: "4.1", label: "days to results" },
  { value: "3.2", label: "quotes each" },
  { value: "6", label: "exceptions" },
];

function Performance() {
  return (
    <>
      <Toolbar title="Desk performance" view="Q3 2026" chip={<Pill alert>2 to review</Pill>} />
      <div className="grid grid-cols-2 border-b border-deep/10 @md:grid-cols-4">
        {STATS.map((stat, i) => (
          <p
            className={cn(
              "border-deep/10 px-4 py-2.5",
              i % 2 === 1 && "border-l",
              i > 1 && "hidden @md:block @md:border-l",
            )}
            key={stat.label}
          >
            <span className="block font-heading text-lg font-medium tracking-tight tabular-nums">
              {stat.value}
            </span>
            <span className="block truncate text-deep/50">{stat.label}</span>
          </p>
        ))}
      </div>
      <Table
        columns={[
          { label: "Standard", cell: (row) => <span className="truncate">{row.standard}</span> },
          {
            label: "Target",
            className: "hidden w-12 justify-end @sm:flex",
            cell: (row) => <span className="text-deep/50 tabular-nums">{row.target}</span>,
          },
          {
            label: "Actual",
            className: "w-12 justify-end",
            cell: (row) => <span className="font-medium tabular-nums">{row.actual}</span>,
          },
          {
            label: "Status",
            className: "w-16 justify-end",
            cell: (row) => (row.met ? <Pill>Met</Pill> : <Pill alert>Review</Pill>),
          },
        ]}
        rows={STANDARDS}
      />
    </>
  );
}

// Where the agency's data is kept: every store its own, under its own key.
const STORES = [
  { store: "Documents", detail: "Applications, loss runs, schedules" },
  { store: "Activity record", detail: "Every action the desk took" },
  { store: "Work records", detail: "One per submission" },
  { store: "Search index", detail: "Built from your documents only" },
  { store: "Email archive", detail: "desk@sampleagency.example" },
  { store: "Chat history", detail: "Teams › Renewals, Placement" },
  { store: "Market plans", detail: "By account and line" },
  { store: "Quotes and comparisons", detail: "As returned to producers" },
  { store: "Carrier credentials", detail: "Portal and API logins" },
  { store: "Settings", detail: "Authority, review points, models" },
  { store: "Reports", detail: "Weekly desk reporting" },
  { store: "Model logs", detail: "Inputs and outputs, by task" },
  { store: "Audit log", detail: "Sign-ins and setting changes" },
  { store: "Backups", detail: "Nightly, same region" },
  { store: "Exports", detail: "Data warehouse › Desk" },
  { store: "Attachments cache", detail: "Cleared after writeback" },
  { store: "Templates", detail: "Letterhead and signatures" },
];

function Isolation() {
  return (
    <>
      <Toolbar title="Data" view="Sample Agency" chip={<Pill>Isolated</Pill>} />
      <p className="flex items-center gap-3 border-b border-deep/10 px-4 py-2 text-deep/60">
        {["Own tenant", "Own keys", "No shared indexes"].map((item, i) => (
          <span
            className={cn("inline-flex items-center gap-1", i > 1 && "hidden @sm:inline-flex")}
            key={item}
          >
            <Check />
            {item}
          </span>
        ))}
      </p>
      <Table
        columns={[
          {
            label: "Store",
            cell: (row) => (
              <span className="truncate">
                <span className="font-medium">{row.store}</span>{" "}
                <span className="hidden text-deep/50 @sm:inline">{row.detail}</span>
              </span>
            ),
          },
          {
            label: "Key",
            className: "hidden w-28 @md:flex",
            cell: () => (
              <span className="truncate font-mono text-[0.625rem] text-deep/50">
                kms/sampleagency
              </span>
            ),
          },
          { label: "Shared", className: "w-14", cell: () => <Pill>None</Pill> },
        ]}
        rows={STORES}
      />
    </>
  );
}

// The people who can reach the desk, all signed in through the agency's own
// identity provider, each with a role.
const PEOPLE = [
  { name: "K. Tran", role: "Supervisor", group: "Placement" },
  { name: "J. Avery", role: "Producer", group: "Commercial" },
  { name: "S. Ortiz", role: "Producer", group: "Commercial" },
  { name: "M. Okafor", role: "Admin", group: "IT" },
  { name: "R. Patel", role: "Account manager", group: "Commercial" },
  { name: "L. Nguyen", role: "Account manager", group: "Commercial" },
  { name: "D. Brooks", role: "Producer", group: "Small business" },
  { name: "A. Kim", role: "Account manager", group: "Small business" },
  { name: "T. Russo", role: "Producer", group: "Transportation" },
  { name: "E. Walsh", role: "Account manager", group: "Transportation" },
  { name: "C. Diaz", role: "Producer", group: "Construction" },
  { name: "H. Laurent", role: "Account manager", group: "Construction" },
  { name: "P. Shah", role: "Viewer", group: "Leadership" },
  { name: "G. Moreno", role: "Viewer", group: "Finance" },
  { name: "B. Ellis", role: "Producer", group: "Healthcare" },
  { name: "N. Fischer", role: "Account manager", group: "Healthcare" },
  { name: "O. Grant", role: "Viewer", group: "Compliance" },
];

function Sso() {
  return (
    <>
      <Toolbar title="Access" view="People and roles" chip={<Pill>SSO enforced</Pill>} />
      <p className="flex items-center gap-1.5 border-b border-deep/10 px-4 py-2">
        <span className="mr-1 shrink-0 text-deep/50">Sign-in</span>
        <Pill>Your identity provider</Pill>
        <span className="hidden @xs:inline">
          <Pill>MFA required</Pill>
        </span>
        <span className="ml-auto hidden shrink-0 text-deep/50 @md:inline">No desk passwords</span>
      </p>
      <Table
        columns={[
          {
            label: "Person",
            cell: (row) => (
              <span className="flex min-w-0 items-center gap-1.5">
                <Avatar initials={row.name.replace(/[^A-Z]/g, "")} />
                <span className="truncate">{row.name}</span>
              </span>
            ),
          },
          {
            label: "Group",
            className: "hidden w-24 @sm:flex",
            cell: (row) => <span className="truncate text-deep/50">{row.group}</span>,
          },
          {
            label: "Role",
            className: "w-24",
            cell: (row) =>
              row.role === "Supervisor" || row.role === "Admin" ? (
                <Pill alert>{row.role}</Pill>
              ) : (
                <Pill>{row.role}</Pill>
              ),
          },
        ]}
        rows={PEOPLE}
      />
    </>
  );
}

// What the desk reads and writes, and where each kind of content stays.
const CONTENT = [
  { content: "Prompts", kept: "Desk workspace" },
  { content: "Completions", kept: "Desk workspace" },
  { content: "ACORD applications", kept: "SharePoint › Clients" },
  { content: "Loss runs", kept: "SharePoint › Clients" },
  { content: "Schedules of values", kept: "SharePoint › Clients" },
  { content: "Payroll reports", kept: "SharePoint › Clients" },
  { content: "Policy forms", kept: "SharePoint › Clients" },
  { content: "Underwriter email", kept: "Outlook" },
  { content: "Producer email", kept: "Outlook" },
  { content: "Chat messages", kept: "Teams" },
  { content: "Activities", kept: "Applied Epic" },
  { content: "Attachments", kept: "Applied Epic" },
  { content: "Market plans", kept: "Applied Epic" },
  { content: "Quotes", kept: "Applied Epic" },
  { content: "Comparisons", kept: "Applied Epic" },
  { content: "Work records", kept: "Desk workspace" },
  { content: "Reports", kept: "Data warehouse › Desk" },
];

function Privacy() {
  return (
    <>
      <Toolbar title="Content" view="Where it stays" chip={<Pill>0 outside</Pill>} />
      <p className="flex items-center gap-3 border-b border-deep/10 px-4 py-2 text-deep/60">
        <span className="shrink-0 text-deep/50">Models</span>
        {["No training on your data", "No retention"].map((item, i) => (
          <span
            className={cn("inline-flex items-center gap-1", i > 0 && "hidden @sm:inline-flex")}
            key={item}
          >
            <Check />
            {item}
          </span>
        ))}
      </p>
      <Table
        columns={[
          { label: "Content", cell: (row) => <span className="truncate">{row.content}</span> },
          {
            label: "Stays in",
            className: "hidden w-36 @sm:flex",
            cell: (row) => <span className="truncate text-deep/50">{row.kept}</span>,
          },
          { label: "Status", className: "w-16", cell: () => <Pill>Private</Pill> },
        ]}
        rows={CONTENT}
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
  audit: Audit,
  context: Context,
  performance: Performance,
  isolation: Isolation,
  sso: Sso,
  privacy: Privacy,
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
