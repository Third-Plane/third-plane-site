import { resourcesPage, site } from "../data/content";
import { formatPostDate, type Post, type PostType } from "../data/posts";
import { AppLink } from "./Ui";
import { cn } from "../lib/style";

const pill = "rounded-full px-2.5 py-1 text-sm font-medium tracking-wider uppercase";

// Each variant sets its own background and text colour, so none depends on
// which of two competing utilities the stylesheet happens to emit last.
const typeStyle: Record<PostType, string> = {
  technical: "bg-blue text-deep",
  perspective: "bg-pink text-deep",
  press: "bg-deep text-cream",
};

// The type pill, date and draft flag shown on post cards and post headers.
// With `author`, a byline goes before the date (the post's own header); it
// matches the author in the post's structured data, and the founder's name
// links to their LinkedIn.
export function PostMeta({
  post,
  author,
}: {
  post: Pick<Post, "type" | "date" | "draft">;
  author?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-sm text-subtle-foreground">
      <span className={cn(pill, typeStyle[post.type])}>{resourcesPage.types[post.type]}</span>
      {author ? (
        <span>
          By{" "}
          {author === site.founder.name ? (
            <AppLink
              className="font-medium text-foreground transition-colors duration-200 hover:text-accent"
              href={site.founder.linkedin}
            >
              {author}
            </AppLink>
          ) : (
            <span className="font-medium text-foreground">{author}</span>
          )}
        </span>
      ) : null}
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      {post.draft ? (
        <span className={cn(pill, "text-subtle-foreground inset-ring inset-ring-border")}>
          Draft
        </span>
      ) : null}
    </div>
  );
}
