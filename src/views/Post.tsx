import type { Block, Post as PostData } from "../data/posts";
import { Display1 } from "../components/Headings";
import { PostMeta } from "../components/PostMeta";
import { Section } from "../components/Section";
import { AppLink, Arrow } from "../components/Ui";
import { Header } from "../components/Header";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-5 text-3xl">{block.text}</h2>;
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

export function Post({ post }: { post: PostData }) {
  return (
    <>
      <Header />
      <Section as="article" theme="white">
        <div className="wrap grid max-w-4xl gap-5">
          <AppLink
            className="inline-flex items-center gap-1.5 justify-self-start text-sm font-medium text-accent"
            href="/resources"
          >
            <Arrow className="size-3.5 shrink-0 rotate-180" />
            Resources
          </AppLink>
          <PostMeta post={post} />
          <Display1 size="editorial">{post.title}</Display1>
          <p className="lead">{post.standfirst}</p>
          <p className="text-sm text-subtle-foreground">{post.author}</p>
        </div>
        <div className="wrap mt-16 grid max-w-4xl gap-5 text-lg leading-relaxed">
          {post.body.map((block, i) => (
            <BlockView block={block} key={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
