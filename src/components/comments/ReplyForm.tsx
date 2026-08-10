"use client";

import CommentForm from "./CommentForm";

interface ReplyFormProps {
    postId: string;
    parentId: string;
    onSuccess: () => void;
}

export default function ReplyForm({
    postId,
    parentId,
    onSuccess,
}: ReplyFormProps) {
    return (
        <div className="mt-3">
            <CommentForm
                postId={postId}
                parentId={parentId}
                onSuccess={onSuccess}
            />
        </div>
    );
}