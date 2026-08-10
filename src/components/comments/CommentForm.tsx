"use client";

import {
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Send } from "lucide-react";

interface CommentFormProps {
    postId: string;
    parentId?: string | null;
    onSuccess: () => void;
}

const MAX_LENGTH = 5000;
const MAX_LINES = 7;
const LINE_HEIGHT = 24;
const INITIAL_HEIGHT = 40;
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT;

export default function CommentForm({
    postId,
    parentId = null,
    onSuccess,
}: CommentFormProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

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
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const text = content.trim();

        if (!text || loading) return;

        try {
            setLoading(true);

            const response = await fetch(
                "/api/comments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        postId,
                        parentId,
                        content: text,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    "Failed to post comment."
                );
            }

            setContent("");

            onSuccess();
        } catch (error) {
            console.error(
                "Comment submission error:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to post comment."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full items-end gap-2"
        >
            <div className="min-w-0 flex-1">
                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    placeholder={
                        parentId
                            ? "Write a reply..."
                            : "Write a comment..."
                    }
                    rows={1}
                    maxLength={MAX_LENGTH}
                    disabled={loading}
                    className="
                        comment-textarea
                        h-10
                        min-h-10
                        max-h-[168px]
                        resize-none
                        overflow-hidden
                        rounded-[20px]
                        border-none
                        bg-muted
                        px-4
                        py-2
                        leading-6
                        shadow-none
                        focus-visible:ring-1
                        focus-visible:ring-ring
                    "
                />
            </div>

            <Button
                type="submit"
                size="icon"
                disabled={
                    loading ||
                    content.trim().length === 0
                }
                aria-label={
                    parentId
                        ? "Submit reply"
                        : "Submit comment"
                }
                className="
                    h-10
                    w-10
                    shrink-0
                    rounded-full
                "
            >
                <Send
                    className="h-4 w-4"
                    strokeWidth={2}
                />
            </Button>
        </form>
    );
}