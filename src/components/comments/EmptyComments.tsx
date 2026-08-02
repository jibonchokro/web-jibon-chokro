import { MessageCircle } from "lucide-react";

export default function EmptyComments() {
    return (
        <div className="rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
                No comments yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
                Be the first to share your thoughts about this post.
            </p>
        </div>
    );
}