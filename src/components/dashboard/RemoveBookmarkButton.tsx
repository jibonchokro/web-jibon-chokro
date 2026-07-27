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
            className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-red-200
                px-3
                py-2
                text-sm
                font-medium
                text-red-600
                transition-colors
                hover:bg-red-50
                disabled:opacity-50
            "
        >
            {loading ? (
                <Loader2 className="size-4 animate-spin" />
            ) : (
                <Trash2 className="size-4" />
            )}

            Remove
        </button>
    );
}