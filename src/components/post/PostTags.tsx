import { Post } from "@/types/post";
import Link from "next/link";

interface Props {
    post: Post;
}

export default function PostTags({ post }: Props) {
    return (
        <section className="mt-12">
            <h2 className="mb-4 text-lg font-semibold">
                Tags
            </h2>

            <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm transition hover:bg-green-100"
                    >
                        #{tag}
                    </Link>
                ))}
            </div>
        </section>
    );
}