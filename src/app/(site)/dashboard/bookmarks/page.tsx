import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getBookmarkedPosts } from "@/services/bookmark.service";

import BookmarkCard from "@/components/dashboard/BookmarkCard";
import EmptyBookmarks from "@/components/dashboard/EmptyBookmarks";

export default async function BookmarksPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const posts = await getBookmarkedPosts();

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Bookmarks
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Your saved posts.
                </p>
            </div>

            {posts.length === 0 ? (
                <EmptyBookmarks />
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post: any) => (
                        <BookmarkCard
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}