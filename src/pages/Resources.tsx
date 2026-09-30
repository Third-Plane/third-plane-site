import { companyPage, resourcesPage as page } from "../data/content";
import { sortedPosts } from "../data/posts";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { PostMeta } from "../components/PostMeta";
import { Section } from "../components/Section";
import { AppLink, Arrow } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";
import { delayStyle } from "../lib/style";

// Drafts show in the dev server only, so a post can be reviewed at its real
// URL before it is published.
const publishedPosts = sortedPosts.filter((post) => !post.draft || import.meta.env.DEV);

export function Resources() {
  useTitle("Resources", page.lead);
  return (
    <>
      <PageHero family="editorial" title={page.title} lead={page.lead} />

      <Section tone="white" id="posts">
        {publishedPosts.length ? (
          <ul className="posts">
            {publishedPosts.map((post, i) => (
              <li key={post.slug} data-reveal style={delayStyle(i % 3)}>
                <AppLink className="post-card" href={`/resources/${post.slug}`}>
                  <PostMeta post={post} />
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
      </Section>

      <Cta title={companyPage.cta.title} body={companyPage.cta.body} />
    </>
  );
}
