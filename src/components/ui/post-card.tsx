import Link from "next/link";
import { formatDate, type Post } from "@/content/insights";
import { InsightCover } from "@/components/visuals/insight-art";

export function PostCard({ post, as: Heading = "h3" }: { post: Post; as?: "h2" | "h3" }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group flex flex-col gap-6">
      <div className="overflow-hidden rounded-lg">
        <InsightCover kind={post.cover} className="aspect-[4/3] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-[0.8125rem] text-fg-muted">
          <span className="text-ink">{post.category}</span>
          <span className="size-1 rounded-full bg-line" />
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          <span className="size-1 rounded-full bg-line" />
          <span>{post.readTime}</span>
        </div>
        <Heading className="text-h4 leading-snug">
          <span className="link-underline">{post.title}</span>
        </Heading>
      </div>
    </Link>
  );
}
