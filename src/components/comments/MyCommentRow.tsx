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
}

function formatRelativeTime(date: Date): string {
    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) return "Just now";

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
}: MyCommentRowProps) {
    const [editing, setEditing] = useState(false);

    const router = useRouter();

    const postHref = comment.post
        ? `/posts/${comment.post.slug}#comments`
        : null;

    return (
        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-custom sm:p-5">

            {/* Header */}

            <div className="flex flex-wrap items-start justify-between gap-2">

                <div className="flex min-w-0 flex-wrap items-center gap-2">

                    {postHref ? (
                        <Link
                            href={postHref}
                            className="truncate text-sm font-semibold text-foreground hover:underline"
                        >
                            {comment.post?.title}
                        </Link>
                    ) : (
                        <span className="truncate text-sm font-semibold text-muted-foreground">
                            Post no longer available
                        </span>
                    )}

                    {comment.parent_id && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">

                            <CornerDownRight size={12} />

                            Reply

                        </span>
                    )}

                </div>


                {/* Time + Edited */}

                <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">

                    <span>
                        {formatRelativeTime(
                            new Date(comment.created_at)
                        )}
                    </span>

                    {comment.is_edited && (
                        <>
                            <span>·</span>

                            <span>
                                Edited
                            </span>
                        </>
                    )}

                </div>

            </div>


            {/* Edit Form / Comment */}

            {editing ? (

                <div className="mt-3">

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

                    {/* Comment Content */}

                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-foreground">
                        {comment.content}
                    </p>


                    {/* Actions */}

                    <div className="mt-3 flex items-center gap-4 text-xs">

                        <button
                            type="button"
                            onClick={() =>
                                setEditing(true)
                            }
                            className="font-semibold text-muted-foreground hover:text-foreground hover:underline"
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
    );
}