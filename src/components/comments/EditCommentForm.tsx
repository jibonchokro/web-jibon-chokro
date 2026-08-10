"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { Comment } from "@/types/comment";

interface EditCommentFormProps {
    comment: Comment;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function EditCommentForm({
    comment,
    onCancel,
    onSuccess,
}: EditCommentFormProps) {
    const [content, setContent] = useState(
        comment.content
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(
        null
    );

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedContent = content.trim();

        if (!trimmedContent) {
            setError("Comment cannot be empty.");
            return;
        }

        if (trimmedContent.length > 5000) {
            setError(
                "Comment cannot exceed 5000 characters."
            );
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `/api/comments/${comment.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        content: trimmedContent,
                    }),
                }
            );

            const data = await response
                .json()
                .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error ??
                    "Failed to update comment."
                );
            }

            onSuccess();
        } catch (error) {
            console.error(
                "Failed to update comment:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update comment."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-2"
        >
            <Textarea
                value={content}
                onChange={(event) =>
                    setContent(event.target.value)
                }
                rows={3}
                maxLength={5000}
                disabled={loading}
                autoFocus
                placeholder="Edit your comment..."
                className="resize-none rounded-2xl border-none bg-muted focus-visible:ring-1 focus-visible:ring-ring"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                        {content.length}/5000
                    </span>

                    {error && (
                        <span className="text-xs text-red-600">
                            {error}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <Button
                        type="submit"
                        size="sm"
                        className="rounded-full px-4"
                        disabled={
                            loading ||
                            !content.trim()
                        }
                    >
                        {loading
                            ? "Saving..."
                            : "Save"}
                    </Button>
                </div>
            </div>
        </form>
    );
}