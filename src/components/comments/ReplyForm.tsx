"use client";

import { Button } from "@/components/ui/button";

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
        <div className="mt-4 rounded-lg border bg-muted/30 p-4">

            <CommentForm
                postId={postId}
                parentId={parentId}
                onSuccess={onSuccess}
            />

            <div className="-mt-4 flex justify-end">

                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

            </div>

        </div>
    );
}