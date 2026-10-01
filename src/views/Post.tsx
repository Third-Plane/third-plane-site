import { companyPage } from "../data/content";
import type { Block, Post as PostData } from "../data/posts";
import { Cta } from "../components/Cta";
import { Display1, Lead } from "../components/Headings";
import { PostMeta } from "../components/PostMeta";
import { AppLink, Arrow } from "../components/Ui";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-5 font-heading text-[1.75rem] font-medium tracking-tight text-balance text-ink">
          {block.text}
        </h2>
      );
    case "bullets":
      return (
        <ul className="grid gap-[0.6rem] pl-[1.35rem]">
          {block.items.map((item) => (
            <li
              className="relative before:absolute before:top-[0.65em] before:-left-[1.35rem] before:size-2 before:rounded-[50%] before:bg-purple before:content-['']"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="grid list-decimal gap-[0.6rem] pl-[1.35rem]">
          {block.items.map((item) => (
            <li className="relative" key={item}>
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="mx-0 my-2 rounded-r-sm border-l-[3px] border-l-purple bg-cream px-6 py-5 font-heading text-[1.3rem] leading-[1.35] font-medium tracking-head text-ink">
          {block.text}
        </blockquote>
      );
    case "paragraph":
      return <p>{block.text}</p>;
    default:
      return null;
  }
}

export function Post({ post }: { post: PostData }) {
  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-cream pt-[clamp(2.5rem,5vw,4.5rem)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="pointer-events-auto wrap relative z-3 grid max-w-[760px] gap-5">
            <AppLink
              className="pointer-events-auto inline-flex items-center gap-[0.4rem] justify-self-start text-[0.9rem] font-medium text-purple"
              href="/resources"
            >
              <Arrow className="size-3.5 shrink-0 rotate-180" />
              Resources
            </AppLink>
            <PostMeta post={post} />
            <Display1 size="editorial">{post.title}</Display1>
            <Lead tone="body" className="max-w-[60ch]">
              {post.standfirst}
            </Lead>
            <p className="text-[0.9rem] text-ink-muted">{post.author}</p>
          </div>
        </header>
        <div className="relative bg-white py-(--section-y)">
          <div className="wrap grid max-w-[68ch] gap-5 text-[1.125rem] leading-[1.7] text-ink-body">
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
