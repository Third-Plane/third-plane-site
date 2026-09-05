// Single source of truth for all page copy. Components handle layout only.
//
// Written against the Brand Messaging Framework (draft 002) and the Brand
// Positioning Narrative (3 Sep 2026). Deliberately lean: the site states the
// thesis, shows the Placement Desk, and stops. Held back on purpose: the
// competitive frame, the proof-boundary detail, performance numbers, future
// desk names, the Alpine name, and pricing.

const email = 'sales@thirdplane.com'

export const site = {
  name: 'Third Plane',
  tagline: 'AI workforces for insurance',
  email,
  mailto: `mailto:${email}`,
  ctaLabel: 'Start a conversation',
  year: 2026,
}

export const nav = {
  links: [
    { label: 'Placement Desk', href: '/placement-desk' },
    { label: 'Approach', href: '/#approach' },
    { label: 'Company', href: '/#company' },
  ],
}

export const hero = {
  eyebrow: 'AI workforces for insurance',
  title: ['Assign the work to AI.', 'Keep the judgment with your people.'],
  lead:
    'Third Plane gives insurance businesses dedicated AI operating capacity: a workforce that takes responsibility for defined work across the systems and carrier channels you already use.',
  body: 'It starts with placement. Send the Placement Desk a submission or a renewal. Your team gets the markets, the quotes and a record of the work back.',
  secondary: { label: 'See the Placement Desk', href: '/placement-desk' },
  ledger: {
    label: 'Placement Desk',
    sublabel: 'Activity',
    legend: [
      { status: 'done', label: 'Completed by the desk' },
      { status: 'review', label: 'Returned to a person' },
    ],
  },
}

// Placeholder names throughout, so the ledger can never read as client data.
export const ledger = [
  { task: 'Submission received by email: Sample Bakery LLC, BOP', status: 'done' },
  { task: 'Account information structured from the ACORD and loss runs', status: 'done' },
  { task: 'Missing information flagged: prior carrier, current payroll', status: 'review' },
  { task: 'Producer reply filed: payroll confirmed', status: 'done' },
  { task: 'Appetite assessed across 12 appointed markets', status: 'done' },
  { task: 'Markets selected: 5 to approach', status: 'done' },
  { task: 'Portal submission complete: Demo Mutual', status: 'done' },
  { task: 'Submitted by email to underwriter: Example Specialty', status: 'done' },
  { task: 'Quote returned through carrier API: Sample Carrier Co.', status: 'done' },
  { task: 'Follow-up sent: Example Specialty, day two', status: 'done' },
  { task: 'Quote received: Demo Mutual', status: 'done' },
  { task: 'Results returned to producer: 3 quotes, 1 declination, record attached', status: 'review' },
  { task: 'Renewal detected in AMS: Placeholder Mfg, 90 days out', status: 'done' },
  { task: 'Renewal information gathered from policy file and prior submission', status: 'done' },
  { task: 'Appetite assessed: incumbent plus 8 alternatives', status: 'done' },
  { task: 'Portal submission complete: Sample Carrier Co., supplemental forms', status: 'done' },
  { task: 'Underwriter question answered: prior loss detail', status: 'done' },
  { task: 'No market fit: routed to account manager with the record', status: 'review' },
]

export const capacity = {
  eyebrow: 'The capacity problem',
  title: 'It takes more work to place the same business.',
  body:
    'Accounts that were remarketed every few years are now worked every year, across more markets. More submissions, more portal entry, more carrier follow-up, more quote comparison. The outcome is the same placed policy. The effort behind it keeps growing.',
  points: [
    {
      title: 'Skilled capacity is finite',
      body: 'Producers and account managers spend their days gathering information, rekeying it into portals, chasing responses and comparing quotes. Their capacity decides how many markets get approached and how proactively renewals get handled.',
    },
    {
      title: 'Another tool is not more capacity',
      body: 'Every new system adds an interface, a workflow and an adoption burden. Someone still has to operate it, supervise it and fit it into their day.',
    },
    {
      title: 'Hiring preserves the constraint',
      body: 'Another hire adds capacity on the same cost curve. The market knowledge still lives in individual inboxes and habits, and leaves when they do.',
    },
  ],
  closing:
    'The cost shows up as markets that never get shopped, quotes that arrive late, renewals that slip, and business your team never had the capacity to pursue.',
}

