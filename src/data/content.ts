export const site = {
  name: "Third Plane",
  tagline: "AI workforces for insurance",
  email: "sales@thirdplane.com",
  mailto: "mailto:sales@thirdplane.com",
  linkedin: "https://www.linkedin.com/company/third-plane/",
  ctaLabel: "Start a conversation",
  ctaHref: "https://form.jotform.com/262674737838070",
  year: 2026,
};

export const aiWorkforceDefinition =
  "An AI workforce is dedicated operating capacity that takes responsibility for defined work across the systems and carrier channels you already use.";

export const homeHero = {
  title: ["Third Plane builds AI workforces for insurance."],
  lead: "Placement Desk takes on defined placement work across the systems and carrier channels your brokerage already uses.",
  body: "Send Placement Desk a submission or renewal. It works the markets and returns the quotes with a record of what it did.",
  secondary: { label: "See Placement Desk", href: "/placement-desk" },
  ledger: {
    label: "Placement Desk",
    sublabel: "Activity",
    legend: [
      { status: "done" as const, label: "Completed by the desk" },
      { status: "review" as const, label: "Returned to a person" },
    ],
  },
};

export const ledgerTasks = [
  {
    task: "Submission received by email: Sample Bakery LLC, BOP",
    status: "done" as const,
  },
  {
    task: "Account information structured from the ACORD and loss runs",
    status: "done" as const,
  },
  {
    task: "Missing information flagged: prior carrier, current payroll",
    status: "review" as const,
  },
  { task: "Producer reply filed: payroll confirmed", status: "done" as const },
  {
    task: "Appetite assessed across 12 appointed markets",
    status: "done" as const,
  },
  { task: "Markets selected: 5 to approach", status: "done" as const },
  { task: "Portal submission complete: Demo Mutual", status: "done" as const },
  {
    task: "Submitted by email to underwriter: Example Specialty",
    status: "done" as const,
  },
  {
    task: "Quote returned through carrier API: Sample Carrier Co.",
    status: "done" as const,
  },
  {
    task: "Follow-up sent: Example Specialty, day two",
    status: "done" as const,
  },
  { task: "Quote received: Demo Mutual", status: "done" as const },
  {
    task: "Results returned to producer: 3 quotes, 1 declination, record attached",
    status: "review" as const,
  },
  {
    task: "Renewal detected in AMS: Placeholder Mfg, 90 days out",
    status: "done" as const,
  },
  {
    task: "Renewal information gathered from policy file and prior submission",
    status: "done" as const,
  },
  {
    task: "Appetite assessed: incumbent plus 8 alternatives",
    status: "done" as const,
  },
  {
    task: "Portal submission complete: Sample Carrier Co., supplemental forms",
    status: "done" as const,
  },
  {
    task: "Underwriter question answered: prior loss detail",
    status: "done" as const,
  },
  {
    task: "No market fit: routed to account manager with the record",
    status: "review" as const,
  },
];

export const problem = {
  eyebrow: "The capacity problem",
  title: "You can’t hire your way out of the bottleneck.",
  body: "Accounts that were remarketed every few years are now worked every year, across more markets. More submissions. More follow-up. More work to place the same business.",
  points: [
    {
      title: "Skilled capacity is finite",
      body: "More submissions compete for the same limited producer and account manager time.",
    },
    {
      title: "Another tool is not more capacity",
      body: "New systems still need someone to learn them, manage them and use them.",
    },
    {
      title: "Hiring preserves the constraint",
      body: "Hiring adds capacity one person at a time while placement demand keeps growing.",
    },
  ],
  closing:
    "The cost shows up as markets that never get shopped, quotes that arrive late, renewals that slip, and business your team never had the capacity to pursue.",
};

export const approach = {
  eyebrow: "Where AI sits",
  title: "Most AI gives your people another tool. Third Plane builds it into your organization.",
  body: "Give someone an AI tool and they still own the work. Third Plane assigns defined work to an AI workforce and returns the finished outcome to your people for review.",
  models: [
    {
      kicker: "The tool model",
      chain: ["Employee", "AI tool", "Task"],
      note: "The employee runs the tool, reviews the output and still owns the work.",
      accent: false,
    },
    {
      kicker: "The Third Plane model",
      chain: [
        "Organization",
        "Defined work",
        "AI workforce",
        "Completed outcome",
      ],
      note: "The business assigns the work. The AI workforce executes it across your systems. Your people review the outcome and make the decisions.",
      accent: true,
    },
  ],
  definition: {
    headline:
      "An AI workforce takes responsibility for defined work across the systems and carrier channels you already use.",
  },
};

