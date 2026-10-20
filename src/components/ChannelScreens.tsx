import type { ReactNode } from "react";
import { cn } from "../lib/style";
import { Frame, Pill, Table, Toolbar } from "./MockUi";

export type ChannelName = "portal" | "api" | "mail" | "mcp";

// Mock screens for the carrier channels, one per channel: the desk's work on
// the same submission (Sample Bakery LLC's BOP, BOP-20481) through a carrier's
// portal, its API, an underwriter's email and its MCP server. Each runs to a
// quote coming back, the same placement whatever the channel. They show the
// work as the desk sees it rather than the traffic on the wire; see MockUi for
// the pieces.

// A short label in a box, ahead of a row's name.
function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "mr-2 inline-block w-9 shrink-0 rounded-sm bg-lavender py-px text-center text-[0.5625rem] font-medium tracking-wide text-purple",
        className,
      )}
    >
      {children}
    </span>
  );
}

const mono = "font-mono text-[0.625rem]";

// The portal's steps, the third under way.
const PORTAL_STEPS = ["Applicant", "Locations", "Questions", "Coverage", "Review"];
const PORTAL_STEP = 2;

// The qualifying questions, each answered from where the desk found it; the
// desk is on the first unanswered one, and the form is scrolled to it.
const QUESTIONS: { question: string; answer?: string; source?: string }[] = [
  { question: "Years in business", answer: "8", source: "AMS" },
  { question: "Annual gross sales", answer: "$1,240,000", source: "Email" },
  { question: "Any losses in the past 3 years?", answer: "No", source: "Loss runs" },
  { question: "Deep fat frying on premises?", answer: "No", source: "ACORD 125" },
  { question: "Hood and duct suppression?", answer: "Yes", source: "Inspection" },
  { question: "Suppression inspected in 12 months?", answer: "Yes", source: "Inspection" },
  { question: "Delivery offered?", answer: "Local", source: "Email" },
  { question: "Delivery by own vehicles?", answer: "Yes", source: "Email" },
  { question: "Any catering off premises?", answer: "No", source: "Producer" },
  { question: "Alcohol served or sold?", answer: "No", source: "ACORD 125" },
  { question: "Seating for customers?", answer: "12 seats", source: "ACORD 140" },
  { question: "Employees, full-time", answer: "14", source: "ACORD 125" },
  { question: "Prior carrier", answer: "Demo Mutual", source: "Producer" },
  { question: "Any prior cancellations?" },
  { question: "Building sprinklered?" },
  { question: "Central station alarm?" },
  { question: "Roof updated in 15 years?" },
  { question: "Wiring updated in 25 years?" },
  { question: "Any open code violations?" },
  { question: "Any vacant space in the building?" },
  { question: "Other businesses in the building?" },
  { question: "Open 24 hours or seasonally?" },
  { question: "Any wholesale sales?" },
  { question: "Products sold under your own label?" },
  { question: "Any baking for other businesses?" },
  { question: "Any bankruptcies in 5 years?" },
  { question: "Any liens or judgments?" },
];

// Answered questions left showing above the one being answered.
const SCROLLED_PAST = 3;

function Field({ answer, current }: { answer?: string; current: boolean }) {
  return (
    <span
      className={cn(
        "w-full truncate rounded-sm border px-1.5 py-0.5",
        current ? "border-purple ring-2 ring-purple/20" : "border-deep/15",
        !answer && "text-deep/30",
      )}
    >
      {answer ?? "Select"}
    </span>
  );
}

