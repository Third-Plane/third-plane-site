import { resourcesPage } from "../data/content";
import { formatPostDate, type Post } from "../data/posts";

// The type pill, date and draft flag shown on post cards and post headers.
export function PostMeta({ post }: { post: Pick<Post, "type" | "date" | "draft"> }) {
  return (
    <div className="post-card__meta">
      <span className={`type-pill type-pill--${post.type}`}>{resourcesPage.types[post.type]}</span>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      {post.draft ? <span className="type-pill type-pill--draft">Draft</span> : null}
    </div>
  );
}