export const desk = {
  name: "Placement Desk",
  eyebrow: "The Placement Desk",
  title: "Send the work to the Placement Desk. Your team gets the quotes back.",
  body: "A dedicated placement function that takes new business and renewals from submission through returned quotes.",
  columns: [
    {
      kicker: "Work goes in",
      line: "A producer forwards a submission, a renewal lands in the desk’s own inbox, or an AMS event.",
    },
    {
      kicker: "The desk works it",
      accent: true,
      line: "Gathers the account, checks appetite and works the markets through portals, APIs and email.",
    },
    {
      kicker: "Results come back",
      line: "Quotes, market results and a record of the work come back for review.",
    },
  ],
  closing:
    "Placement Desk works carriers on its own credentials and handles multiple accounts in parallel using the same placement process.",
  cta: { label: "See Placement Desk", href: "/placement-desk" },
  more: [
    { label: "Security", href: "/security" },
    { label: "About", href: "/company" },
  ],
  next: {
    eyebrow: "Where this goes next",
    status: "In development",
    title: "The Underwriting Desk is next.",
    body: "The Underwriting Desk is in development and follows the same governance model as the Placement Desk: scoped authority, a complete record of every action, and a named person accountable for its work.",
  },
};

export const horizon = {
  title: "Placement is the first desk.",
  body: "The same model extends to other defined insurance work as AI becomes capable of owning more of it. Our ambition is to help insurance businesses organize work around what people and AI are each best equipped to do.",
};

export const contact = {
  title: "See where Placement Desk fits.",
  body: "We’ll show you what it can take on, where your people stay involved and what comes back to the team.",
  meta: [
    "Built for brokerage operations",
    "Deployed with your systems and carrier channels",
  ],
};

export const placementDesk = {
  crumb: "Placement Desk",
  title: ["A placement function", "you can send work to."],
  problem:
    "Placement Desk works the markets, pursues quotes and returns the results, so your best producers can stay focused on clients and revenue.",
  does: "It works across the systems and carrier channels your brokerage already uses, without giving producers another tool to manage.",
  real: {
    claim:
      "Built and tested inside QuoteWell, a wholesale brokerage placing live business with real carrier appointments.",
    body: "",
  },
  entry: {
    eyebrow: "How work enters",
    title: "The desk meets the work where it already is.",
    items: [
      {
        title: "Forwarded by a producer",
        body: "A submission or a renewal request forwarded to the desk, the way you would hand it to a colleague.",
      },
      {
        title: "The desk’s own inbox",
        body: "Renewals, carrier correspondence and client documents arriving at an address on your domain.",
      },
      {
        title: "From your systems",
        body: "An AMS event, a renewal date, or another trigger you define.",
      },
    ],
  },
  work: {
    eyebrow: "What the desk does",
    title: "From request to returned results.",
    steps: [
      {
        title: "Gather and structure",
        body: "Pull account information from the submission, AMS and incoming email.",
      },
      {
        title: "Identify what’s missing",
        body: "Flag gaps early and request what’s needed before they delay the market.",
      },
      {
        title: "Assess appetite",
        body: "Check appointed markets against the account, your appetite knowledge and carrier guidelines.",
      },
      {
        title: "Determine markets",
        body: "Build a market plan around incumbents, alternatives and markets worth pursuing.",
      },
      {
        title: "Submit",
        body: "Work portals, APIs and underwriter email based on how each market operates.",
      },
      {
        title: "Follow up",
        body: "Answer questions, chase open threads and complete supplemental forms.",
      },
      {
        title: "Collect",
        body: "Gather quotes, indications and declinations as markets respond.",
      },
      {
        title: "Return",
        body: "Send the results and work record back to the producer’s inbox.",
      },
    ],
  },
  scope: {
    eyebrow: "How much the desk takes on",
    title: "The level of responsibility follows the business.",
    tiers: [
      {
        kicker: "Personal and small commercial lines",
        title: "Toward near-zero-touch placement",
        body: "Where the business is programmatic, the desk can increasingly carry placement through to returned quotes, with human review at the points your controls set.",
      },
      {
        kicker: "Mid-market and complex business",
        title: "The work around the decision",
        body: "The desk gathers and validates information, prepares submissions, identifies markets, coordinates carrier interaction and advances the quoting process. Your professionals stay on strategy, negotiation and judgment.",
      },
    ],
  },
  channels: {
    eyebrow: "Carrier channels",
    title: "Three ways to a market.",
    items: [
      {
        title: "Carrier portals",
        body: "Fills forms, answers qualifying questions and retrieves quotes.",
      },
      {
        title: "Carrier APIs",
        body: "Connects directly where a carrier offers an API.",
      },
      {
        title: "Email",
        body: "Manages the underwriter thread and returns the response.",
      },
    ],
    note: "Channel coverage is configured per deployment, market by market.",
    link: { label: "More on carrier channels", href: "/carrier-channels" },
  },
  systems: {
    title: "Your systems as they are.",
    body: "No new system of record. No second login for producers. No migration. Placement Desk connects to the systems your team already uses.",
    link: { label: "More on system integrations", href: "/integrations" },
  },
  human: {
    eyebrow: "What stays with your people",
    title: "The desk returns finished work. Your people make the call.",
    items: [
      "Advice and recommendations",
      "Client relationships",
      "Market negotiation",
      "Validation and regulated decisions",
    ],
  },
  cta: {
    title: "Tell us how placement runs today.",
    body: "The first conversation covers your current placement workflow, carrier mix and systems.",
    label: "Talk to us about placement capacity",
  },
};

