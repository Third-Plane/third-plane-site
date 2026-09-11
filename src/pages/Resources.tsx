import { resourcesPage as page } from "../data/content";
import { sortedPosts } from "../data/posts";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { AppLink, Arrow } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Drafts show in the dev server only, so a post can be reviewed at its real
// URL before it is published.
const publishedPosts = sortedPosts.filter((post) => !post.draft || import.meta.env.DEV);

export function Resources() {
  useTitle("Resources", page.lead);
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} />

      <section className="section section--white" id="posts">
        <div className="container">
          {publishedPosts.length ? (
            <ul className="posts">
              {publishedPosts.map((post, i) => (
                <li key={post.slug} data-reveal style={delayStyle(i % 3)}>
                  <AppLink className="post-card" href={`/resources/${post.slug}`}>
                    <div className="post-card__meta">
                      <span className={`type-pill type-pill--${post.type}`}>{page.types[post.type]}</span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {post.draft ? <span className="type-pill type-pill--draft">Draft</span> : null}
                    </div>
                    <h2 className="post-card__title">{post.title}</h2>
                    <p className="post-card__standfirst">{post.standfirst}</p>
                    <span className="post-card__more">
                      Read
                      <Arrow className="textlink__arrow" />
                    </span>
                  </AppLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="roles__empty">Nothing published yet.</p>
          )}
        </div>
      </section>

      <Cta />
    </>
  );
}
