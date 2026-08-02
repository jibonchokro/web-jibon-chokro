"use client";

import type { Comment } from "@/types/comment";

import CommentItem from "./CommentItem";

interface Props {
    comments: Comment[];
    loading: boolean;
    onRefresh: () => void;
}

export default function CommentList({
    comments,
    loading,
    onRefresh,
}: Props) {
    if (loading) {
        return (
            <p className="text-sm text-muted-foreground">
                Loading comments...
            </p>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="rounded-lg border p-6 text-center text-muted-foreground">
                No comments yet.
            </div>
        );
    }

    const rootComments = comments.filter(
        (comment) => comment.parent_id === null
    );

    return (
        <div className="space-y-6">
            {rootComments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    comments={comments}
                    onRefresh={onRefresh}
                />
            ))}
        </div>
    );
}