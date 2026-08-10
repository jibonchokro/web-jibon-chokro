"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentFormProps {
    postId: string;
    parentId?: string | null;
    onSuccess: () => void;
}

export default function CommentForm({
    postId,
    parentId = null,
    onSuccess,
}: CommentFormProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const text = content.trim();

        if (!text) return;

        try {
            setLoading(true);

            const response = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    parentId,
                    content: text,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            setContent("");

            onSuccess();
        } catch (error) {
            console.error(error);
            alert("Failed to post comment.");
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
                onChange={(e) =>
                    setContent(e.target.value)
                }
                placeholder={
                    parentId
                        ? "Write a reply..."
                        : "Write a comment..."
                }
                rows={parentId ? 2 : 3}
                maxLength={5000}
                className="resize-none rounded-2xl border-none bg-muted focus-visible:ring-1 focus-visible:ring-ring"
            />

            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {content.length}/5000
                </span>

                <Button
                    type="submit"
                    size="sm"
                    className="rounded-full px-4"
                    disabled={
                        loading ||
                        content.trim().length === 0
                    }
                >
                    {loading
                        ? "Posting..."
                        : "Post"}
                </Button>
            </div>
        </form>
    );
}