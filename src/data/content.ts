export const site = {
  name: "Third Plane",
  tagline: "AI workforces for insurance",
  email: "sales@thirdplane.com",
  mailto: "mailto:sales@thirdplane.com",
  ctaLabel: "Start a conversation",
  year: 2026,
};

export const nav = {
  links: [
    { label: "Placement Desk", href: "/placement-desk" },
    { label: "Approach", href: "/#approach" },
    { label: "Company", href: "/#company" },
  ],
};

export const homeHero = {
  eyebrow: "AI workforces for insurance",
  title: ["Assign the work to AI.", "Keep the judgment with your people."],
  lead: "Third Plane gives insurance businesses dedicated AI operating capacity: a workforce that takes responsibility for defined work across the systems and carrier channels you already use.",
  body: "It starts with placement. Send the Placement Desk a submission or a renewal. Your team gets the markets, the quotes and a record of the work back.",
  secondary: { label: "See the Placement Desk", href: "/placement-desk" },
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
  title: "It takes more work to place the same business.",
  body: "Accounts that were remarketed every few years are now worked every year, across more markets. More submissions, more portal entry, more carrier follow-up, more quote comparison. The outcome is the same placed policy. The effort behind it keeps growing.",
  points: [
    {
      title: "Skilled capacity is finite",
      body: "Producers and account managers spend their days gathering information, rekeying it into portals, chasing responses and comparing quotes. Their capacity decides how many markets get approached and how proactively renewals get handled.",
    },
    {
      title: "Another tool is not more capacity",
      body: "Every new system adds an interface, a workflow and an adoption burden. Someone still has to operate it, supervise it and fit it into their day.",
    },
    {
      title: "Hiring preserves the constraint",
      body: "Another hire adds capacity on the same cost curve. The market knowledge still lives in individual inboxes and habits, and leaves when they do.",
    },
  ],
  closing:
    "The cost shows up as markets that never get shopped, quotes that arrive late, renewals that slip, and business your team never had the capacity to pursue.",
};

export const approach = {
  eyebrow: "Where AI sits",
  title: "Most AI is another tool for your people. We put it somewhere else.",
  body: "Give an employee a tool and the employee still owns the work. Third Plane assigns defined work to AI as part of how the organization operates, so the work moves to the workforce and the outcome moves back to your people.",
  models: [
    {
      kicker: "The tool model",
      chain: ["Employee", "AI tool", "Task"],
      note: "The person operates the technology, supervises the output and owns the execution. Gains are capped by the people you employ.",
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
      note: "The business decides what work AI owns. The workforce does it across your systems, in parallel. People review the result and keep the decisions that should stay human.",
      accent: true,
    },
  ],
  definition: {
    kicker: "What we mean by an AI workforce",
    items: [
      {
        title: "Defined responsibilities",
        body: "It owns specific work, and nothing else.",
      },
      {
        title: "Bounded authority",
        body: "What it may do on its own is written down and scoped.",
      },
      {
        title: "Works in your systems",
        body: "AMS, carrier portals, APIs and email. No new interface to adopt.",
      },
      {
        title: "Human supervision",
        body: "A person is accountable for its work and reviews what comes back.",
      },
      {
        title: "Measurable outcomes",
        body: "Managed by what it produces, like any other function.",
      },
    ],
  },
};

export const desk = {
  eyebrow: "The Placement Desk",
  title: "Send the work to the Placement Desk. Your team gets the quotes back.",
  body: "A dedicated placement function staffed by AI workers. It takes defined placement work from request to returned market results, new business and renewals alike.",
  columns: [
    {
      kicker: "Work goes in",
      items: [
        "A producer forwards a submission",
        "A renewal lands in the desk’s own inbox",
        "An AMS event or another defined trigger",
      ],
    },
    {
      kicker: "The desk works it",
      accent: true,
      items: [
        "Gathers and structures the account information",
        "Flags what is missing and asks for it",
        "Assesses appetite and selects markets",
        "Submits through carrier portals, APIs and email",
        "Follows up with carriers and answers questions",
        "Collects quotes, declinations and responses",
      ],
    },
    {
      kicker: "Results come back",
      items: [
        "Market results and quotes, compared",
        "A record of what was done and when",
        "Ready for your team’s judgment and the client conversation",
      ],
    },
  ],
  closing:
    "The desk works carriers on its own credentials, handles accounts in parallel, and applies the same standard whether the account sits with a new hire or your best producer.",
  cta: { label: "How the Placement Desk works", href: "/placement-desk" },
};

