"use client";

import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
    postId: string;
    initialBookmarked: boolean;
}

export default function BookmarkButton({
    postId,
    initialBookmarked,
}: Props) {
    const router = useRouter();

    const [bookmarked, setBookmarked] =
        useState(initialBookmarked);

    const [saving, setSaving] = useState(false);

    const [loginDialogOpen, setLoginDialogOpen] =
        useState(false);

    async function toggleBookmark() {
        if (saving) return;

        setSaving(true);

        try {
            const response = await fetch("/api/bookmarks", {
                method: bookmarked ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                }),
            });

            const data = await response.json();

            if (response.status === 401) {
                setLoginDialogOpen(true);
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Bookmark failed"
                );
            }

            setBookmarked(data.bookmarked);

            toast.success(
                data.bookmarked
                    ? "Bookmark Added"
                    : "Bookmark Removed",
                {
                    description: data.bookmarked
                        ? "This post has been saved to your bookmarks."
                        : "This post has been removed from your bookmarks.",
                    position: "bottom-center",
                }
            );

            router.refresh();
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong", {
                description:
                    "Please try again later.",
                position: "bottom-center",
            });
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={toggleBookmark}
                disabled={saving}
                aria-label={
                    bookmarked
                        ? "Remove bookmark"
                        : "Add bookmark"
                }
                className="inline-flex items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-50"
            >
                <Bookmark
                    size={20}
                    className={`transition-colors ${bookmarked
                            ? "fill-black text-black"
                            : "text-muted-foreground hover:text-black"
                        }`}
                />
            </button>

            <AlertDialog
                open={loginDialogOpen}
                onOpenChange={setLoginDialogOpen}
            >
                <AlertDialogContent size="default">
                    <AlertDialogHeader>
                        <AlertDialogMedia>
                            <Bookmark className="size-5 text-green-600" />
                        </AlertDialogMedia>

                        <AlertDialogTitle>
                            Login Required
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Please sign in to bookmark this
                            post. Your saved posts will be
                            available from your account
                            anytime.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={() => {
                                setLoginDialogOpen(false);
                                router.push("/auth/login");
                            }}
                        >
                            Login
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}