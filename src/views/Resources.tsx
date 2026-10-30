import { resourcesPage as page } from "../data/content";
import type { Post } from "../data/posts";
import { PostMeta } from "../components/PostMeta";
import { Section, SectionContent, SectionHeader } from "../components/Section";
import { AppLink, Arrow } from "../components/Ui";

export function Resources({ posts }: { posts: Post[] }) {
  return (
    <Section theme="white" id="posts" className="px-(--gutter)">
      <SectionHeader>
        {/* The page's only heading above the posts, so its h1, in a section
            title's size. */}
        <h1 className="text-[48px]/[48px]">{page.title}</h1>
        <p className="lead">{page.lead}</p>
      </SectionHeader>
      <SectionContent>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <AppLink
                className="grid h-full content-start gap-3.5 rounded-2xl bg-muted p-7 text-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                href={`/resources/${post.slug}`}
              >
                <PostMeta post={post} />
                <h2 className="text-xl">{post.title}</h2>
                <p className="text-base text-muted-foreground">{post.standfirst}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 font-medium text-accent">
                  Read
                  <Arrow className="size-4 transition-transform duration-200" />
                </span>
              </AppLink>
            </li>
          ))}
        </ul>
      </SectionContent>
    </Section>
  );
}