export const roles = {
  eyebrow: "Where the work sits",
  title: "Procurement is not consultation.",
  body: "Today the same people do both. One of these should be automated to the floor. The other is the only reason to have people at all.",
  columns: [
    {
      kicker: "The Placement Desk",
      title: "Procurement",
      accent: true,
      items: [
        "Reading the risk and building the submission",
        "Filling portals and answering qualifying questions",
        "Emailing underwriters and chasing replies",
        "Normalizing quotes so they can be compared",
      ],
    },
    {
      kicker: "Your people",
      title: "Consultation",
      items: [
        "Explaining what the coverage actually does",
        "Handling the exception and the objection",
        "Owning the client relationship",
      ],
    },
  ],
  closing:
    "Procurement becomes a function. Consultation stays with your people.",
};

export const deployment = {
  eyebrow: "How it is deployed",
  title: "Built for deployment, not demonstration.",
  body: "An AI worker without your context cannot do meaningful insurance work. Standing up a desk means capturing how your business places, connecting your systems and carrier channels, and defining what the desk may do on its own.",
  cards: [
    {
      icon: "context" as const,
      title: "Your context, captured",
      body: "Appointments, appetite knowledge, submission standards and operating rules. The way your brokerage actually works, kept by the organization rather than in individual inboxes.",
    },
    {
      icon: "authority" as const,
      title: "Authority, defined",
      body: "What the desk may do without asking, where it stops, and who reviews. Access is scoped to the work and can be constrained or revoked.",
    },
    {
      icon: "record" as const,
      title: "Every action, recorded",
      body: "A record of what was done, through which channel, and what came back. You manage the desk by what it produces.",
    },
    {
      icon: "human" as const,
      title: "Judgment stays human",
      body: "Advice, client relationships, negotiation and regulated decisions remain with your licensed professionals. The desk hands them finished work, not decisions.",
    },
  ],
};

export const company = {
  eyebrow: "Why Third Plane",
  title: "We learned this inside a brokerage first.",
  body: [
    "Third Plane grew out of QuoteWell, a technology-driven wholesale brokerage. We were our own first customer: real producers, real markets, real placement work.",
    "That is where we learned how to capture what a good broker knows, connect AI to the systems and carrier channels a brokerage already uses, and define the authority and controls it needs to do insurance work responsibly.",
  ],
  facts: [
    {
      title: "Insurance operators and engineers",
      body: "People who have run placement alongside people who build and deploy AI systems.",
    },
    {
      title: "Tested on real work",
      body: "The model was developed against live insurance workflows before it was offered to anyone else.",
    },
    {
      title: "Now deploying externally",
      body: "Working with insurance businesses to stand up their first desk.",
    },
  ],
};

export const horizon = {
  title: "Placement is the first desk.",
  body: "The same model extends to other defined insurance work as AI becomes capable of owning more of it. Our ambition is to help insurance businesses organize work around what people and AI are each best equipped to do.",
};

export const discovery = {
  eyebrow: "How we start",
  title: "Start with discovery.",
  body: "Before we propose anything, we learn how placement actually runs in your business today.",
  steps: [
    {
      title: "Sit with the work",
      body: "Half a day with whoever owns the queue today. We watch how it runs, not how the diagram says it runs.",
    },
    {
      title: "Map the channels",
      body: "Which markets answer by API, which need a portal, which need an email, and what each one costs you in hours.",
    },
    {
      title: "Come back with a plan",
      body: "A named deployment spec, a measured baseline for the work we mapped, and the authority boundaries written down.",
    },
  ],
  closing:
    "Nothing to buy at this stage. Discovery is how we both find out whether there is a deployment worth building.",
};

export const contact = {
  title: "Talk to us about placement capacity.",
  body: "Tell us how placement runs in your business today. We will show you where a desk fits, what it would take on, and what your team would get back.",
  meta: [
    "Built for brokerage leadership",
    "Deployed with your systems and carrier channels",
  ],
};

