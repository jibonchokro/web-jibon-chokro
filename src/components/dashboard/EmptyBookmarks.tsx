import { ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function EmptyBookmarks() {
    return (
        <div
            className="
                flex
                min-h-[500px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-black/10
                bg-background
                px-6
                py-12
                text-center
            "
        >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Bookmark className="size-10 text-muted-foreground" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
                No bookmarked posts
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                You haven't saved any posts yet. Browse articles and bookmark
                the ones you want to read later.
            </p>

            <Link href="/posts">
                <Button className="mt-8 gap-2">
                    Browse Posts
                    <ArrowRight className="size-4" />
                </Button>
            </Link>
        </div>
    );
}