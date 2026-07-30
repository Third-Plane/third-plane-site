// Single source of truth for all page copy.
// Edit text here; components handle layout only.

const email = 'sales@thirdplane.com'

export const site = {
  name: 'Third Plane',
  wordmark: 'Third Plane',
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
  eyebrow: 'Automated Placement for Retail Insurance Agencies',
  titleLead: 'An AI workforce',
  titleAccent: 'right in your inbox.',
  body: 'Governed AI, deployed into your operation. Incubated and built by insurance professionals.',
  meta: ['Not a pilot', 'Production deployment', '60–90 day rollout'],
}

export const ticker = [
  'Commercial P&C',
  'Retail insurance agencies',
  'Production deployment, not a pilot',
  'Integrates with your existing AMS',
  '60–90 day deployment',
]

export const problem = {
  eyebrow: 'The problem',
  title: 'The work is outpacing the workforce.',
  body: 'Renewals that were remarketed every three years to three markets now go out many more, every year.',
  cards: [
    {
      figure: '01',
      title: 'Slow quotes and service',
      body: 'Every deal passes through placement. Clients wait while the queue clears.',
    },
    {
      figure: '02',
      title: 'Growth means headcount',
      body: 'Scaling means more account managers, a cost center that drags on EBITDA. The work burns people out, so you keep rehiring.',
    },
    {
      figure: '03',
      title: 'No standard procedures',
      body: "Rules, appetite, and relationships live in people's heads. New hires take months to ramp.",
    },
  ],
}

export const product = {
  eyebrow: 'What we sell',
  title: "We don't sell software. We deploy a workforce.",
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
      'Your appetite, rules, and playbooks made executable',
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
      body: 'Every agent action is logged with its authority and its reasoning, a trail your regulators and E&O carrier can read.',
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
      body: 'Runs inside your compliance boundary and your security requirements, not ours.',
      meta: 'Roles · functions · carrier-navigation mandates',
    },
  ],
}

export const proof = {
  eyebrow: 'Proof',
  title: "QuoteWell Inbox. We're our own first customer.",
  body: 'We built an interface and experience every broker already knows how to use: email.',
  cards: [
    {
      index: '01',
      kicker: 'Inbox-native',
      title: 'Emails in, with context',
      body: 'The AI meets brokers in email, the place insurance actually happens. Threads, docs, and quotes structured as they land.',
    },
    {
      index: '02',
      kicker: 'Playbooks authored',
      title: 'Playbooks beside the work',
      body: 'Brokers author and tune automations next to the threads they run on. These are the plays the agent workforce runs.',
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
      body: 'Carrier appointments structured and indexed; AMS and agency data connected. Nothing re-keyed.',
    },
  ],
}

export const evidence = {
  eyebrow: 'Evidence',
  title: 'Real Results, Proven in Production.',
  body: 'Production data from working brokers. Not a pilot, not a survey.',
  // Three groups, matching the deck's three slides' worth of figures rather than
  // one group per figure: the middle group is a pair that shares a single
  // caption, because the deck draws it as two bars under one sentence and its
  // second sentence ("that lift") only resolves against its first. Figures,
  // labels and bodies are the deck's wording verbatim, including the deck's own
  // inconsistencies: the plus sign on the two paired figures but not on 41% or
  // 100%, and the missing full stop on the first body.
  stats: [
    {
      figures: [{ figure: '41%', label: 'Lift from Playbooks' }],
      body: 'Across all users, 41% more unique clients handled after adopting playbooks',
    },
    {
      figures: [
        { figure: '+30%', label: 'Typical Users' },
        { figure: '+71%', label: 'Power Users' },
      ],
      body: 'The bottom ~70% of playbook users handled 30% more clients per month. The top 30% more than doubled that lift.',
    },
    {
      figures: [{ figure: '100%', label: 'User Adoption' }],
      body: 'Every customer uses the core features. Power users go further.',
    },
  ],
  footnote:
    'The sample is 13 QuoteWell brokers with sufficient pre/post history; departed brokers and recent hires without a baseline are excluded. Lift compares average monthly unique clients in the 3 months before first playbook use to months 3–6 after, excluding a 2-month onboarding ramp. Directional and observational, not a controlled study.',
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
      body: 'Your rules and playbooks become a working proof of concept on Alpine. Built on your workflows, not a demo dataset.',
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
  body: 'Meet with the team, walk through your current workflows, and review where the opportunity is. No generic sales demo. No pressure to move forward.',
  meta: [],
}