export const shift = {
  eyebrow: 'Where AI sits',
  title: 'Most AI is another tool for your people. We put it somewhere else.',
  body:
    'Give an employee a tool and the employee still owns the work. Third Plane assigns defined work to AI as part of how the organization operates, so the work moves to the workforce and the outcome moves back to your people.',
  models: [
    {
      kicker: 'The tool model',
      chain: ['Employee', 'AI tool', 'Task'],
      note: 'The person operates the technology, supervises the output and owns the execution. Gains are capped by the people you employ.',
    },
    {
      kicker: 'The Third Plane model',
      chain: ['Organization', 'Defined work', 'AI workforce', 'Completed outcome'],
      accent: true,
      note: 'The business decides what work AI owns. The workforce does it across your systems, in parallel. People review the result and keep the decisions that should stay human.',
    },
  ],
  definition: {
    kicker: 'What we mean by an AI workforce',
    items: [
      { title: 'Defined responsibilities', body: 'It owns specific work, and nothing else.' },
      { title: 'Bounded authority', body: 'What it may do on its own is written down and scoped.' },
      { title: 'Works in your systems', body: 'AMS, carrier portals, APIs and email. No new interface to adopt.' },
      { title: 'Human supervision', body: 'A person is accountable for its work and reviews what comes back.' },
      { title: 'Measurable outcomes', body: 'Managed by what it produces, like any other function.' },
    ],
  },
}

export const deskOverview = {
  eyebrow: 'The Placement Desk',
  title: 'Send the work to the Placement Desk. Your team gets the quotes back.',
  body:
    'A dedicated placement function staffed by AI workers. It takes defined placement work from request to returned market results, new business and renewals alike.',
  columns: [
    {
      kicker: 'Work goes in',
      items: ['A producer forwards a submission', 'A renewal lands in the desk’s own inbox', 'An AMS event or another defined trigger'],
    },
    {
      kicker: 'The desk works it',
      accent: true,
      items: [
        'Gathers and structures the account information',
        'Flags what is missing and asks for it',
        'Assesses appetite and selects markets',
        'Submits through carrier portals, APIs and email',
        'Follows up with carriers and answers questions',
        'Collects quotes, declinations and responses',
      ],
    },
    {
      kicker: 'Results come back',
      items: ['Market results and quotes, compared', 'A record of what was done and when', 'Ready for your team’s judgment and the client conversation'],
    },
  ],
  closing:
    'The desk works carriers on its own credentials, handles accounts in parallel, and applies the same standard whether the account sits with a new hire or your best producer.',
  cta: { label: 'How the Placement Desk works', href: '/placement-desk' },
}

export const deployment = {
  eyebrow: 'How it is deployed',
  title: 'Built for deployment, not demonstration.',
  body:
    'An AI worker without your context cannot do meaningful insurance work. Standing up a desk means capturing how your business places, connecting your systems and carrier channels, and defining what the desk may do on its own.',
  cards: [
    {
      title: 'Your context, captured',
      body: 'Appointments, appetite knowledge, submission standards and operating rules. The way your brokerage actually works, kept by the organization rather than in individual inboxes.',
    },
    {
      title: 'Authority, defined',
      body: 'What the desk may do without asking, where it stops, and who reviews. Access is scoped to the work and can be constrained or revoked.',
    },
    {
      title: 'Every action, recorded',
      body: 'A record of what was done, through which channel, and what came back. You manage the desk by what it produces.',
    },
    {
      title: 'Judgment stays human',
      body: 'Advice, client relationships, negotiation and regulated decisions remain with your licensed professionals. The desk hands them finished work, not decisions.',
    },
  ],
}

export const company = {
  eyebrow: 'Why Third Plane',
  title: 'We learned this inside a brokerage first.',
  body: [
    'Third Plane grew out of QuoteWell, a technology-driven wholesale brokerage. We were our own first customer: real producers, real markets, real placement work.',
    'That is where we learned how to capture what a good broker knows, connect AI to the systems and carrier channels a brokerage already uses, and define the authority and controls it needs to do insurance work responsibly.',
  ],
  facts: [
    { title: 'Insurance operators and engineers', body: 'People who have run placement alongside people who build and deploy AI systems.' },
    { title: 'Tested on real work', body: 'The model was developed against live insurance workflows before it was offered to anyone else.' },
    { title: 'Now deploying externally', body: 'Working with insurance businesses to stand up their first desk.' },
  ],
}

