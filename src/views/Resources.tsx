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
          <ul className="grid grid-cols-3 gap-(--gap) has-[>:only-child]:grid-cols-[minmax(0,28rem)] max-[1020px]:grid-cols-2 max-[640px]:grid-cols-1">
            {posts.map((post, i) => (
              <li key={post.slug} {...reveal(i % 3)}>
                <AppLink
                  className="grid h-full content-start gap-[0.9rem] rounded-card bg-cream p-(--pad) text-ink transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card"
                  href={`/resources/${post.slug}`}
                >
                  <PostMeta post={post} />
                  <h2 className="font-heading text-title leading-[1.15] font-medium tracking-head text-balance">
                    {post.title}
                  </h2>
                  <p className="text-copy text-ink-body">{post.standfirst}</p>
                  <span className="mt-auto inline-flex items-center gap-[0.4rem] font-medium text-purple">
                    Read
                    <Arrow className="size-4 transition-[transform] duration-200" />
                  </span>
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-copy text-ink">Nothing published yet.</p>
        )}
      </Section>

      <Cta {...companyPage.cta} />
    </>
  );
}
