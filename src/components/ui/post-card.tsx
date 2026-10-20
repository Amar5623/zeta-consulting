import Link from "next/link";
import { formatDate, type Post } from "@/content/insights";
import { Media } from "./media";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group flex flex-col gap-6">
      <div className="overflow-hidden rounded-lg">
        <Media
          src={post.cover}
          alt={post.title}
          label="Article cover"
          tint={post.tint}
          className="aspect-[4/3] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-[0.8125rem] text-fg-muted">
          <span className="text-ink">{post.category}</span>
          <span className="size-1 rounded-full bg-line" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="size-1 rounded-full bg-line" />
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-h4 leading-snug">
          <span className="link-underline">{post.title}</span>
        </h3>
      </div>
    </Link>
  );
}
