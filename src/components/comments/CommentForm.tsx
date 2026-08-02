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
            className="space-y-4 mb-8"
        >
            <Textarea
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                placeholder="Write your comment..."
                rows={5}
                maxLength={5000}
            />

            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {content.length}/5000
                </span>

                <Button
                    type="submit"
                    disabled={
                        loading ||
                        content.trim().length === 0
                    }
                >
                    {loading
                        ? "Posting..."
                        : "Post Comment"}
                </Button>
            </div>
        </form>
    );
}