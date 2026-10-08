import { resourcesPage as page } from "../data/content";
import type { Post } from "../data/posts";
import { PostMeta } from "../components/PostMeta";
import { Section, SectionHeader } from "../components/Section";
import { AppLink, Arrow } from "../components/Ui";
import { Header } from "../components/Header";

export function Resources({ posts }: { posts: Post[] }) {
  return (
    <>
      <Header />
      <Section theme="white" id="posts">
        <SectionHeader title={page.title} body={page.lead} />
        {posts.length ? (
          <ul className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <AppLink
                  className="grid h-full content-start gap-3.5 rounded-2xl bg-muted p-7 text-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  href={`/resources/${post.slug}`}
                >
                  <PostMeta post={post} />
                  <h2 className="font-heading text-xl leading-tight font-medium tracking-tight text-balance">
                    {post.title}
                  </h2>
                  <p className="text-base text-muted-foreground">{post.standfirst}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-medium text-accent">
                    Read
                    <Arrow className="size-4 transition-transform duration-200" />
                  </span>
                </AppLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[60ch] text-base text-foreground">Nothing published yet.</p>
        )}
      </Section>
    </>
  );
}
