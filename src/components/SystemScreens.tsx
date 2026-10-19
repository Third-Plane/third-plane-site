import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { BOOK } from "./book";
import { Frame, Pill, Table, Toolbar } from "./MockUi";

export type SystemName = "ams" | "documents" | "inbox" | "data";

// Mock screens for the systems the desk works in: an agency management
// system, a document repository, an inbox and a spreadsheet. They are generic
// on purpose, the kind of system rather than any vendor's product. Each shows
// the desk's own work in that system, all for the same book of accounts as the
// other mock screens; see MockUi for the pieces.

// A list of sections down the left of a screen, shown once there's room.
function Sidebar({ items, active }: { items: string[]; active: string }) {
  return (
    <ul className="hidden w-28 shrink-0 border-deep/10 bg-cream/60 py-2 first:border-r last:border-l @md:block">
      {items.map((item) => (
        <li
          className={cn(
            "truncate px-3 py-1.5",
            item === active ? "bg-lavender font-medium text-purple" : "text-deep/60",
          )}
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

// The desk's own mark where a person's avatar would be.
function DeskAvatar() {
  return (
    <i className="grid size-4 shrink-0 place-items-center rounded-full bg-purple text-[0.5rem] font-medium text-white not-italic">
      PD
    </i>
  );
}

// A short code or file type in a box, ahead of a row's name.
function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="mr-2 inline-block w-8 shrink-0 rounded-sm bg-lavender py-px text-center text-[0.5625rem] font-medium tracking-wide text-purple">
      {children}
    </span>
  );
}

// The activities the desk wrote back to an account, newest first.
const ACTIVITIES = [
  { code: "RSLT", activity: "Results returned to producer", date: "10/06", done: true },
  { code: "QUOT", activity: "Quote received: Sample Carrier Co.", date: "10/05", done: true },
  { code: "FLUP", activity: "Follow-up sent: Example Specialty", date: "10/05", done: false },
  { code: "QUOT", activity: "Quote received: Demo Mutual", date: "10/05", done: true },
  { code: "DECL", activity: "Declination: Example Casualty, cooking", date: "10/04", done: true },
  { code: "ANSR", activity: "Underwriter questions answered", date: "10/04", done: true },
  { code: "SUPP", activity: "Supplemental sent: Example Casualty", date: "10/03", done: true },
  { code: "SUBM", activity: "Submitted to Example Specialty by email", date: "10/03", done: true },
  {
    code: "SUBM",
    activity: "Submitted to Placeholder Insurance by MCP",
    date: "10/02",
    done: true,
  },
  { code: "SUBM", activity: "Submitted to Demo Mutual by portal", date: "10/02", done: true },
  { code: "SUBM", activity: "Submitted to Sample Carrier Co. by API", date: "10/02", done: true },
  { code: "MKTS", activity: "Market plan approved by producer", date: "10/01", done: true },
  { code: "NOTE", activity: "Prior carrier confirmed by producer", date: "10/01", done: true },
  { code: "APPT", activity: "Appetite checked: 20 markets", date: "09/30", done: true },
  { code: "ATTC", activity: "Loss runs attached to the account", date: "09/30", done: true },
  { code: "INFO", activity: "Payroll requested from producer", date: "09/29", done: true },
  { code: "INFO", activity: "Prior carrier requested from producer", date: "09/29", done: true },
  { code: "ATTC", activity: "ACORD 140 attached to the account", date: "09/28", done: true },
  { code: "ATTC", activity: "ACORD 125 attached to the account", date: "09/28", done: true },
  { code: "CLRD", activity: "Cleared: no other submissions found", date: "09/28", done: true },
  { code: "RNWL", activity: "Renewal marketing started", date: "09/28", done: true },
  { code: "RQST", activity: "Request received from J. Avery", date: "09/27", done: true },
  { code: "NOTE", activity: "Renewal flagged at 35 days out", date: "09/27", done: true },
];

function Ams() {
  return (
    <>
      <Toolbar title="Sample Bakery LLC" view="SAMPBAK-01" chip={<Pill>Client</Pill>} />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          items={["Account detail", "Contacts", "Policies", "Activities", "Attachments", "Claims"]}
          active="Activities"
        />
        <div className="min-w-0 flex-1">
          <Table
            columns={[
              {
                label: "Activity",
                cell: (row) => (
                  <span className="flex min-w-0 items-center">
                    <Tag>{row.code}</Tag>
                    <span className="truncate">{row.activity}</span>
                  </span>
                ),
              },
              {
                label: "Owner",
                className: "hidden w-12 gap-1.5 @sm:flex",
                cell: () => (
                  <>
                    <DeskAvatar />
                    Desk
                  </>
                ),
              },
              { label: "Date", className: "hidden w-9 @lg:flex", cell: (row) => row.date },
              {
                label: "Status",
                className: "w-12",
                cell: (row) => (row.done ? <Pill>Done</Pill> : <Pill alert>Open</Pill>),
              },
            ]}
            rows={ACTIVITIES}
          />
        </div>
      </div>
    </>
  );
}

// One of each kind of document the desk reads, in the client's file.
const DOCUMENTS = [
  { type: "PDF", name: "ACORD 125 Commercial Application", folder: "Applications", date: "09/28" },
  { type: "PDF", name: "ACORD 140 Property Section", folder: "Applications", date: "09/28" },
  { type: "PDF", name: "ACORD 126 General Liability", folder: "Applications", date: "09/28" },
  { type: "PDF", name: "Supplemental: bakery operations", folder: "Applications", date: "10/03" },
  { type: "PDF", name: "Supplemental: cooking and frying", folder: "Applications", date: "10/03" },
  {
    type: "PDF",
    name: "Loss runs 2023–2026, Sample Carrier Co.",
    folder: "Loss runs",
    date: "09/30",
  },
  { type: "PDF", name: "Loss runs 2020–2023, Demo Mutual", folder: "Loss runs", date: "09/30" },
  { type: "XLS", name: "Schedule of values", folder: "Schedules", date: "09/30" },
  { type: "XLS", name: "Equipment schedule", folder: "Schedules", date: "09/30" },
  { type: "XLS", name: "Payroll by class code", folder: "Schedules", date: "10/01" },
  { type: "PDF", name: "2025 BOP declarations", folder: "Policies", date: "10/02" },
  { type: "PDF", name: "2025 BOP policy forms", folder: "Policies", date: "10/02" },
  { type: "PDF", name: "2024 BOP declarations", folder: "Policies", date: "10/02" },
  { type: "PDF", name: "Certificate of insurance, landlord", folder: "Policies", date: "10/02" },
  { type: "PDF", name: "Lease agreement, 412 Example St.", folder: "Contracts", date: "10/02" },
  { type: "PDF", name: "Fire inspection report 2026", folder: "Inspections", date: "10/02" },
  { type: "JPG", name: "Kitchen hood and suppression", folder: "Inspections", date: "10/02" },
  { type: "MSG", name: "RE: Renewal information request", folder: "Correspondence", date: "10/01" },
  { type: "MSG", name: "RE: Payroll and prior carrier", folder: "Correspondence", date: "10/01" },
  {
    type: "MSG",
    name: "Example Specialty: supplemental needed",
    folder: "Correspondence",
    date: "10/03",
  },
  { type: "DOC", name: "Producer notes, renewal meeting", folder: "Notes", date: "09/27" },
  { type: "PDF", name: "Financial statement 2025", folder: "Financials", date: "10/01" },
];

function Documents() {
  return (
    <>
      <Toolbar
        title="Sample Bakery LLC"
        view="Clients › Commercial"
        chip={<Pill alert>{DOCUMENTS.length} pulled</Pill>}
      />
      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1">
          <Table
            columns={[
              {
                label: "Document",
                cell: (row) => (
                  <span className="flex min-w-0 items-center">
                    <Tag>{row.type}</Tag>
                    <span className="truncate">{row.name}</span>
                  </span>
                ),
              },
              {
                label: "Folder",
                className: "hidden w-20 @sm:flex",
                cell: (row) => <span className="truncate text-deep/50">{row.folder}</span>,
              },
              { label: "Added", className: "hidden w-9 @lg:flex", cell: (row) => row.date },
              { label: "Desk", className: "w-12", cell: () => <Pill>Pulled</Pill> },
            ]}
            rows={DOCUMENTS}
          />
        </div>
        <Sidebar
          items={[
            "All documents",
            "Applications",
            "Loss runs",
            "Schedules",
            "Policies",
            "Contracts",
            "Inspections",
            "Correspondence",
            "Notes",
            "Financials",
          ]}
          active="All documents"
        />
      </div>
    </>
  );
}

// Work arriving and results leaving, by email and chat.
const MESSAGES = [
  {
    from: "Jordan Avery",
    subject: "New submission: Sample Bakery LLC, BOP",
    preview: "ACORD and loss runs attached. Effective 11/1, can the desk take it?",
    time: "9:58",
    unread: true,
  },
  {
    from: "Renewals channel",
    via: "Chat",
    subject: "@Desk Example Logistics is 90 days out",
    preview: "Can you start remarketing? Incumbent is non-renewing the auto.",
    time: "9:41",
    unread: true,
  },
  {
    from: "Placement Desk",
    subject: "Results: Placeholder Mfg, GL",
    preview: "4 quotes and 1 declination. Comparison and work record attached.",
    time: "9:12",
  },
  {
    from: "Example Specialty",
    subject: "RE: Sample Bakery LLC – BOP submission",
    preview: "Thanks, received. We'll need the supplemental before we can quote.",
    time: "8:47",
    unread: true,
  },
  {
    from: "Placement Desk",
    subject: "Missing information: Demo Dental Group, WC",
    preview: "Need current payroll by class code before we go to market.",
    time: "8:30",
  },
  {
    from: "Sam Ortiz",
    via: "Chat",
    subject: "@Desk Sample Hardware wants higher property limits",
    preview: "Can you get indications at $2M building before Friday?",
    time: "8:12",
  },
  {
    from: "Demo Mutual",
    subject: "Quote: Placeholder Properties, Umbrella",
    preview: "Quote attached. Subject to the underlying schedule on file.",
    time: "7:55",
  },
  {
    from: "Placement Desk",
    subject: "Submitted: Example Brewing Co., Liquor",
    preview: "Sent to 4 markets by portal and email. First responses due Thursday.",
    time: "7:40",
  },
  {
    from: "Sample Carrier Co.",
    subject: "Declination: Demo Landscaping, GL",
    preview: "Outside appetite for tree work over 30 feet.",
    time: "Yesterday",
  },
  {
    from: "Jordan Avery",
    subject: "RE: Results: Sample Builders Inc., GL",
    preview: "Client is going with Demo Mutual. Please let the others know.",
    time: "Yesterday",
  },
  {
    from: "Placement Desk",
    subject: "Follow-up: Placeholder Café, BOP",
    preview: "Second follow-up sent to Example Specialty. No response since 9/30.",
    time: "Yesterday",
  },
  {
    from: "Example Clinic",
    subject: "Payroll for the WC renewal",
    preview: "Attached is the payroll report you asked for, by class code.",
    time: "Yesterday",
  },
  {
    from: "Placement Desk",
    subject: "Results: Demo Auto Body, Garage",
    preview: "3 quotes, best terms from Placeholder Insurance. Record attached.",
    time: "Mon",
  },
  {
    from: "Renewals channel",
    via: "Chat",
    subject: "@Desk Sample Florist renewal moved up",
    preview: "Client wants to bind by 10/15. Can the desk prioritize?",
    time: "Mon",
  },
];

// The first message's thread, open beside the list: each message's body as
// lines of grey, its width per line.
const THREAD = [
  {
    from: "Jordan Avery",
    to: "Placement Desk",
    time: "9:58 AM",
    lines: ["w-full", "w-11/12", "w-full", "w-3/5"],
    files: ["ACORD 125.pdf", "Loss runs.pdf"],
  },
  {
    from: "Placement Desk",
    to: "Jordan Avery",
    time: "10:02 AM",
    lines: ["w-full", "w-10/12", "w-full", "w-full", "w-2/5"],
    files: [],
  },
  {
    from: "Jordan Avery",
    to: "Placement Desk",
    time: "10:20 AM",
    lines: ["w-full", "w-9/12", "w-1/2"],
    files: ["Payroll by class.xls"],
  },
  {
    from: "Placement Desk",
    to: "Jordan Avery",
    time: "10:24 AM",
    lines: ["w-full", "w-11/12", "w-full", "w-3/4"],
    files: [],
  },
];

function Inbox() {
  const [open] = MESSAGES;
  return (
    <>
      <Toolbar title="Inbox" view="desk@sampleagency.example" chip={<Pill alert>3 new</Pill>} />
      <div className="flex min-h-0 flex-1">
        <ul className="min-w-0 flex-1 @lg:max-w-[55%] @lg:border-r @lg:border-deep/10">
          {MESSAGES.map((message, i) => (
            <li
              className={cn("border-b border-deep/5 py-2 pr-4 pl-3", i === 0 && "bg-lavender/60")}
              key={message.subject}
            >
              <p className="flex items-center gap-1.5">
                <i
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    message.unread ? "bg-purple" : "bg-transparent",
                  )}
                />
                <span className={cn("truncate", message.unread && "font-medium")}>
                  {message.from}
                </span>
                {message.via ? <Pill>{message.via}</Pill> : null}
                <span className="ml-auto shrink-0 text-deep/50 tabular-nums">{message.time}</span>
              </p>
              <p className="truncate pl-3">{message.subject}</p>
              <p className="truncate pl-3 text-deep/50">{message.preview}</p>
            </li>
          ))}
        </ul>
        <div className="hidden min-w-0 flex-1 px-4 py-3 @lg:block">
          <p className="truncate font-medium">{open.subject}</p>
          {THREAD.map((message) => (
            <div className="mt-3 border-t border-deep/5 pt-3" key={message.time}>
              <p className="flex justify-between gap-3 text-deep/50">
                <span className="truncate">
                  {message.from} to {message.to}
                </span>
                <span className="shrink-0 tabular-nums">{message.time}</span>
              </p>
              <div className="mt-2.5 grid gap-2">
                {message.lines.map((width, i) => (
                  <i className={cn("h-1.5 rounded-full bg-deep/10", width)} key={i} />
                ))}
              </div>
              {message.files.length ? (
                <p className="mt-3 flex gap-1.5">
                  {message.files.map((file) => (
                    <span className="rounded-md border border-deep/10 px-1.5 py-0.5" key={file}>
                      {file}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// The desk's work as rows a reporting tool can read: one per submission.
// `className` sets a column's width, alignment and the container size it
// appears from; the first column takes the rest.
const SHEET_COLUMNS: { letter: string; label: string; className?: string }[] = [
  { letter: "A", label: "Account" },
  { letter: "B", label: "Line", className: "hidden w-16 @sm:block" },
  { letter: "C", label: "Markets", className: "w-16 text-right" },
  { letter: "D", label: "Quotes", className: "hidden w-16 text-right @xs:block" },
  { letter: "E", label: "Days", className: "w-12 text-right" },
  { letter: "F", label: "Outcome", className: "hidden w-18 @md:block" },
];

// Markets, quotes, days and outcome for each account in the book, in order.
const SHEET_VALUES = [
  ["5", "3", "4.5", "Quoted"],
  ["6", "4", "3.0", "Bound"],
  ["4", "2", "5.5", "Quoted"],
  ["7", "5", "2.5", "Bound"],
  ["5", "3", "4.0", "Quoted"],
  ["3", "2", "3.5", "Bound"],
  ["4", "1", "6.0", "Quoted"],
  ["6", "4", "3.0", "Bound"],
  ["5", "4", "2.0", "Bound"],
  ["4", "2", "4.5", "Quoted"],
  ["6", "3", "3.5", "Bound"],
  ["5", "3", "5.0", "Quoted"],
  ["3", "2", "2.5", "Bound"],
  ["5", "3", "3.0", "Bound"],
  ["6", "4", "4.0", "Quoted"],
  ["4", "2", "6.5", "Quoted"],
  ["3", "3", "2.0", "Bound"],
  ["7", "3", "5.5", "Quoted"],
  ["6", "5", "3.0", "Bound"],
  ["4", "2", "4.0", "Declined"],
  ["5", "4", "2.5", "Bound"],
  ["6", "3", "3.5", "Quoted"],
  ["5", "4", "3.0", "Bound"],
  ["4", "1", "7.0", "Quoted"],
];
const SHEET_ROWS = BOOK.map((policy, i) => [policy.name, policy.line, ...SHEET_VALUES[i]]);

// The cell the formula bar describes: row 2 (the first account), column E.
const SELECTED = { row: 0, column: 4 };

function Data() {
  const cell = (i: number) =>
    cn(
      "truncate border-r border-deep/10 px-2 py-1.5",
      i === 0 && "min-w-0 flex-1",
      SHEET_COLUMNS[i].className,
    );
  return (
    <>
      <Toolbar title="Desk activity" view="Q3 2026" chip={<Pill>Synced 9:00</Pill>} />
      <p className="flex gap-3 border-b border-deep/10 px-3 py-1.5 font-mono text-[0.625rem]">
        <span className="w-6 text-deep/50">E2</span>
        <span className="text-deep/40 italic">fx</span>
        <span className="truncate">=NETWORKDAYS(H2, I2)</span>
      </p>
      <div className="tabular-nums">
        <div className="flex border-b border-deep/10 bg-cream/60 text-center text-deep/50">
          <span className="w-7 shrink-0 border-r border-deep/10 py-1" />
          {SHEET_COLUMNS.map((column, i) => (
            <span className={cn(cell(i), "py-1 text-center")} key={column.letter}>
              {column.letter}
            </span>
          ))}
        </div>
        {[SHEET_COLUMNS.map((column) => column.label), ...SHEET_ROWS].map((row, r) => (
          <div className={cn("flex border-b border-deep/10", r === 0 && "font-medium")} key={r}>
            <span className="w-7 shrink-0 border-r border-deep/10 bg-cream/60 py-1.5 text-center text-deep/50">
              {r + 1}
            </span>
            {row.map((value, i) => (
              <span
                className={cn(
                  cell(i),
                  r - 1 === SELECTED.row &&
                    i === SELECTED.column &&
                    "bg-lavender/60 ring-2 ring-purple ring-inset",
                )}
                key={SHEET_COLUMNS[i].letter}
              >
                {value}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

const SCREENS: Record<SystemName, () => ReactNode> = {
  ams: Ams,
  documents: Documents,
  inbox: Inbox,
  data: Data,
};

export function SystemScreen({ name }: { name?: SystemName }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame>
      <Screen />
    </Frame>
  );
}
