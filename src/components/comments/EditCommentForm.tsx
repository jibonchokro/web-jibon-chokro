"use client";

import {
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Check, X } from "lucide-react";

import type { Comment } from "@/types/comment";

interface EditCommentFormProps {
    comment: Comment;
    onCancel: () => void;
    onSuccess: () => void;
}

const MAX_LENGTH = 5000;
const MAX_LINES = 7;
const LINE_HEIGHT = 24;
const INITIAL_HEIGHT = 40;
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT;

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

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    function resizeTextarea() {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = `${INITIAL_HEIGHT}px`;

        const height = Math.min(
            Math.max(
                textarea.scrollHeight,
                INITIAL_HEIGHT
            ),
            MAX_HEIGHT
        );

        textarea.style.height = `${height}px`;

        textarea.style.overflowY =
            textarea.scrollHeight > MAX_HEIGHT
                ? "auto"
                : "hidden";
    }

    useEffect(() => {
        resizeTextarea();
    }, [content]);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedContent = content.trim();

        if (!trimmedContent) {
            setError("Comment cannot be empty.");
            return;
        }

        if (trimmedContent.length > MAX_LENGTH) {
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
            className="w-full"
        >
            <div className="flex w-full items-end gap-2">
                <div className="min-w-0 flex-1">
                    <Textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(event) => {
                            if (
                                event.target.value
                                    .length <=
                                MAX_LENGTH
                            ) {
                                setContent(
                                    event.target.value
                                );
                            }

                            if (error) {
                                setError(null);
                            }
                        }}
                        rows={1}
                        maxLength={MAX_LENGTH}
                        disabled={loading}
                        autoFocus
                        placeholder="Edit your comment..."
                        className="comment-textarea h-10 min-h-10 max-h-[168px] resize-none overflow-hidden rounded-[20px] border border-border bg-muted px-4 py-2 leading-6 shadow-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onCancel}
                    disabled={loading}
                    aria-label="Cancel editing"
                    className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                    <X
                        className="h-4 w-4"
                        strokeWidth={2}
                    />
                </Button>

                <Button
                    type="submit"
                    size="icon"
                    disabled={
                        loading ||
                        !content.trim()
                    }
                    aria-label="Save comment"
                    className="h-10 w-10 shrink-0 rounded-full"
                >
                    <Check
                        className="h-4 w-4"
                        strokeWidth={2}
                    />
                </Button>
            </div>

            {error && (
                <p className="mt-2 text-xs text-destructive">
                    {error}
                </p>
            )}
        </form>
    );
}