// ---------------------------------------------------------------------------
// Site structure: primary nav with a Products group, and the footer.
// ---------------------------------------------------------------------------

export const primaryNav = {
  menus: [
    {
      label: "Products",
      items: [
        { label: "Placement Desk", href: "/placement-desk", note: "Available now", live: true },
      ],
    },
    {
      label: "Capabilities",
      items: [
        { label: "Platform", href: "/platform", note: "Governed, bounded and auditable" },
        { label: "Security", href: "/security", note: "Authority, record and data isolation" },
        { label: "Carrier channels", href: "/carrier-channels", note: "Portals, APIs and underwriter email" },
        { label: "System integrations", href: "/integrations", note: "AMS, documents, inboxes and data" },
      ],
    },
    {
      label: "Company",
      items: [
        { label: "About", href: "/company", note: "Austin, origin and principles" },
        { label: "Careers", href: "/careers", note: "Work with us" },
        { label: "Resources", href: "/resources", note: "Writing, technical notes and press" },
      ],
    },
  ],
};

export const siteFooter = {
  tagline: "AI workforces for insurance.",
  location: "Austin, Texas",
  columns: [
    {
      label: "Products",
      links: [
        { label: "Placement Desk", href: "/placement-desk" },
      ],
    },
    {
      label: "Capabilities",
      links: [
        { label: "Platform", href: "/platform" },
        { label: "Security", href: "/security" },
        { label: "Carrier channels", href: "/carrier-channels" },
        { label: "System integrations", href: "/integrations" },
        { label: "Applied Epic", href: "/applied-epic" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About", href: "/company" },
        { label: "Careers", href: "/careers" },
        { label: "Resources", href: "/resources" },
        { label: "LinkedIn", href: site.linkedin },
        { label: "sales@thirdplane.com", href: "mailto:sales@thirdplane.com" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Video showcase. Hidden until `src` is set. Drop the production file (or a
// hosted MP4 URL) into `src` and a poster frame into `poster`.
// ---------------------------------------------------------------------------

export const showcase = {
  eyebrow: "See the Placement Desk work",
  title: "Two minutes on what changes when the work moves to a desk.",
  src: "",
  poster: "",
  caption: "",
};

// ---------------------------------------------------------------------------
// /company
// ---------------------------------------------------------------------------

export const companyPage = {
  crumb: "Company",
  title: ["Insurance operators", "who build AI workforces."],
  lead: `Third Plane is based in Austin, Texas. ${aiWorkforceDefinition}`,
  body: "We started with placement because it is where skilled work, execution burden and growth meet. The model extends from there.",
  origin: {
    eyebrow: "Where we come from",
    title: "We ran a wholesale brokerage first.",
    body: [
      "Third Plane was spun out of QuoteWell, a technology-driven wholesale brokerage we built and ran. Placing complex insurance for retail agents taught us where skilled work, execution burden and growth collide, and how much of a broker’s day goes to work that is not brokering.",
      "We used AI inside that brokerage before we offered it to anyone else. That is where we learned how to capture what a good broker knows, connect AI to the systems and carrier channels a brokerage already uses, and define the authority and controls it needs to do insurance work responsibly. Third Plane is that model, made available to other insurance businesses.",
    ],
    facts: [
      { title: "Brokerage operators", body: "We built and ran QuoteWell, a wholesale brokerage, before we built Third Plane." },
      { title: "Spun out, not started from scratch", body: "The playbooks, the operating model and how a desk is governed came with us." },
      { title: "Based in Austin, Texas", body: "A small team of insurance operators and engineers in one room." },
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "Third Plane principles.",
    items: [
      {
        title: "Outcomes, not outputs.",
        body: "Effort and velocity are inputs, not scorecards. We judge ourselves on the value we deliver — co-developing with customers to achieve step change transformation.",
      },
      {
        title: "Stay curious.",
        body: "Execution is cheap now. Judgment isn’t. Ask why before you ask how.",
      },
      {
        title: "Bias to action.",
        body: "Don’t wait for permission — find the gap, close it. Everyone is here for a reason — a high agency team is the difference between our success and failure.",
      },
      {
        title: "Build together.",
        body: "Share work early, iterate live, ask for help and expect your first answer to change. Our size is an advantage: foster debate, move quickly and disagree/commit.",
      },
    ],
  },
  team: {
    eyebrow: "The team",
    title: "People who have run placement, alongside people who build AI systems.",
    body: "Insurance operations, carrier relationships and agency workflows on one side of the table. AI systems that do real work, integrations and deployment on the other. The two have to sit together for this to work.",
    photo: { src: "", alt: "The Third Plane team in Austin." },
    photoNote: "Team photo to come.",
  },
  cta: {
    title: "Talk to us.",
    body: "Whether you run a brokerage, sit on the carrier side, or want to work on this problem with us, the conversation starts the same way.",
  },
};

// ---------------------------------------------------------------------------
// /security
// ---------------------------------------------------------------------------

export const securityPage = {
  crumb: "Security and governance",
  title: ["Built for regulated", "environments."],
  lead: `${aiWorkforceDefinition} Every action is scoped, recorded and attributable to a named person.`,
  body: "Governance is not a layer added after the desk works. It is how the desk is allowed to work at all.",
  authority: {
    eyebrow: "Authority",
    sides: [
      {
        title: "An AI worker can execute.",
        items: [
          {
            title: "Scoped authority",
            body: "Every action a desk takes runs under a defined scope of authority that names what it may do, on which accounts and channels, and for how long.",
          },
          {
            title: "Time-bounded and revocable",
            body: "That authority expires and can be withdrawn at any time. Access can be narrowed without stopping the work that remains in scope.",
          },
        ],
      },
      {
        title: "It is never the principal.",
        items: [
          {
            title: "A named person, always",
            body: "Accountability attaches to a human supervisor for every desk. The same rules apply to people and AI workers alike.",
          },
          {
            title: "Review points you set",
            body: "Where a decision should stay human, the desk stops and returns the work. Those points are configured to your controls, not ours.",
          },
        ],
      },
    ],
  },
  record: {
    eyebrow: "Record",
    title: "Any decision can be reconstructed exactly as it happened.",
    items: [
      {
        title: "Full audit logging",
        body: "Every consequential action is written to an append-only record with attribution: what was done, through which channel, under whose authority.",
      },
      {
        title: "The full course of the work",
        body: "The inputs a worker received and the full course of its work are retained, so a carrier, a regulator or your own E&O review can see how a result was reached.",
      },
      {
        title: "Managed by output",
        body: "Because the record is complete, a desk can be managed the way any function is: by what it produces, against the standard you set.",
      },
    ],
  },
  data: {
    eyebrow: "Data",
    title: "Your data stays yours, and stays separate.",
    items: [
      {
        title: "Isolated at the database layer",
        body: "Each customer’s data is isolated with row-level security enforced on every table. Nothing commingles across customers.",
      },
      {
        title: "Your identity provider",
        body: "Access is controlled through your own single sign-on, with role-based permissions for the people who supervise and review.",
      },
      {
        title: "No third-party telemetry",
        body: "Prompts, documents and completions are never sent to outside analytics or telemetry vendors. Content stays in our own systems.",
      },
      {
        title: "Model-agnostic by design",
        body: "We route work to the model best suited to it, including open-source models, under the same controls. No single provider is load-bearing, and your data never depends on one.",
      },
    ],
  },
  human: {
    eyebrow: "What stays with your people",
    title: "The line between execution and judgment is drawn on purpose.",
    items: [
      "Advice and recommendations to clients",
      "Binding and other regulated decisions",
      "Negotiation with markets",
      "Approval at every review point you define",
    ],
  },
  cta: {
    title: "Bring your compliance and IT teams to the first conversation.",
    body: "We would rather answer the hard questions early. We can walk through authority, records, data isolation and access with the people who will own them.",
  },
};

// ---------------------------------------------------------------------------
// /underwriting-desk
// Copy is a first draft for review: it applies the desk model to underwriting
// support and makes no claims about a live deployment.
// ---------------------------------------------------------------------------

export const underwritingDesk = {
  crumb: "Underwriting Desk",
  status: "In development",
  title: ["Submissions in.", "Quotes out, ready for review."],
  lead: "The Underwriting Desk is the Placement Desk seen from the other side of the submission. Risks come in from brokers, the workforce is designed to carry each one through intake, appetite, rating and quoting, and a finished quote comes back to your underwriters for final review.",
  body: "Underwriters spend much of their day on work that happens before the decision. The desk is built to take on that work, through to a quote, and hand the decision back.",
  entry: {
    eyebrow: "How submissions arrive",
    title: "The desk meets the submission where it lands.",
    items: [
      {
        title: "Broker email",
        body: "Submissions and supplementals arriving at an underwriting inbox, in whatever shape the broker sends them.",
      },
      {
        title: "Portal and API intake",
        body: "Applications submitted through your portal or received through an API or comparative rater.",
      },
      {
        title: "Your systems",
        body: "A new submission in your policy administration or workbench system, or another trigger you define.",
      },
    ],
  },
  work: {
    eyebrow: "What the desk does",
    title: "From submission to quote.",
    steps: [
      {
        title: "Intake and structure",
        body: "The submission read as it arrives, with the application, schedules and loss runs structured into your data model.",
      },
      {
        title: "Appetite and guidelines",
        body: "Every risk checked against your appetite and underwriting guidelines, with out-of-appetite submissions declined or referred by your rules.",
      },
      {
        title: "Complete the file",
        body: "Missing information identified and requested from the broker, the thread worked until the file is complete, and third-party data pulled in where you use it.",
      },
      {
        title: "Rate",
        body: "The risk rated in your rating engine or by your rating rules, with the inputs and the derivation recorded.",
      },
      {
        title: "Quote",
        body: "Terms, conditions and pricing assembled into a quote to your standards, ready for the underwriter to review rather than to build.",
      },
      {
        title: "Return for review",
        body: "The quote, the file behind it and the record of how it was produced, returned to the underwriter for the final decision and release to the broker.",
      },
    ],
  },
  scope: {
    eyebrow: "How much the desk takes on",
    title: "The same model as placement, tuned to your book.",
    tiers: [
      {
        kicker: "Programmatic business",
        title: "Quote-ready with a light review",
        body: "Where risks fit clean guidelines, the desk is designed to carry a submission through to a quote, with the underwriter’s review at the points your controls define.",
      },
      {
        kicker: "Referrals and complex risks",
        title: "The file prepared, the judgment yours",
        body: "Where a risk needs an underwriter’s judgment, the desk completes and structures the file, applies your guidelines, and presents the questions that remain. Your underwriters price and decide.",
      },
    ],
  },
  human: {
    eyebrow: "What stays with your underwriters",
    title: "The desk quotes. Your underwriters decide.",
    items: ["Final review and release of every quote", "Referrals, exceptions and declinations", "Pricing judgment on complex risks", "Broker relationships"],
  },
  status_note:
    "The Underwriting Desk is in development and follows the same governance model as the Placement Desk: scoped authority, a complete record of every action, and a named person accountable for its work.",
  cta: {
    title: "Talk to us about underwriting capacity.",
    body: "Tell us how submissions reach your underwriters today, how they are rated and quoted, and where the queue builds up. We will show you what the desk would take on.",
  },
};

// ---------------------------------------------------------------------------
// /careers
// ---------------------------------------------------------------------------

export const careersPage = {
  crumb: "Careers",
  title: ["Work on how", "insurance work gets done."],
  lead: "We are a small team in Austin building AI workforces for insurance. The problems are concrete, the customers are real, and the work ships into live brokerage operations.",
  body: "We hire people who know insurance deeply, people who build AI systems that do real work, and people who can do both.",
  why: {
    eyebrow: "Why Third Plane",
    title: "What you would be part of.",
    items: [
      {
        title: "Real work, in production",
        body: "Desks run against live submissions, carriers and renewals. You see what you build change how a business operates.",
      },
      {
        title: "Insurance and engineering, together",
        body: "You will sit with people who have run placement and people who have built the systems that do it. Both learn from each other every day.",
      },
      {
        title: "Inside the customer’s operation",
        body: "Much of the work happens inside customers’ operations: capturing context, connecting systems, earning adoption. Deployment is the product.",
      },
      {
        title: "Early, with a foundation",
        body: "Third Plane grew out of QuoteWell, so the model was tested before it was sold. You join early without starting from zero.",
      },
    ],
  },
  how: {
    eyebrow: "How we work",
    title: "Calm, specific, accountable.",
    items: [
      "We say what works today and what we believe will work next, and we keep the two separate.",
      "We write things down: authority, decisions, and the reasons behind them.",
      "We prefer a finished outcome over a demo, and a plain sentence over a slogan.",
      "We are in Austin and we like being in the same room.",
    ],
  },
  roles: {
    eyebrow: "Open roles",
    title: "Roles we are hiring for.",
    empty:
      "No open roles are listed right now. If you know insurance operations or build AI systems that do real work and want to work on this, write to us anyway.",
    items: [
      {
        title: "Senior Product Manager",
        team: "Product",
        location: "Austin, TX and New York, NY",
        href: "https://ats.rippling.com/quotewell/jobs/71209457-1914-4d8d-b9da-3ae577faec6a",
      },
      {
        title: "Software Engineer",
        team: "Product",
        location: "Austin, TX and New York, NY",
        href: "https://ats.rippling.com/quotewell/jobs/87ba22da-e236-4a79-84ac-d5a78bc9f75b",
      },
    ],
  },
  cta: {
    title: "Introduce yourself.",
    body: "Tell us what you have built or what you have run, and what you would want to work on here.",
  },
};

// ---------------------------------------------------------------------------
// /resources
// ---------------------------------------------------------------------------

export const resourcesPage = {
  crumb: "Resources",
  title: ["Writing from", "Third Plane."],
  lead: "Technical notes on how AI workforces do insurance work, perspectives on where the industry is going, and company news.",
  types: {
    technical: "Technical",
    perspective: "Perspective",
    press: "Press",
  },
};

// ---------------------------------------------------------------------------
// /platform
// What the reader gets with a desk: governed, bounded, auditable work.
// The internal platform name is not used on the public site.
// ---------------------------------------------------------------------------

export const alpinePage = {
  crumb: "Platform",
  title: ["The work is governed,", "bounded and auditable."],
  lead: "Every desk runs with scoped authority, named accountability and a complete record of the work, so you stay in control.",
  body: "You do not assemble those controls yourself. You receive a desk that is already allowed to work this way, so it can be deployed into a brokerage rather than demonstrated to one.",
  layers: {
    eyebrow: "What you get",
    title: "What comes with the desk.",
    items: [
      {
        title: "Governed",
        body: "Every action runs under a defined scope of authority that names what the desk may do, on which accounts and channels, and for how long. That authority expires and can be withdrawn. Accountability attaches to a named person.",
      },
      {
        title: "Bounded",
        body: "The desk follows playbooks that capture how your business does the work: the steps, the standards, the exceptions, and where a person must be asked. You are not handed an agent builder.",
      },
      {
        title: "Auditable",
        body: "Every consequential action is written to an append-only record with attribution, so a result can be reconstructed exactly as it happened.",
      },
    ],
  },
  architecture: {
    eyebrow: "How the work moves",
    title: "Between the request and the system of record.",
    columns: [
      {
        kicker: "Work in",
        items: ["Email and attachments", "AMS events", "Documents and forms", "Your team, directly"],
      },
      {
        kicker: "The desk",
        accent: true,
        items: ["Playbooks and standards", "Scoped, revocable authority", "A complete record"],
      },
      {
        kicker: "Systems reached",
        items: ["Carrier portals and APIs", "Underwriter email", "Agency management systems", "Document repositories and inboxes"],
      },
    ],
    note: "Integrations are configured per deployment. Common targets include Applied Epic, AMS360, Sagitta, ImageRight, SharePoint, Outlook and Teams.",
  },
  real: {
    eyebrow: "How it is delivered",
    title: "Built for your operation.",
    body: "Third Plane configures the desk around your work, systems and rules, so it arrives ready to operate inside your business.",
    facts: [
      { title: "You are not handed a builder", body: "Your desk comes with the right access, controls and reporting already configured." },
      { title: "Every action recorded", body: "Authority and record are how the desk runs, not an add-on, so governance holds on day one." },
      { title: "Model-agnostic", body: "Changes models by task when needed without changing the desk’s rules, controls or record." },
    ],
  },
  cta: {
    title: "See where a desk fits in your brokerage.",
    body: "We’ll show you what it can take on, where people stay involved and what comes back to the team.",
    meta: [
      "Built for brokerage operations",
      "Works with your systems and carrier channels",
    ],
  },
};

// ---------------------------------------------------------------------------
// /carrier-channels
// ---------------------------------------------------------------------------

export const carrierChannelsPage = {
  crumb: "Carrier channels",
  title: ["Three ways", "to a market."],
  lead: "Placement Desk works each carrier through its portal, API or underwriter email, so your team can reach more of the markets you already have.",
  body: "Your producers should not have to know which carrier answers by which channel. The desk knows, and works all three in parallel.",
  channels: {
    eyebrow: "The channels",
    title: "One placement process, regardless of channel.",
    items: [
      {
        kicker: "",
        title: "Carrier portals",
        body: "Works the portal from submission through quote.",
      },
      {
        kicker: "",
        title: "Carrier APIs",
        body: "Connects directly where the carrier supports it.",
      },
      {
        kicker: "",
        title: "Underwriter email",
        body: "Manages the thread from submission through response.",
      },
    ],
  },
  coverage: {
    eyebrow: "Coverage",
    title: "Configured market by market.",
    body: "Placement Desk is configured around your carrier appointments and how each market works, so more of your panel gets worked without adding manual placement effort.",
  },
  cta: {
    title: "Tell us which markets you work.",
    body: "Bring your appointment list. We’ll map how Placement Desk would reach them.",
  },
};

// ---------------------------------------------------------------------------
// /integrations
// ---------------------------------------------------------------------------

export const integrationsPage = {
  crumb: "System integrations",
  title: ["Your systems", "as they are."],
  lead: "Placement Desk connects to the systems your brokerage already uses, so the work moves without another system for your team to manage.",
  body: "Placement Desk reads from your AMS, documents and inboxes and writes results back where your team expects them, without adding another system to manage.",
  systems: {
    eyebrow: "What a desk connects to",
    title: "Work goes in. Results come back.",
    items: [
      {
        title: "Agency management systems",
        body: "Reads client and policy data for the submission and writes activities, documents and results back. Connections are configured per deployment.",
        names: "AMS360, Sagitta",
        link: { label: "Applied Epic", href: "/applied-epic" },
      },
      {
        title: "Document repositories",
        body: "Pulls applications, loss runs, schedules and correspondence from where they already live.",
        names: "ImageRight, SharePoint, shared drives",
      },
      {
        title: "Email and collaboration",
        body: "Takes work from Outlook and Teams and returns results there, alongside the desk’s own inbox on your domain.",
        names: "Outlook, Teams",
      },
      {
        title: "Data and reporting",
        body: "Every action and outcome is available to your data lake or reporting tools, so desk performance can be measured alongside the rest of the business.",
      },
      {
        title: "Carrier channels",
        body: "Portals, APIs and underwriter email, worked by the desk directly. Covered in detail on the carrier channels page.",
      },
      {
        title: "Rating and policy systems",
        body: "For the Underwriting Desk: submissions from your intake systems, rating in your engine or by your rules, quotes back to your workbench.",
      },
    ],
  },
  how: {
    eyebrow: "How integration works",
    title: "Read where you allow. Write where you expect.",
    steps: [
      { title: "Map", body: "See what connects and where results should land." },
      { title: "Connect", body: "Use scoped credentials for the systems the desk needs." },
      { title: "Configure", body: "Set what it can read and write back." },
      { title: "Record", body: "Log every read and write." },
    ],
  },
  note: "Integration targets are confirmed during discovery.",
  cta: {
    title: "Tell us what you run.",
    body: "Show us your AMS, inboxes and document systems. We’ll map how Placement Desk would connect.",
  },
};

// ---------------------------------------------------------------------------
// /applied-epic
// Page Applied can link to. Designation is "Certified Applied Vendor".
// Fill badge.src from Applied’s media kit when it arrives. Do not hotlink
// a mark from another vendor’s site.
// ---------------------------------------------------------------------------

export const appliedEpicPage = {
  certified: true,
  crumb: "Applied Epic",
  status: "Certified Applied Vendor",
  date: "",
  title: ["An AI workforce built to work with Applied Epic."],
  titlePending: ["Applied Epic, as it already runs."],
  lead: "Third Plane’s Placement Desk works with Applied Epic to execute placement work and return activities, documents and results where your team already lives.",
  badge: {
    src: "",
    alt: "Certified Applied Vendor",
  },
  who: {
    title: "Keep Epic at the center of your operation.",
    body: "Third Plane works with the systems and workflows your brokerage already uses. For Applied Epic agencies, Placement Desk can take on defined placement work without requiring your team to move into a new system or manage another daily tool.",
    items: [
      { title: "Epic stays your system of record" },
      { title: "Placement Desk works around your existing workflow" },
      { title: "Your team gets the results back where they already live" },
    ],
  },
  work: {
    title: "How your AI workforce works with Applied Epic.",
    items: [
      {
        title: "Works from your Epic data.",
        body: "Placement Desk uses the account and policy information already available in Applied Epic.",
      },
      {
        title: "Writes the work back.",
        body: "Activities, documents and results return to Epic where your team already lives.",
      },
      {
        title: "Starts renewal work automatically.",
        body: "Placement Desk can identify upcoming renewals in Epic and begin defined placement work before your team has to start it manually.",
      },
    ],
  },
  meaning: {
    title: "What Applied certification means for your brokerage.",
    items: [
      {
        title: "Vetted by Applied",
        body: "The integration goes through Applied’s certification process.",
      },
      {
        title: "Faster to connect",
        body: "A certified integration provides a faster path to connecting with Applied Epic.",
      },
      {
        title: "No additional purchase from Applied",
        body: "Connecting a desk to Epic does not require a separate product buy from Applied.",
      },
      {
        title: "Built to stay current with Epic",
        body: "Certified vendors receive access to the latest Applied Epic releases so their integrations can remain current as Epic changes.",
      },
    ],
  },
  quote: { text: "", attribution: "" },
  cta: {
    title: "Run Epic? Give the work somewhere to go.",
    body: "Tell us how placement works in your brokerage. We’ll show you where an AI workforce can connect to Epic and take defined work off your team’s plate.",
  },
};