function Portal() {
  const current = QUESTIONS.findIndex((row) => !row.answer);
  const answered = QUESTIONS.filter((row) => row.answer).length;
  return (
    <>
      <Toolbar
        title="Sample Carrier Co."
        view="Agent portal › New business"
        chip={<Pill>BOP-20481</Pill>}
      />
      <ol className="flex items-center gap-3 border-b border-deep/10 px-4 py-2">
        {PORTAL_STEPS.map((step, i) => (
          <li
            className={cn(
              "flex items-center gap-1.5",
              i === PORTAL_STEP ? "font-medium text-purple" : "text-deep/50",
              i > PORTAL_STEP + 1 && "hidden @sm:flex",
            )}
            key={step}
          >
            <i
              className={cn(
                "size-1.5 rounded-full",
                i < PORTAL_STEP
                  ? "bg-purple"
                  : i === PORTAL_STEP
                    ? "bg-purple ring-2 ring-purple/25"
                    : "bg-deep/15",
              )}
            />
            {step}
          </li>
        ))}
      </ol>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Table
          columns={[
            {
              label: "Qualifying question",
              cell: (row) => <span className="truncate">{row.question}</span>,
            },
            {
              label: "Answer",
              className: "w-24",
              cell: (row) => <Field answer={row.answer} current={row === QUESTIONS[current]} />,
            },
            {
              label: "From",
              className: "hidden w-18 @sm:flex",
              cell: (row) => <span className="truncate text-deep/50">{row.source ?? ""}</span>,
            },
          ]}
          rows={QUESTIONS.slice(Math.max(0, current - SCROLLED_PAST))}
        />
      </div>
      <p className="flex items-center justify-between gap-3 border-t border-deep/10 px-4 py-2.5">
        <span className="text-deep/50">
          {answered} of {QUESTIONS.length} answered
        </span>
        <span className="rounded-md bg-deep/15 px-2.5 py-1 font-medium text-deep/50">
          Continue to quote
        </span>
      </p>
    </>
  );
}

// The calls the desk made to the carrier's API for the submission, in the
// order made: a quote opened, filled in, rated and fetched once it was ready.
// The log shows them newest first, so the quote coming back is at the top.
const CALLS: { method: string; path: string; status: number; ms: number; note?: string }[] = [
  { method: "POST", path: "/v2/token", status: 200, ms: 84 },
  { method: "GET", path: "/v2/appetite?naics=311811", status: 200, ms: 132, note: "In appetite" },
  { method: "GET", path: "/v2/classes/311811", status: 200, ms: 97 },
  { method: "POST", path: "/v2/quotes", status: 201, ms: 410, note: "Q-7731" },
  { method: "POST", path: "/v2/quotes/Q-7731/locations", status: 201, ms: 188 },
  { method: "PUT", path: "/v2/quotes/Q-7731/questions", status: 200, ms: 236 },
  { method: "POST", path: "/v2/quotes/Q-7731/documents", status: 201, ms: 912, note: "Loss runs" },
  { method: "POST", path: "/v2/quotes/Q-7731/documents", status: 201, ms: 640, note: "SOV" },
  { method: "POST", path: "/v2/quotes/Q-7731/rate", status: 202, ms: 155 },
  { method: "GET", path: "/v2/quotes/Q-7731", status: 202, ms: 61, note: "Rating" },
  { method: "GET", path: "/v2/quotes/Q-7731", status: 202, ms: 58, note: "Rating" },
  { method: "GET", path: "/v2/quotes/Q-7731", status: 200, ms: 73, note: "Quoted" },
  { method: "GET", path: "/v2/quotes/Q-7731/terms", status: 200, ms: 119 },
  { method: "GET", path: "/v2/quotes/Q-7731/forms", status: 200, ms: 102 },
  { method: "GET", path: "/v2/quotes/Q-7731/quote.pdf", status: 200, ms: 344 },
  { method: "POST", path: "/v2/webhooks/ack", status: 204, ms: 40 },
];

// The quote the last calls brought back, as the desk read it.
const QUOTE = [
  { field: "Status", value: "Quoted" },
  { field: "Premium", value: "$4,820" },
  { field: "Form", value: "BOP" },
  { field: "BPP limit", value: "$185,000" },
  { field: "Business income", value: "$120,000" },
  { field: "GL occurrence", value: "$1,000,000" },
  { field: "GL aggregate", value: "$2,000,000" },
  { field: "Deductible", value: "$1,000" },
  { field: "Spoilage", value: "$25,000" },
  { field: "Flood", value: "Excluded" },
  { field: "Payment plan", value: "Annual, 10-pay" },
  { field: "Valid until", value: "11/20" },
  { field: "Documents", value: "quote.pdf" },
];

