import { companyPage } from "../data/content";
import type { Block, Post as PostData } from "../data/posts";
import { Cta } from "../components/Cta";
import { Display1, Lead } from "../components/Headings";
import { Hero, Leave } from "../components/Hero";
import { PostMeta } from "../components/PostMeta";
import { AppLink, Arrow } from "../components/Ui";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-5 font-heading text-3xl font-medium tracking-tight text-balance text-foreground">
          {block.text}
        </h2>
      );
    case "bullets":
      return (
        <ul className="grid gap-2.5 pl-5">
          {block.items.map((item) => (
            <li
              className="relative before:absolute before:top-[0.65em] before:-left-5 before:size-2 before:rounded-full before:bg-accent before:content-['']"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="grid list-decimal gap-2.5 pl-5">
          {block.items.map((item) => (
            <li className="relative" key={item}>
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="mx-0 my-2 rounded-r-xl border-l-3 border-l-accent bg-muted px-6 py-5 font-heading text-xl leading-snug font-medium tracking-tight text-foreground">
          {block.text}
        </blockquote>
      );
    case "paragraph":
      return <p>{block.text}</p>;
    default:
      return null;
  }
}

// The hero is its own export: pages/resources/[slug].astro puts it in Base's
// `hero` slot.
export function PostHero({ post }: { post: PostData }) {
  return (
    <Hero>
      <div className="px-(--gutter) pt-14 pb-16">
        <div className="grid max-w-190 gap-5">
          <Leave tier="heading">
            <div className="grid gap-5">
              <AppLink
                className="inline-flex items-center gap-1.5 justify-self-start text-sm font-medium text-accent"
                href="/resources"
              >
                <Arrow className="size-3.5 shrink-0 rotate-180" />
                Resources
              </AppLink>
              <PostMeta post={post} />
              <Display1 size="editorial">{post.title}</Display1>
            </div>
          </Leave>
          <Leave tier="lead">
            <Lead tone="muted" className="max-w-[60ch]">
              {post.standfirst}
            </Lead>
          </Leave>
          <Leave tier="actions">
            <p className="text-sm text-subtle-foreground">{post.author}</p>
          </Leave>
        </div>
      </div>
    </Hero>
  );
}

export function Post({ post }: { post: PostData }) {
  return (
    <>
      <article>
        <div className="surface-white relative rounded-xl py-27">
          <div className="wrap grid max-w-[68ch] gap-5 text-lg leading-relaxed">
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
