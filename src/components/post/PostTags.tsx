import { Post } from "@/types/post";
import Link from "next/link";

interface Props {
    post: Post;
}

export default function PostTags({ post }: Props) {
    if (!post.tags?.length) {
        return null;
    }

    return (
        <section className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
                Tags
            </h2>

            <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                    >
                        #{tag}
                    </Link>
                ))}
            </div>
        </section>
    );
}