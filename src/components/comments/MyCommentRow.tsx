"use client";

import { CornerDownRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DeleteCommentDialog from "@/components/comments/DeleteCommentDialog";
import EditCommentForm from "@/components/comments/EditCommentForm";

import type { MyComment } from "@/services/comment.service";

interface MyCommentRowProps {
    comment: MyComment;
    serial: number;
}

function formatRelativeTime(date: Date): string {
    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) {
        return "Just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `${days}d ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
        return `${weeks}w ago`;
    }

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function MyCommentRow({
    comment,
    serial,
}: MyCommentRowProps) {
    const [editing, setEditing] = useState(false);

    const router = useRouter();

    const postHref = comment.post
        ? `/posts/${comment.post.slug}#comments`
        : null;

    return (
        <article className="flex gap-3 rounded-xl border border-border/70 bg-card p-4 transition-colors duration-200 hover:border-border hover:bg-muted/20 sm:gap-4 sm:p-5">
            {/* Serial */}

            <div className="flex shrink-0 items-start pt-0.5">
                <span className="flex size-7 items-center justify-center rounded-md border border-border/70 bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                    {serial}
                </span>
            </div>

            {/* Comment */}

            <div className="min-w-0 flex-1">
                {/* Header */}

                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                        {postHref ? (
                            <Link
                                href={postHref}
                                className="truncate text-sm font-semibold text-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                            >
                                {comment.post?.title}
                            </Link>
                        ) : (
                            <span className="truncate text-sm font-semibold text-muted-foreground">
                                Post no longer available
                            </span>
                        )}

                        {comment.parent_id && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/70 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                <CornerDownRight
                                    size={12}
                                    strokeWidth={2}
                                />
                                Reply
                            </span>
                        )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <span>
                            {formatRelativeTime(
                                new Date(
                                    comment.created_at
                                )
                            )}
                        </span>

                        {comment.is_edited && (
                            <>
                                <span aria-hidden="true">
                                    ·
                                </span>

                                <span>
                                    Edited
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content / Edit */}

                {editing ? (
                    <div className="mt-4">
                        <EditCommentForm
                            comment={comment}
                            onCancel={() =>
                                setEditing(false)
                            }
                            onSuccess={() => {
                                setEditing(false);
                                router.refresh();
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-foreground/90">
                            {comment.content}
                        </p>

                        {/* Actions */}

                        <div className="mt-4 flex items-center gap-4 border-t border-border/60 pt-3 text-xs">
                            <button
                                type="button"
                                onClick={() =>
                                    setEditing(true)
                                }
                                className="font-semibold text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
                            >
                                Edit
                            </button>

                            <DeleteCommentDialog
                                commentId={comment.id}
                                onSuccess={() =>
                                    router.refresh()
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </article>
    );
}