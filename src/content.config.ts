import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One JSON file per post in src/content/posts, edited through the "Posts" form
// in .pages.yml. Keep the two in step: the form is what editors see, this is
// what the build accepts, and a post that does not fit fails the build with the
// file and field named.
//
// Pages CMS drops empty values when it saves, so `body` and `draft` may be
// missing from a file and take their defaults here.
//
// The loader takes each entry's id from the file's `slug`, which is the post's
// address: /resources/<slug>.

const block = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string() }),
  z.object({ type: z.literal("paragraph"), text: z.string() }),
  z.object({ type: z.literal("bullets"), items: z.array(z.string()) }),
  z.object({ type: z.literal("numbered"), items: z.array(z.string()) }),
  z.object({ type: z.literal("quote"), text: z.string() }),
]);

const posts = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/posts" }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    type: z.enum(["technical", "perspective", "press"]),
    title: z.string(),
    standfirst: z.string(),
    // YYYY-MM-DD, or YYYY-MM to show the month only.
    date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/),
    author: z.string(),
    draft: z.boolean().default(false),
    body: z.array(block).default([]),
  }),
});

export const collections = { posts };
