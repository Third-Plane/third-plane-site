// Resources: technical notes, perspectives and press. The posts are the
// `posts` collection (src/content.config.ts); this module holds the types the
// components use and the date format. The build emits a page for every post
// that is not a draft.

import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">["data"];
export type PostType = Post["type"];
export type Block = Post["body"][number];

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
