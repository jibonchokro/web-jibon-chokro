import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getBookmarkedPosts } from "@/services/bookmark.service";

import BookmarksClient from "@/components/dashboard/BookmarksClient";
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

            {/* Header */}

            <div className="flex flex-col gap-2">

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Bookmarks
                </h1>

                <p className="text-sm text-muted-foreground">
                    View, search and manage all of your saved
                    articles in one place.
                </p>

            </div>

            {/* Content */}

            {posts.length === 0 ? (
                <EmptyBookmarks />
            ) : (
                <BookmarksClient posts={posts} />
            )}

        </section>
    );
}