"use client";

import CommentForm from "./CommentForm";

interface ReplyFormProps {
    postId: string;
    parentId: string;
    currentUserId?: string | null;
    onSuccess: () => void;
}

export default function ReplyForm({
    postId,
    parentId,
    currentUserId,
    onSuccess,
}: ReplyFormProps) {
    return (
        <div className="mt-3">
            <CommentForm
                postId={postId}
                parentId={parentId}
                currentUserId={currentUserId}
                onSuccess={onSuccess}
            />
        </div>
    );
}