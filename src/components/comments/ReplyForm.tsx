"use client";

import CommentForm from "./CommentForm";

interface ReplyFormProps {
    postId: string;
    parentId: string;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function ReplyForm({
    postId,
    parentId,
    onCancel,
    onSuccess,
}: ReplyFormProps) {
    return (
        <div className="rounded-2xl bg-muted/30 p-3">
            <CommentForm
                postId={postId}
                parentId={parentId}
                onSuccess={onSuccess}
            />

            <div className="mt-1 flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}