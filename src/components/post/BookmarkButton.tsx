"use client";

import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
}

export default function BookmarkButton({ postId }: Props) {
    const router = useRouter();

    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadBookmarkStatus() {
            try {
                const response = await fetch(
                    `/api/bookmarks?postId=${encodeURIComponent(
                        postId
                    )}`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (cancelled) return;

                if (!data.authenticated) {
                    setBookmarked(false);
                } else {
                    setBookmarked(data.bookmarked);
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadBookmarkStatus();

        return () => {
            cancelled = true;
        };
    }, [postId]);

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

            if (!data.success) {
                throw new Error(
                    data.error || "Bookmark failed"
                );
            }

            setBookmarked(data.bookmarked);

            if (data.bookmarked) {
                toast.success("Bookmark Added", {
                    description:
                        "This post has been saved to your bookmarks.",
                });
            } else {
                toast.success("Bookmark Removed", {
                    description:
                        "This post has been removed from your bookmarks.",
                });
            }
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong", {
                description:
                    "Please try again later.",
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
                disabled={loading || saving}
                aria-label={
                    bookmarked
                        ? "Remove bookmark"
                        : "Add bookmark"
                }
                className="
                    inline-flex
                    items-center
                    justify-center
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                <Bookmark
                    size={20}
                    className={`transition-colors ${bookmarked
                            ? "fill-green-600 text-green-600"
                            : "text-gray-600 hover:text-green-600"
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