"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import type { Comment } from "@/types/comment";

interface CommentHeaderProps {
    comment: Comment;
}

export default function CommentHeader({
    comment,
}: CommentHeaderProps) {
    const name =
        comment.profiles?.name?.trim() ||
        "Anonymous";

    const initials =
        name
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?";

    return (
        <div className="flex items-start gap-2.5">
            <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage
                    src={
                        comment.profiles?.avatar ??
                        undefined
                    }
                    alt={name}
                />

                <AvatarFallback className="text-xs">
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
                <div className={`inline-block max-w-full rounded-2xl px-3 py-2 ${comment.is_deleted ? "bg-transparent px-0 py-0" : "bg-muted"}`}>
                    {!comment.is_deleted && (
                        <p className="truncate text-sm font-semibold leading-tight">
                            {name}
                        </p>
                    )}

                    {comment.is_deleted ? (
                        <p className="text-sm italic text-muted-foreground">
                            This comment has been
                            deleted.
                        </p>
                    ) : (
                        <p className="whitespace-pre-wrap break-words text-sm leading-6">
                            {comment.content}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}