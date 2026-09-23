// Resources: technical notes, perspectives and press. One entry per post.
// `body` is a list of blocks so posts render consistently without a markdown
// dependency. Add a post by appending here; the build emits its page.

import { aiWorkforceDefinition } from "./content.js";

export type PostType = "technical" | "perspective" | "press";

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { quote: string };

export type Post = {
  slug: string;
  type: PostType;
  title: string;
  standfirst: string;
  date: string; // ISO date
  author: string;
  draft?: boolean;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "knights-dilemma",
    type: "perspective",
    title: "The Knight’s Dilemma: What Gunpowder Teaches Us About AI",
    standfirst:
      "A New Operating Model for Technical Executives the Age of AI Labor",
    date: "2026-06",
    author: "Third Plane",
    body: [
      { h: "A Note from the Author" },
      {
        p: "This is not a paper about a “brand-new idea.” The themes here — AI as labor, governance as moat, untapped latent data, agentic systems — are already in the water. What this paper does is draw a hard line: if organizations keep treating AI as a tool, they will lose to the firms that treat it as labor and design their operating model accordingly. This is an opinionated map of what that operating model looks like in the real world, especially in regulated, high-stakes environments.",
      },
      { h: "The Knight and the Musket" },
      {
        p: "In the Philosophy of History, Hegel made an observation that turned out to be one of the most important in military economics. Gunpowder did not just change how wars were fought; it changed what kind of advantage mattered. The armored knight, trained from childhood and expensive to equip, was made irrelevant in a generation by a peasant with a musket. Individual martial virtue, the decisive variable for centuries, was commoditized overnight. White-collar work is living through the same shift right now, where the reason why professional services have sold for a century, individual cognitive execution, is being commoditized in real time.",
      },
      {
        p: "Here is the part everyone skips. The knight was not replaced by a better knight, and he was not replaced by gunpowder alone. He was replaced by armies that organized around gunpowder: logistics, command structure, training, coordination at scale. Gunpowder was necessary, but it was nowhere near sufficient. The aristocracies that won were the ones that rebuilt their whole operating model around the new input, the gunpowder. The ones that lost bought the most exquisite armor they could afford and met the musket with it.",
      },
      {
        p: "White-collar work is experiencing the same shift in real time. AI is not making knowledge workers incrementally more productive. Instead, it’s commoditizing the primary competitive variable, individual cognitive execution, that drove professional services for a century. Organizations face a similar choice: invest in the thing that will shape the future, or the thing that shaped the past and is now being rapidly commoditized.",
      },
      { h: "Spending on gunpowder is not the same as winning" },
      {
        p: "Buying gunpowder is buying AI: signing the enterprise contract, spinning up the API keys, giving your team a token budget, watching the usage dashboard climb, and concluding that because the spend is real and the activity is genuine, the advantage must be too. It’s an easy mistake, especially since the bill is certainly real. But token spend is an input metric, not an outcome metric.",
      },
      { h: "The Reframe: AI as Labor, Not Tools" },
      {
        p: "Most organizations are making a categorical error. They are treating AI as a better tool that generates a smarter search, a faster summary, and a more capable autocomplete. The danger is that framing produces incremental gains and does nothing to change the operating model.",
      },
      {
        p: "Conversely, the organizations that will own the next decade are treating AI as labor. That distinction is critical because it changes every question you ask about what and how to build. If AI is a tool, you optimize the tool and invest in the interface, the integration, the feature set. When AI is labor, you think like an employer and ask fundamentally different questions:",
      },
      {
        ol: [
          "What does this worker need to know?",
          "How do they learn it?",
          "What are they authorized to do and under what authority?",
          "How do I know what they did and why they did it?",
          "What happens when they make a mistake?",
        ],
      },
      {
        p: "These questions aren’t answerable in a tools framework, but they form the operating model in a labor framework. The organizations that are asking them seriously are building something durable. Everyone else is buying better armor.",
      },
      { h: "Axis One: The Scarce Input Has Changed" },
      {
        p: "There is a principle that cuts through most of the confusion about AI strategy: the data that matters is always the input necessary to inform reasoning. This inverts how organizations should think about data.",
      },
      {
        p: "In the era when humans did all the reasoning, outcome data was the prize. Clean historical signals that detailed what happened, when it happened, who made the decision, and which account was involved was what unlocked human judgment at scale. You could put good data in front of a good underwriter and get a good decision. So organizations spent decades building systems to capture outcomes: ERPs, AMS platforms, CRMs, and data warehouses. They optimized for transaction fidelity. That was both rational and economical at the time, since outcomes were the binding constraint on the most valuable work.",
      },
      {
        p: "Because of that, understanding outcomes is largely a solved problem. Inputs are now the scarce and constrained element.",
      },
      {
        p: "When AI becomes the reasoning layer, pattern matching is essentially free. A frontier model trained on a vast corpora of human text already has a sophisticated model of how decisions generally get made. What it lacks, and what causes it to fail, is the context and logic that led to specific decisions in specific organizations. It doesn’t fail because it lacks transaction history. It fails because it doesn’t know why this situation was handled differently than the pattern predicted. It doesn’t know the informal logic, the intuition, the exception, and the institutional reasoning that a seasoned operator would have applied without thinking.",
      },
      {
        p: "Source systems capture what happened. Communication channels capture why. In an AI-labor world, only one of those feeds the reasoning layer.",
      },
      {
        p: "The organizations that are still investing primarily in source system hygiene are solving for the past. They are building infrastructure for a world where humans are still the sole sources of reasoning. As a result, data that will actually unlock an organization’s ability to create and enable AI workers is lost in inboxes and treated as noise.",
      },
      { h: "Latent Data Is the Signal" },
      {
        p: "The real logic lives in that latent data: emails, call notes, comments, approval chains, exceptions, forwarded threads, and the back-and-forth that captures how decisions actually get made. It’s the context behind the record, not just the record itself. Every time a good operator wrote, ‘here’s what I’m thinking on this one’, or ‘we handled something similar last year and here’s why that’s different’ — that’s the critical input that matters. In underwriting, the difference between a standard risk and an exception isn’t in the structured fields. It’s in the email thread where the underwriter explains why this one is different. That reasoning is what you actually need to replicate.",
      },
      {
        p: "Historically, this data has been too messy and too expensive to operationalize. It’s highly distributed, inconsistently captured, and buried in systems that don’t talk to each other. Those constraints are now materially reduced.",
      },
      {
        p: "LLMs make this tractable in ways that simply weren’t possible before. Unstructured reasoning can now be extracted, structured, attributed, and made persistent. The provenance can be captured so you can audit and reconstruct the entire decision path. This doesn’t mean abandoning source systems; it means recognizing their limits and stopping the mistake of waiting for perfect data hygiene before extracting value from the data that actually matters.",
      },
      {
        p: "If your AI is only operating on structured data, it’s operating on an incomplete view of the business. It will recommend the “correct” next step while missing the exception that actually matters. It will generate plausible output without understanding why the process changed. Adoption gets harder because each mistake erodes employee trust in the system.",
      },
      { h: "Axis Two: The Scarce Output Has Changed" },
      {
        p: "There is a second axis to this shift that is equally important and almost entirely unaddressed.",
      },
      {
        p: "AI makes execution abundant. Actions such as follow-through, persistence, volume, and the sheer capacity to track every open item and push every stalled deal cease to be the binding constraint on organizational performance. For the first time, firms can extend disciplined execution capacity far beyond what any human team can personally remember, track, and deliver.",
      },
      {
        p: "Abundance in execution creates scarcity elsewhere, but when AI is doing the work, the critical question is not whether the work got done, but rather who authorized it, under what scope, what exactly happened, and can you defend it when someone asks?",
      },
      {
        p: "What becomes scarce is not activity; scarcity instead shifts to authorized, answerable action in the capacity to commit, coordinate, be held to it, and defend what was done when someone asks.",
      },
      {
        p: "Any company, at its core, is a system for making and keeping commitments. When humans kept commitments, accountability was implicit because there was a person who made the decision, who could be asked about it, and who could defend or explain it. When AI keeps commitments at scale, that implicit accountability disappears unless you architect for it deliberately.",
      },
      {
        p: "This isn’t a theoretical concern. It is the specific question that every compliance, legal, and risk function in every regulated industry will ask when you try to deploy AI in production:",
      },
      {
        ol: [
          "Who is the AI acting for?",
          "What is it authorized to do?",
          "Who bounded that authority?",
          "What happens when it is wrong?",
          "What is the recourse, and to whom?",
          "How do you review, reconstruct, attribute, and defend its actions?",
        ],
      },
      {
        p: "Without good answers, AI creates risk and anxiety instead of delivering leverage. It generates output, but not trust. It creates activity, but not reliable execution. This is a significant factor driving stalled AI adoption in regulated industries. The issue is not AI capability, but rather AI governability.",
      },
      { h: "The Governance Vacuum" },
      {
        p: "Most organizations can see that AI improves execution as they experiment with it in pilots, in point tools, and in workflow automations. What they are not doing is building the governance architecture that makes that sustained enterprise deployment possible at scale. They are focusing on activity and not on accountability. In the short term, this looks like progress. In the medium term, it is a significant and compounding liability. Here’s why.",
      },
      {
        p: "Governability is the actual moat. You cannot retrofit accountability infrastructure onto a system that wasn’t built for it. The audit trail, the authority model, and the chain of evidence that lets you reconstruct who authorized what under which obligation all have to be core structural elements of the architecture built from the very beginning.",
      },
      {
        p: "A governance-first posture is not compliance theater. It is the foundation of trust that makes AI action commercially real.",
      },
      { h: "The App Layer Won’t Hold a Moat" },
      {
        p: "There is a mistake that is being made at enormous scale right now, and it is the same mistake made by the aristocracy investing in better armor after gunpowder.",
      },
      {
        p: "Organizations are still competing at the application layer: better interfaces, more integrations, faster features, smoother UX. They are treating the app as the product and the AI as the differentiator inside it. This was a reasonable bet before, but today, it is no longer. Building great applications still requires real skill, but the cost of building “good enough” applications is collapsing fast.",
      },
      {
        p: "What isn’t getting cheaper is the foundation underneath the app. The data layer that captures institutional reasoning, the semantic layer that knows what things mean in context, the governance scaffolding that makes AI action accountable, and the ability for systems to follow decisions across steps, dependencies, and approvals while applying the right context at each point are crucial to designing a system that runs itself.",
      },
      {
        p: "Without that foundation, AI remains assistive, not operational. You can have the most capable model in the world running inside the most beautiful interface, but if it has no institutional memory, no reasoning substrate, and no accountability architecture, it cannot be trusted with consequential work. It can assist, but will never be allowed to act.",
      },
      { h: "What This Looks Like in Practice" },
      {
        p: "The prescription is not abstract. It is a set of principles learned by the organizations that have lived it.",
      },
      { h: "1. Build Swarms, Not Monoliths" },
      {
        p: "The temptation when building agentic systems is to write one impressive multi-step workflow that handles everything end-to-end. It fails constantly through context window exhaustion, compounding errors, and recursive loops that are impossible to debug. What does work is a swarm of small, specialized agents with rigidly defined inputs and outputs and clearly mapped dependencies. Each agent does one thing. Each node is independently testable. When something breaks, you know exactly where.",
      },
      { h: "2. Treat Communication Channels as Source Systems" },
      {
        p: "Stop treating your communication layer as noise. Email and messaging apps are where organizational reasoning lives. It’s where the decisions, exceptions, and institutional logic that make AI labor useful rather than merely active exist. Structure it, persist it, and capture provenance so the decision path can be audited later.",
      },
      { h: "3. Make Proof Permanent" },
      {
        p: "Every consequential action your AI worker takes should write evidence, provenance, and attribution into an append-only record. This isn’t for compliance theater, but for operational reality. ‘Who authorized this, under what obligation, against what conditions, with what evidence’ should have a one-query answer at any point in the future. This is not overhead; it is the product.",
      },
      { h: "4. Find the Early Adopters. Make Them Look Like Rockstars" },
      {
        p: "The rollout strategy is at least half the battle, and it is the thing technical organizations are most likely to under-invest in. The framing that works is not ‘AI will do your job.’ It is: your job is evolving from manually executing to architecting, orchestrating, and governing workflows. Find the people who want to level up, give them something that makes a real difference, and let them become the internal case study.",
      },
      { h: "5. Pay the Context Tax Early" },
      {
        p: "Every object in your system should carry meaning that involves a clear description and enough context to be understood without hardcoding. It takes almost no time when you create it, but most teams skip it. Do it, and you get leverage. Context becomes retrievable instead of injected, and systems become navigable by agents. You enable reuse, composition, and adaptation without constant rewrites. In practical terms, you’re buying option value.",
      },
      { h: "The Prescription" },
      {
        p: "The shift that’s happening is not incremental. It is structural and paradigm-defining. The thing that was scarce is now becoming cheap, while something different is becoming scarce. The organizations that see this clearly and build accordingly will shape their industries; the ones that don’t will optimize the wrong layer until it is too late to recover.",
      },
      {
        p: "Here are a few questions to ask to help define where your organization is:",
      },
      {
        ol: [
          "Where does our reasoning actually live? If the answer is ‘in our source systems,’ it isn’t. Find where it actually is.",
          "Where does our accountability actually live? If AI is acting on behalf of your organization and you cannot answer ‘who authorized that and why,’ you are not ready for AI as labor.",
          "What are we competing on at the application layer? If the answer is features and interfaces, you are building an advantage that is evaporating.",
          "Is our governance architecture structural or aspirational? If it is something you plan to add later, you are building on sand.",
        ],
      },
      {
        p: "The window to get this right is not permanently open. AI capability is ready, the governance gap is wide, and the data advantage is available to whoever claims it first. The organizations already operating at this level have a meaningful head start; not because they planned it, but because they were forced into rigor by the specific demands of what they were building.",
      },
      {
        p: "That is the lesson worth carrying forward. The reality is that the regulated industries, the high-stakes environments, and the organizations that couldn’t afford to treat AI casually are the ones that stumbled into the architecture that everyone else is going to need.",
      },
      {
        p: "If you’re still thinking about AI as tools, you are already behind. And it’s not on features, but on the operating model your competitors are quietly building that will take their businesses to the next level of revenue with fewer resources. They’re building the army; are you simply buying the gunpowder?",
      },
    ],
  },
  {
    slug: "where-ai-sits",
    type: "perspective",
    title: "Where AI sits in an insurance business",
    standfirst:
      "Most AI is being deployed as another tool for employees. The bigger opportunity is to change where AI sits in the organization, and to give it work.",
    date: "2026-09-11",
    author: "Third Plane",
    draft: true,
    body: [
      {
        p: "Insurance businesses have spent years trying to create more capacity by adding people and adding technology. Each new system promises efficiency, and each one introduces another workflow employees have to learn, manage and fit into the way they already work.",
      },
      {
        p: "AI creates a different possibility. But most AI products are still deployed on the old model: give employees another tool and ask them to be more productive with it. The producer, account manager or service professional remains responsible for operating the technology, supervising what it does and fitting it into their day.",
      },
      { h: "Change where it sits" },
      {
        p: "Instead of putting AI underneath every employee as another tool, an insurance business can assign defined work to AI as part of how the organization itself operates. AI can take responsibility for work, operate across existing systems and channels, and return completed outcomes to the people who need them.",
      },
      {
        p: aiWorkforceDefinition,
      },
      { h: "Placement first" },
      {
        p: "We are applying this model first to placement. The Placement Desk gives a brokerage a dedicated placement function staffed by AI workers. Work is routed to the desk from producers, inboxes or existing systems. From there the desk assesses appetite, identifies markets, communicates with carriers, works through portals and APIs, pursues quotes and returns the results for human review.",
      },
      {
        p: "For the producer, the experience is closer to sending work to a placement function and getting the result back than to managing another piece of software. The work moves to the workforce. The outcome moves back to the producer.",
      },
      { h: "What changes" },
      {
        ul: [
          "Instead of asking every employee to adopt AI, the organization decides what work AI should own.",
          "Instead of measuring whether employees are using another tool, leaders measure whether the workforce is delivering the work it was assigned.",
          "Instead of layering more technology onto complicated workflows, the business creates new capacity around the systems and processes it already has.",
        ],
      },
      {
        quote:
          "The companies that gain the most from AI will not simply be insurance businesses that use AI. They will be businesses that organize work around what people and AI are each best equipped to do.",
      },
      {
        p: "Placement is the first expression of a larger idea. Over time the same model extends into other areas of insurance operations, with specialized desks responsible for defined categories of work. Third Plane exists to help insurance businesses make that shift.",
      },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export function formatPostDate(iso: string) {
  const monthOnly = /^\d{4}-\d{2}$/.test(iso);
  const value = monthOnly ? `${iso}-01` : iso;
  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-US",
    monthOnly
      ? { year: "numeric", month: "long" }
      : { year: "numeric", month: "long", day: "numeric" },
  );
}
