"use client";

import type { Comment } from "@/types/comment";

import CommentItem from "./CommentItem";
import EmptyComments from "./EmptyComments";

interface CommentListProps {
    comments: Comment[];
    currentUserId?: string | null;
    loading?: boolean;
    onRefresh: () => void;
}

export default function CommentList({
    comments,
    currentUserId,
    loading = false,
    onRefresh,
}: CommentListProps) {
    if (loading) {
        return null;
    }

    const topLevelComments = comments.filter(
        (comment) => comment.parent_id === null
    );

    if (topLevelComments.length === 0) {
        return <EmptyComments />;
    }

    return (
        <div className="space-y-6">
            {topLevelComments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    comments={comments}
                    currentUserId={currentUserId}
                    onRefresh={onRefresh}
                />
            ))}
        </div>
    );
}