export const horizon = {
  title: 'Placement is the first desk.',
  body:
    'The same model extends to other defined insurance work as AI becomes capable of owning more of it. Our ambition is to help insurance businesses organize work around what people and AI are each best equipped to do.',
}

export const cta = {
  title: 'Talk to us about placement capacity.',
  body: 'Tell us how placement runs in your business today. We will show you where a desk fits, what it would take on, and what your team would get back.',
  meta: ['Built for brokerage leadership', 'Deployed with your systems and carrier channels'],
}

export const footer = {
  tagline: 'AI workforces for insurance.',
  links: [
    { label: 'Placement Desk', href: '/placement-desk' },
    { label: 'Approach', href: '/#approach' },
    { label: 'Company', href: '/#company' },
    { label: 'Contact', href: `mailto:${email}` },
  ],
}

// ---------------------------------------------------------------------------
// /placement-desk
// ---------------------------------------------------------------------------

export const placementDesk = {
  crumb: 'Placement Desk',
  title: ['A placement function', 'you can send work to.'],
  lead:
    'The Third Plane Placement Desk takes defined placement work from request to returned market results, across the systems and carrier channels your brokerage already uses.',
  body: 'Your producers should not have to log into five carrier portals to find out which markets will quote an account. The desk does that work and returns the answer.',

  entry: {
    eyebrow: 'How work enters',
    title: 'The desk meets the work where it already is.',
    items: [
      { title: 'Forwarded by a producer', body: 'A submission or a renewal request forwarded to the desk, the way you would hand it to a colleague.' },
      { title: 'The desk’s own inbox', body: 'Renewals, carrier correspondence and client documents arriving at an address on your domain.' },
      { title: 'From your systems', body: 'An AMS event, a renewal date, or another trigger you define.' },
    ],
  },

  work: {
    eyebrow: 'What the desk does',
    title: 'From request to returned results.',
    steps: [
      { title: 'Gather and structure', body: 'Account information pulled from the submission, the AMS, and whatever arrives later by email.' },
      { title: 'Identify what is missing', body: 'Gaps flagged early and requested from the producer or the client before they hold up a market.' },
      { title: 'Assess appetite', body: 'Every appointed market considered against the account, using your appetite knowledge and the carriers’ own guidelines.' },
      { title: 'Determine markets', body: 'A market plan built to your standards: incumbent, alternatives, and the ones not worth approaching.' },
      { title: 'Submit', body: 'Carrier portals filled, carrier APIs used where available, underwriters emailed. Whichever way that market works.' },
      { title: 'Follow up', body: 'Questions answered, stale threads chased, supplemental forms completed.' },
      { title: 'Collect', body: 'Quotes, indications and declinations gathered and compared as they come in.' },
      { title: 'Return', body: 'Results and a record of the work, delivered to the producer in the inbox they already use.' },
    ],
  },

  scope: {
    eyebrow: 'How much the desk takes on',
    title: 'The level of responsibility follows the business.',
    tiers: [
      {
        kicker: 'Personal and small commercial lines',
        title: 'Toward near-zero-touch placement',
        body: 'Where the business is programmatic, the desk can carry placement end to end, with review points set by your controls.',
      },
      {
        kicker: 'Mid-market and complex business',
        title: 'The work around the decision',
        body: 'The desk gathers and validates information, prepares submissions, identifies markets, coordinates carrier interaction and advances the quoting process. Your professionals stay on strategy, negotiation and judgment.',
      },
    ],
  },

  channels: {
    eyebrow: 'Carrier channels',
    title: 'Three ways to a market.',
    items: [
      { title: 'Carrier portals', body: 'The desk holds its own logins, fills the forms, answers the qualifying questions and retrieves the quote.' },
      { title: 'Carrier APIs', body: 'Direct, where a carrier offers one.' },
      { title: 'Email', body: 'Where a market runs on underwriter relationships, the desk sends from its own address and works the thread.' },
    ],
    note: 'Channel coverage is configured per deployment, market by market.',
  },

  human: {
    eyebrow: 'What stays with your people',
    title: 'The desk returns finished work. Your people make the call.',
    items: ['Advice and recommendations', 'Client relationships', 'Negotiation with markets', 'Regulated decisions and binding'],
  },

  cta: {
    title: 'See what the desk would take on in your book.',
    body: 'We start with how placement runs today: lines, markets, systems and volume. From there we can show you what the Placement Desk would own and where your team stays in the loop.',
  },
}
