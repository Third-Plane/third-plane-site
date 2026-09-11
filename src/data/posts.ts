// Resources: technical notes, perspectives and press. One entry per post.
// `body` is a list of blocks so posts render consistently without a markdown
// dependency. Add a post by appending here; the build emits its page.

export type PostType = "technical" | "perspective" | "press";

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] }
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
        p: "That is what we mean by an AI workforce for insurance. It is deployed as operating capacity within the business. It has defined responsibilities, works within established processes and systems, and is managed against outcomes, much like another team or function.",
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