export const footer = {
  tagline: "AI workforces for insurance.",
  links: [
    { label: "Placement Desk", href: "/placement-desk" },
    { label: "Approach", href: "/#approach" },
    { label: "Company", href: "/#company" },
    { label: "Contact", href: "mailto:sales@thirdplane.com" },
  ],
};

export const placementDesk = {
  crumb: "Placement Desk",
  title: ["A placement function", "you can send work to."],
  lead: "The Third Plane Placement Desk takes defined placement work from request to returned market results, across the systems and carrier channels your brokerage already uses.",
  body: "Your producers should not have to log into five carrier portals to find out which markets will quote an account. The desk does that work and returns the answer.",
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
        body: "Account information pulled from the submission, the AMS, and whatever arrives later by email.",
      },
      {
        title: "Identify what is missing",
        body: "Gaps flagged early and requested from the producer or the client before they hold up a market.",
      },
      {
        title: "Assess appetite",
        body: "Every appointed market considered against the account, using your appetite knowledge and the carriers’ own guidelines.",
      },
      {
        title: "Determine markets",
        body: "A market plan built to your standards: incumbent, alternatives, and the ones not worth approaching.",
      },
      {
        title: "Submit",
        body: "Carrier portals filled, carrier APIs used where available, underwriters emailed. Whichever way that market works.",
      },
      {
        title: "Follow up",
        body: "Questions answered, stale threads chased, supplemental forms completed.",
      },
      {
        title: "Collect",
        body: "Quotes, indications and declinations gathered and compared as they come in.",
      },
      {
        title: "Return",
        body: "Results and a record of the work, delivered to the producer in the inbox they already use.",
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
        body: "Where the business is programmatic, the desk can carry placement end to end, with review points set by your controls.",
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
        body: "The desk holds its own logins, fills the forms, answers the qualifying questions and retrieves the quote.",
      },
      {
        title: "Carrier APIs",
        body: "Direct, where a carrier offers one.",
      },
      {
        title: "Email",
        body: "Where a market runs on underwriter relationships, the desk sends from its own address and works the thread.",
      },
    ],
    note: "Channel coverage is configured per deployment, market by market.",
  },
  human: {
    eyebrow: "What stays with your people",
    title: "The desk returns finished work. Your people make the call.",
    items: [
      "Advice and recommendations",
      "Client relationships",
      "Negotiation with markets",
      "Regulated decisions and binding",
    ],
  },
  cta: {
    title: "See what the desk would take on in your book.",
    body: "We start with how placement runs today: lines, markets, systems and volume. From there we can show you what the Placement Desk would own and where your team stays in the loop.",
  },
};

// ---------------------------------------------------------------------------
// Site structure: primary nav with a Desks group, and the footer.
// ---------------------------------------------------------------------------

export const primaryNav = {
  desks: {
    label: "Desks",
    items: [
      {
        label: "Placement Desk",
        href: "/placement-desk",
        note: "Available now",
        live: true,
      },
      {
        label: "Underwriting Desk",
        href: "/underwriting-desk",
        note: "In development",
        live: false,
      },
    ],
    capabilities: {
      label: "Capabilities",
      items: [
        { label: "Alpine, the platform", href: "/alpine" },
        { label: "Carrier channels", href: "/placement-desk#channels" },
        { label: "Security and governance", href: "/security" },
      ],
    },
  },
  links: [
    { label: "Security", href: "/security" },
    { label: "Company", href: "/company" },
    { label: "Resources", href: "/resources" },
    { label: "Careers", href: "/careers" },
  ],
};