function Api() {
  return (
    <>
      <Toolbar title="api.samplecarrier.example" view="Request log" chip={<Pill>BOP-20481</Pill>} />
      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 @lg:max-w-[60%] @lg:border-r @lg:border-deep/10">
          <Table
            columns={[
              {
                label: "Request",
                cell: (row) => (
                  <span className="flex min-w-0 items-center">
                    <Tag>{row.method}</Tag>
                    <span className={cn("truncate", mono)}>{row.path}</span>
                  </span>
                ),
              },
              {
                label: "Result",
                className: "hidden w-16 @xs:flex",
                cell: (row) => <span className="truncate text-deep/50">{row.note ?? ""}</span>,
              },
              {
                label: "Status",
                className: "w-10",
                cell: (row) =>
                  row.status === 202 ? (
                    <span className="text-deep/50 tabular-nums">{row.status}</span>
                  ) : (
                    <Pill>{row.status}</Pill>
                  ),
              },
              {
                label: "Time",
                className: "hidden w-12 justify-end @sm:flex",
                cell: (row) => <span className="text-deep/50 tabular-nums">{row.ms} ms</span>,
              },
            ]}
            rows={[...CALLS].reverse()}
          />
        </div>
        <div className="hidden min-w-0 flex-1 @lg:block">
          <p className="flex items-center justify-between gap-3 border-b border-deep/10 bg-cream/60 px-4 py-1.5 text-deep/50">
            <span className={mono}>Q-7731</span>
            <span>Parsed</span>
          </p>
          {QUOTE.map((row) => (
            <p className="flex gap-3 border-b border-deep/5 px-4 py-2" key={row.field}>
              <span className="min-w-0 flex-1 truncate text-deep/50">{row.field}</span>
              <span className="shrink-0 font-medium tabular-nums">{row.value}</span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

// The thread with the underwriter, in the order sent: the desk's messages
// and the underwriter's, to the indication coming back. It shows newest first.
const THREAD: {
  desk: boolean;
  time: string;
  text: string;
  files?: string[];
}[] = [
  {
    desk: true,
    time: "Tue 9:14",
    text: "Submission for Sample Bakery LLC, BOP, effective 11/01. Application and loss runs attached.",
    files: ["ACORD 125.pdf", "ACORD 140.pdf", "Loss runs.pdf"],
  },
  {
    desk: false,
    time: "Wed 11:02",
    text: "Thanks, received. We’ll need the bakery supplemental before we can quote.",
  },
  {
    desk: true,
    time: "Wed 11:20",
    text: "Supplemental attached, completed from the application and loss runs.",
    files: ["Supplemental.pdf"],
  },
  {
    desk: false,
    time: "Thu 2:45",
    text: "Any deep fat frying? And when was the hood suppression last inspected?",
  },
  {
    desk: true,
    time: "Thu 3:02",
    text: "No frying on premises. Hood and suppression inspected in March; report attached.",
    files: ["Inspection 2026.pdf"],
  },
  {
    desk: true,
    time: "Mon 9:00",
    text: "Following up on terms. Can you confirm by Thursday?",
  },
  {
    desk: false,
    time: "Mon 4:30",
    text: "Indication attached: $5,610 on our package form, subject to a flood exclusion.",
    files: ["Indication.pdf"],
  },
  {
    desk: true,
    time: "Mon 4:41",
    text: "Thank you, received. We’ll come back to you with the producer’s decision.",
  },
];

function Mail() {
  return (
    <>
      <Toolbar
        title="RE: Sample Bakery LLC – BOP submission"
        view="Example Specialty"
        chip={<Pill alert>Indication in</Pill>}
      />
      <ul>
        {[...THREAD].reverse().map((message) => (
          <li
            className={cn(
              "border-b border-deep/5 py-2.5 pr-4 pl-3.5",
              message.desk && "border-l-2 border-l-purple pl-3",
            )}
            key={message.time}
          >
            <p className="flex items-center gap-2">
              <span className="truncate font-medium">
                {message.desk ? "Placement Desk" : "M. Chen, Underwriting"}
              </span>
              <span className="hidden truncate text-deep/50 @sm:inline">
                to{" "}
                {message.desk
                  ? "underwriting@examplespecialty.example"
                  : "desk@sampleagency.example"}
              </span>
              <span className="ml-auto shrink-0 text-deep/50 tabular-nums">{message.time}</span>
            </p>
            <p className="mt-0.5 truncate text-deep/70">{message.text}</p>
            {message.files ? (
              <p className="mt-1.5 flex gap-1.5">
                {message.files.map((file) => (
                  <span className="rounded-md border border-deep/10 px-1.5 py-0.5" key={file}>
                    {file}
                  </span>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}

// The tools the carrier's MCP server offers, and whether the desk used them:
// binding is there, but outside the desk's authority.
const TOOLS: { tool: string; use: "used" | "open" | "blocked" }[] = [
  { tool: "get_appetite", use: "used" },
  { tool: "create_quote", use: "used" },
  { tool: "upload_document", use: "used" },
  { tool: "answer_questions", use: "used" },
  { tool: "get_quote_status", use: "used" },
  { tool: "get_quote_documents", use: "used" },
  { tool: "list_forms", use: "open" },
  { tool: "bind_quote", use: "blocked" },
];

// The desk's calls to those tools for the submission, in the order made; the
// log shows them newest first.
const TOOL_CALLS = [
  { time: "8:58", tool: "initialize", args: "mcp.placeholderins.example", result: "Session open" },
  { time: "8:58", tool: "tools/list", args: "", result: "8 tools" },
  { time: "9:02", tool: "get_appetite", args: "naics 311811, BOP", result: "In appetite" },
  {
    time: "9:02",
    tool: "create_quote",
    args: "Sample Bakery LLC, eff. 11/01",
    result: "Quote P-2210",
  },
  { time: "9:03", tool: "upload_document", args: "P-2210, loss runs", result: "Attached" },
  { time: "9:03", tool: "upload_document", args: "P-2210, schedule of values", result: "Attached" },
  { time: "9:04", tool: "answer_questions", args: "P-2210, 14 answers", result: "2 follow-ups" },
  { time: "9:06", tool: "answer_questions", args: "P-2210, hood suppression", result: "Complete" },
  { time: "9:30", tool: "get_quote_status", args: "P-2210", result: "Referred" },
  { time: "10:10", tool: "get_quote_status", args: "P-2210", result: "With underwriter" },
  { time: "10:45", tool: "get_quote_status", args: "P-2210", result: "Rating" },
  { time: "11:15", tool: "get_quote_status", args: "P-2210", result: "Quoted" },
  { time: "11:15", tool: "get_quote_documents", args: "P-2210", result: "quote.pdf, forms" },
];

function Mcp() {
  return (
    <>
      <Toolbar
        title="Placeholder Insurance"
        view="mcp.placeholderins.example"
        chip={<Pill>Connected</Pill>}
      />
      <div className="flex flex-wrap items-center gap-1.5 border-b border-deep/10 px-4 py-2.5">
        <span className="mr-1 text-deep/50">Tools</span>
        {TOOLS.map((row) => (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 whitespace-nowrap",
              mono,
              row.use === "used" && "bg-blue text-deep/70",
              row.use === "open" && "border border-deep/10 text-deep/50",
              row.use === "blocked" && "bg-pink text-purple line-through",
            )}
            key={row.tool}
          >
            {row.tool}
          </span>
        ))}
        <span className="hidden text-deep/50 @sm:inline">
          bind_quote is outside the desk’s authority
        </span>
      </div>
      <Table
        columns={[
          {
            label: "Call",
            cell: (row) => (
              <span className="flex min-w-0 items-center gap-2">
                <span className="w-7 shrink-0 text-deep/40 tabular-nums">{row.time}</span>
                <span className="truncate">
                  <span className={mono}>{row.tool}</span>{" "}
                  <span className="hidden text-deep/50 @xs:inline">{row.args}</span>
                </span>
              </span>
            ),
          },
          {
            label: "Result",
            className: "w-24",
            cell: (row) => <span className="truncate">{row.result}</span>,
          },
        ]}
        rows={[...TOOL_CALLS].reverse()}
      />
    </>
  );
}

const SCREENS: Record<ChannelName, () => ReactNode> = {
  portal: Portal,
  api: Api,
  mail: Mail,
  mcp: Mcp,
};

// An editor can add channels beyond the four drawn here; those get none.
export function ChannelScreen({ name }: { name?: ChannelName }) {
  if (!name) return null;
  const Screen = SCREENS[name];
  return (
    <Frame>
      <Screen />
    </Frame>
  );
}
