import { resourcesPage } from "../data/content";
import { formatPostDate, type Post, type PostType } from "../data/posts";
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
export function PostMeta({ post }: { post: Pick<Post, "type" | "date" | "draft"> }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-sm text-ink-muted">
      <span className={cn(pill, typeStyle[post.type])}>{resourcesPage.types[post.type]}</span>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      {post.draft ? (
        <span className={cn(pill, "bg-transparent text-ink-muted inset-ring inset-ring-deep/10")}>
          Draft
        </span>
      ) : null}
    </div>
  );
}
