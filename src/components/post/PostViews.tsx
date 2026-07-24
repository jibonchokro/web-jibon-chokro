"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    postId: string;
}

export default function PostViews({ postId }: Props) {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        console.log("PostViews mounted:", postId);
        let cancelled = false;

        async function loadViews() {
            try {
                const response = await fetch("/api/views", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        postId,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to load views");
                }

                const data = await response.json();

                if (!cancelled) {
                    setViews(data.views ?? 0);
                }
            } catch (error) {
                console.error("PostViews Error:", error);

                if (!cancelled) {
                    setViews(0);
                }
            }
        }

        loadViews();

        return () => {
            cancelled = true;
        };
    }, [postId]);

    return (
        <div className="flex items-center gap-2">
            <Eye size={18} className="text-muted-foreground" />

            <span>
                {views === null
                    ? "..."
                    : views.toLocaleString("bn-BD")}
            </span>
        </div>
    );
}