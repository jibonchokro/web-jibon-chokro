"use client";

import { MessageCircle } from "lucide-react";

interface CommentCountButtonProps {
    initialCount: number;
    /** id of the element to scroll to. Must match CommentSection's wrapper. */
    targetId?: string;
}

export default function CommentCountButton({
    initialCount,
    targetId = "comments",
}: CommentCountButtonProps) {
    function scrollToComments() {
        document
            .getElementById(targetId)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    }

    return (
        <button
            type="button"
            onClick={scrollToComments}
            aria-label="Jump to comments"
            className="inline-flex h-[35px] items-center gap-2 rounded-lg bg-muted px-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
            <MessageCircle
                size={18}
                className="shrink-0"
            />

            <span className="text-[16px] sm:text-[18px] lg:text-[18px]">
                {initialCount}
            </span>
        </button>
    );
}