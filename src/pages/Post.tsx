import { Navigate, useParams } from "react-router-dom";
import { resourcesPage } from "../data/content";
import { findPost, type Block } from "../data/posts";
import { Cta } from "../components/Cta";
import { ParticleField } from "../components/ParticleField";
import { AppLink, Arrow } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function BlockView({ block }: { block: Block }) {
  if ("h" in block) return <h2>{block.h}</h2>;
  if ("ul" in block)
    return (
      <ul>
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if ("quote" in block) return <blockquote>{block.quote}</blockquote>;
  return <p>{block.p}</p>;
}

export function Post() {
  const { slug = "" } = useParams();
  const post = findPost(slug);
  useTitle(post?.title);

  if (!post || (post.draft && !import.meta.env.DEV)) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <>
      <article className="post">
        <header className="hero hero--page post__hero">
          <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
          <div className="container post__head">
            <AppLink className="post__back" href="/resources">
              <Arrow className="post__back-arrow" />
              Resources
            </AppLink>
            <div className="post-card__meta">
              <span className={`type-pill type-pill--${post.type}`}>{resourcesPage.types[post.type]}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.draft ? <span className="type-pill type-pill--draft">Draft</span> : null}
            </div>
            <h1 className="display-1 post__title">{post.title}</h1>
            <p className="lead post__standfirst">{post.standfirst}</p>
            <p className="post__byline">{post.author}</p>
          </div>
        </header>
        <div className="section section--white">
          <div className="container post__body">
            {post.body.map((block, i) => (
              <BlockView block={block} key={i} />
            ))}
          </div>
        </div>
      </article>
      <Cta />
    </>
  );
}
