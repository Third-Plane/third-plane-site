import { companyPage } from "../data/content";
import type { Block, Post as PostData } from "../data/posts";
import { Cta } from "../components/Cta";
import { PostMeta } from "../components/PostMeta";
import { AppLink, Arrow } from "../components/Ui";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "bullets":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "paragraph":
      return <p>{block.text}</p>;
    default:
      return null;
  }
}

export function Post({ post }: { post: PostData }) {
  return (
    <>
      <article className="post">
        <header className="hero hero--page hero--editorial post__hero">
          <div className="post__head wrap">
            <AppLink className="post__back" href="/resources">
              <Arrow className="post__back-arrow" />
              Resources
            </AppLink>
            <PostMeta post={post} />
            <h1 className="display-1 post__title">{post.title}</h1>
            <p className="lead post__standfirst">{post.standfirst}</p>
            <p className="post__byline">{post.author}</p>
          </div>
        </header>
        <div className="section section--white">
          <div className="post__body wrap">
            {post.body.map((block, i) => (
              <BlockView block={block} key={i} />
            ))}
          </div>
        </div>
      </article>
      <Cta {...companyPage.cta} />
    </>
  );
}
