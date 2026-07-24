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
        <div className="flex items-center gap-2">
            <Eye
                size={18}
                className="text-muted-foreground"
            />

            <span>{views.toLocaleString("bn-BD")}</span>
        </div>
    );
}