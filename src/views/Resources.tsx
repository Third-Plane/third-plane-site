import { companyPage, resourcesPage as page } from "../data/content";
import type { Post } from "../data/posts";
import { Cta } from "../components/Cta";
import { PageHero } from "../components/PageHero";
import { PostMeta } from "../components/PostMeta";
import { Section } from "../components/Section";
import { AppLink, Arrow } from "../components/Ui";
import { reveal } from "../lib/style";

// The hero is its own export: pages/resources.astro puts it in Base's `hero` slot,
// outside <main>.
export function ResourcesHero() {
  return <PageHero family="editorial" title={page.title} lead={page.lead} />;
}

export function Resources({ posts }: { posts: Post[] }) {
  return (
    <>
      <Section tone="white" id="posts">
        {posts.length ? (
          <ul className="grid grid-cols-3 gap-(--gap) has-[>:only-child]:grid-cols-[minmax(0,28rem)] max-lg:grid-cols-2 max-sm:grid-cols-1">
            {posts.map((post, i) => (
              <li key={post.slug} {...reveal(i % 3)}>
                <AppLink
                  className="grid h-full content-start gap-3.5 rounded-2xl bg-cream p-(--pad) text-ink transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  href={`/resources/${post.slug}`}
                >
                  <PostMeta post={post} />
                  <h2 className="font-heading text-xl leading-tight font-medium tracking-tight text-balance">
                    {post.title}
                  </h2>
                  <p className="text-base text-ink-body">{post.standfirst}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-medium text-purple">
                    Read
                    <Arrow className="size-4 transition-transform duration-200" />
                  </span>
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-base text-ink">Nothing published yet.</p>
        )}
      </Section>

      <Cta {...companyPage.cta} />
    </>
  );
}
