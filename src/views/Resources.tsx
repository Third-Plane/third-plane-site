import { companyPage, resourcesPage as page } from "../data/content";
import type { Post } from "../data/posts";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { PostMeta } from "../components/PostMeta";
import { Section } from "../components/Section";
import { AppLink, Arrow } from "../components/Ui";
import { reveal } from "../lib/style";

export function Resources({ posts }: { posts: Post[] }) {
  return (
    <>
      <PageHero family="editorial" title={page.title} lead={page.lead} />

      <Section tone="white" id="posts">
        {posts.length ? (
          <ul className="posts">
            {posts.map((post, i) => (
              <li key={post.slug} {...reveal(i % 3)}>
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

      <Cta {...companyPage.cta} />
    </>
  );
}
