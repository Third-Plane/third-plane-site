// Single source of truth for all page copy.
// Edit text here; components handle layout only.

const email = 'sales@thirdplane.com'

export const site = {
  name: 'Third Plane',
  wordmark: 'Thirdplane',
  email,
  mailto: `mailto:${email}`,
  ctaLabel: 'Request a conversation',
  year: 2026,
}

export const nav = [
  { label: 'Product', href: '#product' },
  { label: 'Alpine', href: '#alpine' },
  { label: 'Proof', href: '#proof' },
  { label: 'How we engage', href: '#engage' },
]

export const hero = {
  eyebrow: 'For retail insurance agencies',
  titleLead: 'An AI workforce',
  titleAccent: 'for insurance.',
  body: 'Governed AI, deployed into your operation — built by insurance people, proven on our own book first.',
  meta: ['Not a pilot', 'Production deployment', '60–90 day rollout'],
}

export const ticker = [
  'Commercial P&C',
  'Retail insurance agencies',
  'Production deployment — not a pilot',
  'Integrates with your existing AMS',
  '60–90 day deployment',
]

export const problem = {
  eyebrow: 'The problem',
  title: 'The work is outpacing the workforce.',
  body: 'Clients feel the queue. Every deal waits its turn in a stack of manual work — and the hours your team once spent with clients now go to chasing paperwork.',
  cards: [
    {
      figure: '400k',
      title: "Your best AM doesn't scale",
      body: "The person holding it all together is your costliest employee, and there isn't a second one of them on the market. Insurance professionals are retiring with no bench behind them.",
    },
    {
      figure: '4%',
      title: "Hiring isn't a growth plan",
      body: 'Only 4% of millennials want in. Funded seats sit open for months, and the grind burns people out faster than you can backfill them.',
    },
    {
      figure: '100%',
      title: 'The playbook lives in heads',
      body: 'Appetite, carrier quirks, and relationships are tribal knowledge. Every departure is an erasure; every hire is a slow rebuild.',
    },
  ],
}

export const product = {
  eyebrow: 'What we sell',
  titleLines: ["We don't sell software.", 'We deploy a workforce.'],
  body: 'You keep the judgment and the relationships. We take the grind.',
  not: {
    title: "What we're not",
    items: [
      'A point solution bolted onto one workflow',
      'Seats that go quiet after week two',
      'A pilot that never leaves the sandbox',
      'A model wrapper with your logo on it',
    ],
  },
  get: {
    title: 'What you get',
    items: [
      'AI teammates that work your book the way you do',
      'Your appetite, rules, and playbooks — made executable',
      'Engineers on your floor who own adoption',
      'Pricing that tracks output, not seats',
    ],
  },
}

export const alpine = {
  eyebrow: 'Alpine substrate',
  title: 'The substrate under every deployment.',
  body: "This is why bespoke doesn't mean black box.",
  cards: [
    {
      index: '01',
      kicker: 'Context',
      title: 'Auditable',
      body: 'Every agent action is logged with its authority and its reasoning — a trail your regulators and E&O carrier can read.',
      meta: 'Emails · submissions · quotes · policies · endorsements · loss runs',
    },
    {
      index: '02',
      kicker: 'Capabilities',
      title: 'Governable',
      body: 'Approvals, permissions, and mandates are built into the substrate, not stapled on after.',
      meta: 'Skills · tools · integrations · obligations',
    },
    {
      index: '03',
      kicker: 'Workers',
      title: 'Secure',
      body: 'Runs inside your compliance boundary and your security requirements — not ours.',
      meta: 'Roles · functions · carrier-navigation mandates',
    },
  ],
}

export const proof = {
  eyebrow: 'Proof',
  title: "QuoteWell Inbox — we're customer zero.",
  body: "We didn't build this for a demo. We built it because we're a brokerage, and we needed it.",
  cards: [
    {
      index: '01',
      kicker: 'Inbox-native',
      title: 'Emails in, with context',
      body: 'The AI meets brokers in email — the place insurance actually happens. Threads, docs, and quotes structured as they land.',
    },
    {
      index: '02',
      kicker: 'Playbooks authored',
      title: 'Playbooks beside the work',
      body: 'Brokers author and tune automations next to the threads they run on — the plays the agent workforce runs.',
    },
    {
      index: '03',
      kicker: 'Triggers fire',
      title: 'Agents that act unprompted',
      body: 'Submissions, follow-ups, and status checks fire on triggers, not requests. No one has to ask.',
    },
    {
      index: '04',
      kicker: 'Data wired in',
      title: 'Clean submission & agency data',
      body: 'Carrier appointments structured and indexed; AMS and agency data connected — nothing re-keyed.',
    },
  ],
}

export const evidence = {
  eyebrow: 'Evidence',
  title: 'Numbers from our own book.',
  body: 'Production data from working brokers — not a pilot, not a survey.',
  stats: [
    { figure: '+41%', label: 'More unique clients handled per broker after adopting playbooks' },
    { figure: '+30%', label: 'The median experience — the bottom ~70% of playbook users' },
    { figure: '+71%', label: 'What power users pull out of the same tools' },
    { figure: '100%', label: 'Of our brokers work through the core features daily' },
  ],
  footnote:
    '13 QuoteWell brokers with sufficient pre/post history. Lift compares average monthly unique clients in the 3 months before first playbook use to months 3–6 after, excluding a 2-month onboarding ramp. Directional and observational, not a controlled study.',
}

export const engage = {
  eyebrow: 'How we engage',
  title: 'You see it run before you sign.',
  body: 'Nothing on faith: the demo you judge us on is built from your book.',
  steps: [
    {
      index: '01',
      title: 'Discover',
      body: 'We sit with your team, map the panel and systems, and find where the book actually moves. MNDA first.',
    },
    {
      index: '02',
      title: 'Build',
      body: 'Your rules and playbooks become a working proof of concept on Alpine — on your workflows, not a demo dataset.',
    },
    {
      index: '03',
      title: 'Prove',
      body: "You watch your own application run, usage estimate attached. Your run-rate is known before it's owed.",
    },
    {
      index: '04',
      title: 'Deploy',
      body: 'Onsite training, live iteration, adoption owned by our engineers. 60–90 days end to end.',
    },
  ],
}

export const cta = {
  eyebrow: 'Next step',
  title: 'Ready to see how Third Plane fits into your agency?',
  body: 'Meet with the team, walk through your current workflows, and review where the opportunity is. No generic sales demo — and no pressure to move forward.',
  meta: ['no sign-up form', 'no sales funnel'],
}
