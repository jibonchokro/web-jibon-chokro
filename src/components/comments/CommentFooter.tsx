"use client";

import type { Comment } from "@/types/comment";

import DeleteCommentDialog from "./DeleteCommentDialog";

interface CommentFooterProps {
    comment: Comment;
    canEdit: boolean;
    canDelete: boolean;
    onEdit: () => void;
    onRefresh: () => void;
    onReply: () => void;
    replying: boolean;
}

function formatRelativeTime(date: Date): string {
    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w`;

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function CommentFooter({
    comment,
    canEdit,
    canDelete,
    onEdit,
    onRefresh,
    onReply,
    replying,
}: CommentFooterProps) {
    if (comment.is_deleted) {
        return null;
    }

    const timeAgo = formatRelativeTime(
        new Date(comment.created_at)
    );

    return (
        <div className="ml-11 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{timeAgo}</span>

            {comment.is_edited && (
                <span className="text-muted-foreground">·</span>
            )}

            {comment.is_edited && (
                <span>Edited</span>
            )}

            <button
                type="button"
                onClick={onReply}
                className="font-semibold hover:text-foreground hover:underline"
            >
                {replying ? "Cancel" : "Reply"}
            </button>

            {canEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="font-semibold hover:text-foreground hover:underline"
                >
                    Edit
                </button>
            )}

            {canDelete && (
                <DeleteCommentDialog
                    commentId={comment.id}
                    onSuccess={onRefresh}
                />
            )}
        </div>
    );
}