export const siteFooter = {
  tagline: "AI workforces for insurance.",
  location: "Austin, Texas",
  columns: [
    {
      label: "Desks",
      links: [
        { label: "Placement Desk", href: "/placement-desk" },
        { label: "Underwriting Desk", href: "/underwriting-desk" },
        { label: "Alpine", href: "/alpine" },
        { label: "Security and governance", href: "/security" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About", href: "/company" },
        { label: "Careers", href: "/careers" },
        { label: "Resources", href: "/resources" },
      ],
    },
    {
      label: "Contact",
      links: [{ label: "sales@thirdplane.com", href: "mailto:sales@thirdplane.com" }],
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
  lead: "Third Plane is based in Austin, Texas. We give insurance businesses dedicated AI operating capacity: desks that take responsibility for defined work across the systems and carrier channels the business already uses.",
  body: "We started with placement because it is where skilled work, execution burden and growth meet. The model extends from there.",
  origin: {
    eyebrow: "Where we come from",
    title: "We were our own first customer.",
    body: [
      "Third Plane grew out of QuoteWell, a technology-driven wholesale brokerage. Before we offered an AI workforce to anyone else, we ran one against our own book: real producers, real markets, real placement work.",
      "That is where we learned how to capture what a good broker knows, connect AI to the systems and carrier channels a brokerage already uses, and define the authority and controls it needs to do insurance work responsibly.",
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "What we believe, and how it shows up in the work.",
    items: [
      {
        title: "Assign the work, not the tool",
        body: "AI creates the most value when the business gives it responsibility for defined work, rather than asking every employee to operate another piece of software.",
      },
      {
        title: "Judgment stays with people",
        body: "Advice, relationships, negotiation and regulated decisions remain with licensed professionals. A desk returns finished work, not decisions.",
      },
      {
        title: "Authority is written down",
        body: "What a desk may do on its own is scoped, recorded and revocable. Accountability always attaches to a named person.",
      },
      {
        title: "Deployment is the product",
        body: "An AI worker without your context cannot do meaningful insurance work. Capturing how your business operates and connecting your systems is part of what we deliver.",
      },
      {
        title: "Insurance first, models second",
        body: "We use the best model for each job, including open source. Our edge is insurance context and the operating model around it, not any one lab’s tokens.",
      },
      {
        title: "Say what works today",
        body: "We separate what a desk does now from what we believe it will do next. High conviction, plainly stated, with the boundaries marked.",
      },
    ],
  },
  team: {
    eyebrow: "The team",
    title: "People who have run placement, alongside people who build AI systems.",
    body: "Insurance operations, carrier relationships and agency workflows on one side of the table. Agentic systems, integrations and deployment on the other. The two have to sit together for this to work.",
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
  lead: "An AI workforce does insurance work under authority your compliance officer can read. Every action is scoped, recorded and attributable to a named person.",
  body: "Governance is not a layer added after the desk works. It is how the desk is allowed to work at all.",
  authority: {
    eyebrow: "Authority",
    title: "An AI worker can execute. It is never the principal.",
    items: [
      {
        title: "Scoped grants",
        body: "Every action a desk takes runs under a grant that names what it may do, on which accounts and channels, and for how long.",
      },
      {
        title: "Time-bounded and revocable",
        body: "Grants expire and can be withdrawn at any time. Access can be narrowed without stopping the work that remains in scope.",
      },
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
  record: {
    eyebrow: "Record",
    title: "Any decision can be reconstructed exactly as it happened.",
    items: [
      {
        title: "Full audit logging",
        body: "Every consequential action is written to an append-only record with attribution: what was done, through which channel, under whose authority.",
      },
      {
        title: "Complete worker traces",
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
        body: "We route work to the model best suited to it, including open-source models, under the same controls. No single provider holds your data hostage.",
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
  title: ["The work around", "the underwriting decision."],
  lead: "The Underwriting Desk applies the Third Plane model to the other side of the submission: the gathering, checking and preparation that happens before an underwriter can decide.",
  body: "Underwriters spend much of their day on work that is not underwriting. The desk takes that work on and returns a decision-ready file.",
  work: {
    eyebrow: "What the desk takes on",
    title: "Decision-ready, not decided.",
    steps: [
      {
        title: "Intake and triage",
        body: "Submissions read as they arrive, structured, and sorted against appetite and guidelines before they reach a queue.",
      },
      {
        title: "Completeness",
        body: "Missing information identified and requested from the broker early, with the thread worked until the file is complete.",
      },
      {
        title: "Enrichment",
        body: "Third-party data, loss history and prior terms pulled together and reconciled against the application.",
      },
      {
        title: "Preparation",
        body: "The file summarised against your guidelines, with the questions an underwriter would ask already answered where they can be.",
      },
      {
        title: "Correspondence",
        body: "Broker questions answered and follow-ups sent from the desk’s own address, with a record of every exchange.",
      },
      {
        title: "Return",
        body: "A decision-ready file, a recommendation where your rules allow one, and the record of how it was assembled.",
      },
    ],
  },
  human: {
    eyebrow: "What stays with your underwriters",
    title: "The desk prepares. Your underwriters decide.",
    items: ["Risk selection and pricing", "Terms and conditions", "Referrals and exceptions", "Broker relationships"],
  },
  status_note:
    "The Underwriting Desk is in development with early partners. It follows the same governance model as the Placement Desk: scoped authority, a complete record, and a named person accountable for its work.",
  cta: {
    title: "Shape the Underwriting Desk with us.",
    body: "We are working with a small number of carriers and MGAs on the first deployments. If underwriting capacity is the constraint in your business, we would like to talk.",
  },
};

// ---------------------------------------------------------------------------
// /careers
// ---------------------------------------------------------------------------

export const careersPage = {
  crumb: "Careers",
  title: ["Work on the operating model", "insurance will run on."],
  lead: "We are a small team in Austin building AI workforces for insurance. The problems are concrete, the customers are real, and the work ships into live brokerage operations.",
  body: "We hire people who know insurance deeply, people who build agentic systems well, and people who can do both.",
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
        title: "Forward deployed",
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
      "No open roles are listed right now. If you know insurance operations or build agentic systems and want to work on this, write to us anyway.",
    items: [] as Array<{ title: string; team: string; location: string; href: string }>,
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
// /alpine
// The platform underneath every desk. Public for the first time; drawn from
// the architecture and "how we work" material in the sales deck.
// ---------------------------------------------------------------------------

export const alpinePage = {
  crumb: "Alpine",
  title: ["The platform", "every desk runs on."],
  lead: "Alpine is how Third Plane builds, governs and runs AI workers. Every desk is assembled on it: the workers, the rules they follow, the systems they reach, and the record they leave behind.",
  body: "Customers do not configure Alpine. They receive a desk built on it. But the platform is real, it is ours, and it is why a desk can be deployed into a brokerage rather than demonstrated to one.",
  layers: {
    eyebrow: "What Alpine provides",
    title: "Four layers, one operating model.",
    items: [
      {
        title: "Agent building",
        body: "Workers are assembled from playbooks that capture how your business does a piece of work: the steps, the standards, the exceptions, and where a person must be asked.",
      },
      {
        title: "Governance",
        body: "Scoped, time-bounded, revocable grants for every action. Role-based access through your identity provider. An append-only record with full attribution.",
      },
      {
        title: "Model routing",
        body: "Model-agnostic by design. Each task is routed to the model best suited to it, including open-source models, under the same controls and the same record.",
      },
      {
        title: "Connections",
        body: "Carrier portals, carrier APIs and underwriter email. Your AMS, document repository and inboxes as sources and destinations. Read and written back where you allow it.",
      },
    ],
  },
  architecture: {
    eyebrow: "How it fits together",
    title: "Between the request and the system of record.",
    columns: [
      {
        kicker: "Work in",
        items: ["Email and attachments", "AMS events", "Documents and forms", "Your team, directly"],
      },
      {
        kicker: "Alpine",
        accent: true,
        items: ["Desks and their workers", "Playbooks and standards", "Governance and record", "Model routing"],
      },
      {
        kicker: "Systems reached",
        items: ["Carrier portals and APIs", "Underwriter email", "Agency management systems", "Document repositories and inboxes"],
      },
    ],
    note: "Integrations are configured per deployment. Common targets include Applied Epic, AMS360, Sagitta, ImageRight, SharePoint, Outlook and Teams.",
  },
  real: {
    eyebrow: "Proven in use",
    title: "Built inside a brokerage before it was offered to one.",
    body: "Alpine took shape inside QuoteWell, where it ran placement against live carrier appointments and real renewals. The Placement Desk is its first deployed function. The Underwriting Desk is the next.",
    facts: [
      { title: "Forward deployed", body: "Third Plane engineers capture your context and configure the desk. You are not handed an agent builder." },
      { title: "Every action recorded", body: "Traces and grants are part of the platform, not an add-on, so governance holds on day one." },
      { title: "Model-agnostic", body: "No single lab’s model is load-bearing. We choose per task and can change as models change." },
    ],
  },
  cta: {
    title: "See a desk running on Alpine.",
    body: "The fastest way to understand the platform is to watch a desk do real work on it. We can show you one against a sample of your own submissions.",
  },
};
