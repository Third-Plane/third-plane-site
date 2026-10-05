import type { ReactNode } from "react";
import { cn } from "../lib/style";
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
  { code: "SUBM", activity: "Submitted to Demo Mutual by portal", date: "10/02", done: true },
  { code: "NOTE", activity: "Prior carrier confirmed by producer", date: "10/01", done: true },
  { code: "ATTC", activity: "Loss runs attached to the account", date: "09/30", done: true },
  { code: "RNWL", activity: "Renewal marketing started", date: "09/28", done: true },
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
  {
    type: "PDF",
    name: "Loss runs 2023–2026, Sample Carrier Co.",
    folder: "Loss runs",
    date: "09/30",
  },
  { type: "XLS", name: "Schedule of values", folder: "Schedules", date: "09/30" },
  { type: "MSG", name: "RE: Renewal information request", folder: "Correspondence", date: "10/01" },
  { type: "PDF", name: "2025 BOP declarations", folder: "Policies", date: "10/02" },
  { type: "PDF", name: "Supplemental: bakery operations", folder: "Applications", date: "10/03" },
];

function Documents() {
  return (
    <>
      <Toolbar
        title="Sample Bakery LLC"
        view="Clients › Commercial"
        chip={<Pill alert>7 pulled</Pill>}
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
            "Correspondence",
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
        {/* The first message, open, with its body as lines of grey. */}
        <div className="hidden min-w-0 flex-1 px-4 py-3 @lg:block">
          <p className="truncate font-medium">{open.subject}</p>
          <p className="mt-1 truncate text-deep/50">{open.from} to Placement Desk</p>
          <div className="mt-4 grid gap-2">
            {["w-full", "w-11/12", "w-full", "w-3/5"].map((width, i) => (
              <i className={cn("h-1.5 rounded-full bg-deep/10", width)} key={i} />
            ))}
          </div>
          <p className="mt-4 flex gap-1.5">
            <span className="rounded-md border border-deep/10 px-1.5 py-0.5">ACORD 125.pdf</span>
            <span className="rounded-md border border-deep/10 px-1.5 py-0.5">Loss runs.pdf</span>
          </p>
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

const SHEET_ROWS = [
  ["Sample Bakery LLC", "BOP", "5", "3", "4.5", "Quoted"],
  ["Placeholder Mfg", "GL", "6", "4", "3.0", "Bound"],
  ["Example Logistics", "Auto", "4", "2", "5.5", "Quoted"],
  ["Demo Dental Group", "WC", "7", "5", "2.5", "Bound"],
  ["Sample Hardware", "Property", "5", "3", "4.0", "Quoted"],
  ["Placeholder Properties", "Umbrella", "3", "2", "3.5", "Bound"],
  ["Example Brewing Co.", "Liquor", "4", "1", "6.0", "Quoted"],
  ["Demo Landscaping", "GL", "6", "4", "3.0", "Bound"],
];

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

// `className` goes to the Frame, for a ground or shape other than the default.
export function SystemScreen({ name, className }: { name?: SystemName; className?: string }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame className={className}>
      <Screen />
    </Frame>
  );
}
