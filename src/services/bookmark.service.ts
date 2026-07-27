import { createClient } from "@/lib/supabase/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const bookmarkPostsQuery = `
*[
  _type == "post" &&
  _id in $postIds
]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  category->{
    title,
    slug
  }
}
`;

export async function getBookmarkedPosts() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data: bookmarks, error } = await supabase
        .from("bookmarks")
        .select("post_id")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false,
        });

    if (error || !bookmarks?.length) {
        return [];
    }

    const postIds = bookmarks.map((item) => item.post_id);

    const posts = await client.fetch(
        bookmarkPostsQuery,
        {
            postIds,
        }
    );

    const order = new Map(
        postIds.map((id, index) => [id, index])
    );

    return posts
        .map((post: any) => ({
            ...post,
            imageUrl: post.coverImage
                ? urlFor(post.coverImage)
                    .width(800)
                    .height(450)
                    .url()
                : null,
        }))
        .sort(
            (a: any, b: any) =>
                (order.get(a._id) ?? 0) -
                (order.get(b._id) ?? 0)
        );
}