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
  diagram: {
    label: 'Live activity log — sample placement',
    footerLabel: 'Submission to bound',
    duration: '11m 28s',
  },
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
  title: 'The substrate under every deployment.',
  body: "This is why bespoke doesn't mean black box.",
  cards: [
    {
      index: '01',
      kicker: 'Context',
      title: 'Auditable',
      // Same coral log-dot as governed status — top-right on Auditable.
      flag: true,
      body: 'Every agent action is logged with its authority and its reasoning, a trail your regulators and E&O carrier can read.',
      meta: 'Emails · submissions · quotes · policies · endorsements · loss runs',
    },
    {
      index: '02',
      kicker: 'Capabilities',
      title: 'Governable',
      body: 'Approvals, permissions, and mandates are built into the substrate, not stapled on after.',
      meta: 'Skills · tools · integrations — with approvals, obligations, and permissions built in',
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
  inbox: {
    app: 'QuoteWell Inbox',
    from: 'alex@sample-agency.com',
    subject: 'RE: Sample Insured LLC — package renewal',
    playbook: 'Playbook · Mid-market package remarket',
    // Same status language as the hero log: gray pending, coral governed, teal executed.
    // Dots only reinforce the written status word — never color alone.
    rows: [
      { status: 'executed', text: 'Submission drafted from thread + loss runs' },
      { status: 'executed', text: '3 carriers matched to appetite' },
      { status: 'pending', text: 'Awaiting your send · no re-key into AMS' },
    ],
  },
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
  title: 'Real Results, Proven in Production.',
  body: 'Production data from working brokers — not a pilot, not a survey.',
  stats: [
    {
      figure: '+41%',
      body: 'More unique clients handled per broker after adopting playbooks',
    },
    {
      figure: '+30%',
      body: 'More unique clients handled — the median experience; the bottom ~70% of playbook users',
    },
    {
      figure: '+71%',
      body: 'More unique clients handled by power users of the same tools',
    },
    {
      figure: '100%',
      body: 'Of our brokers work through the core features daily',
    },
  ],
  footnote:
    'The sample is 13 QuoteWell brokers with sufficient pre/post history. Lift compares average monthly unique clients in the 3 months before first playbook use to months 3–6 after, excluding a 2-month onboarding ramp. Directional and observational, not a controlled study.',
  strategies: {
    title: 'It pays for itself, two strategies',
    body: 'Whether your team is tech-savvy power users or more typical',
    options: [
      {
        kicker: 'If your team is at capacity',
        title: 'Realize it as savings',
        body: 'Fewer account managers, same book',
        lines: [
          { cohort: 'Typical team', result: '10 AMs → 8 AMs', delta: '23% fewer' },
          { cohort: 'Power users', result: '10 AMs → 6 AMs', delta: '42% fewer' },
        ],
      },
      {
        kicker: 'If you have inbound to spare',
        title: 'Redirect it into growth',
        body: 'More inbound, same team',
        lines: [
          { cohort: 'Typical team', result: '10 AMs → output of 13', delta: '30% more' },
          { cohort: 'Power users', result: '10 AMs → output of 17', delta: '71% more' },
        ],
      },
    ],
    payback:
      "Both strategies pay back fast; a typical team breaks even on baseline engagement costs when the team size is around 7 AMs, or just 3 if they're power users.",
    disclaimer:
      '(Illustrative for a 10-AM team; headcount figures derive from the observed 30% / 71% throughput lift — e.g. 1 − 1/1.30 ≈ 23% fewer AMs. Directional, not a controlled study.)',
  },
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
      body: 'Onsite training, live iteration, adoption owned by our engineers.',
    },
  ],
  timeline: '60–90 days end to end.',
}

export const cta = {
  eyebrow: 'Next step',
  title: 'Ready to see how Third Plane fits into your agency?',
  body: 'Meet with the team, walk through your current workflows, and review where the opportunity is. No generic sales demo. No pressure to move forward.',
  meta: [],
}
