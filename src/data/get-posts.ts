import { getCollection } from "astro:content";
import type { Post } from "./posts";

// Newest first. Drafts come back in the dev server only, so a post can be
// reviewed at its real URL before it is published.
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection("posts", ({ data }) => !data.draft || import.meta.env.DEV);
  return entries.map((entry) => entry.data).sort((a, b) => (a.date < b.date ? 1 : -1));
}
