"use client";

import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
    postId: string;
    initialViews: number;
}

export default function PostViews({
    postId,
    initialViews,
}: Props) {
    const [views, setViews] = useState(initialViews);

    const hasLoaded = useRef(false);

    useEffect(() => {
        if (hasLoaded.current) {
            return;
        }

        hasLoaded.current = true;

        let cancelled = false;

        async function updateViews() {
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
                    throw new Error("Failed to update views");
                }

                const data = await response.json();

                if (
                    !cancelled &&
                    typeof data.views === "number"
                ) {
                    setViews((current) =>
                        current === data.views
                            ? current
                            : data.views
                    );
                }
            } catch (error) {
                console.error("PostViews Error:", error);
            }
        }

        updateViews();

        return () => {
            cancelled = true;
        };
    }, [postId]);

    return (
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <Eye
                size={16}
                className="shrink-0"
            />

            <span className="font-medium">
                {views.toLocaleString("en-US")}
            </span>
        </div>
    );
}