"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    postId: string;
}

export default function RemoveBookmarkButton({
    postId,
}: Props) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function removeBookmark() {
        if (loading) return;

        setLoading(true);

        try {
            const response = await fetch("/api/bookmarks", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error);
            }

            toast.success("Bookmark removed", {
                description:
                    "The post has been removed from your bookmarks.",
                position: "bottom-center",
            });

            router.refresh();
        } catch (error) {
            console.error(error);

            toast.error("Failed to remove bookmark", {
                description:
                    "Please try again.",
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={removeBookmark}
            disabled={loading}
            aria-label="Remove bookmark"
            title="Remove bookmark"
            className="
                inline-flex
                h-7.5
                w-7.5
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/60
                text-white
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-200
                hover:bg-red-600
                hover:scale-105
                active:scale-95
                disabled:pointer-events-none
                disabled:opacity-60
            "
        >
            {loading ? (
                <Loader2 className="size-3.5 animate-spin" />
            ) : (
                <Trash2 className="size-3.5" />
            )}
        </button>
    );
}