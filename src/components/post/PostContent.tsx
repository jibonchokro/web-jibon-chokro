import { Post } from "@/types/post";

interface Props {
    post: Post;
}

export default function PostContent({ post }: Props) {
    return (
        <article className="prose prose-lg max-w-none">
            {post.content}
        </article>
    );
}