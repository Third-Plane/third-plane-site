// Resources: technical notes, perspectives and press. One JSON file per post
// in src/content/posts, edited through Pages CMS. `body` is a list of blocks so
// posts render consistently without a markdown dependency. The build emits a
// page for every post that is not a draft.

export type PostType = "technical" | "perspective" | "press";

export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  type: PostType;
  title: string;
  standfirst: string;
  date: string; // ISO date, or YYYY-MM to show the month only
  author: string;
  draft?: boolean;
  body: Block[];
};

const files = import.meta.glob<Post>("../content/posts/*.json", {
  eager: true,
  import: "default",
});

export const posts: Post[] = Object.values(files).map((post) => ({
  ...post,
  body: post.body ?? [],
}));

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

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
