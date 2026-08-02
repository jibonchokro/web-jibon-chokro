"use client";

import { useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { Comment } from "@/types/comment";

import DeleteCommentDialog from "./DeleteCommentDialog";
import ReplyForm from "./ReplyForm";

interface Props {
    comment: Comment;
    comments: Comment[];
    currentUserId?: string | null;
    onRefresh: () => void;
}

export default function CommentItem({
    comment,
    comments,
    currentUserId,
    onRefresh,
}: Props) {
    const [replying, setReplying] = useState(false);

    const replies = useMemo(
        () =>
            comments.filter(
                (item) => item.parent_id === comment.id
            ),
        [comments, comment.id]
    );

    const initials =
        comment.profiles?.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "?";

    return (
        <div className="space-y-5">
            <div className="flex gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                        src={
                            comment.profiles?.avatar ??
                            undefined
                        }
                    />

                    <AvatarFallback>
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">
                            {comment.profiles?.name ??
                                "Anonymous"}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {new Date(
                                comment.created_at
                            ).toLocaleString()}
                        </span>

                        {comment.is_edited &&
                            !comment.is_deleted && (
                                <span className="text-xs text-muted-foreground">
                                    (edited)
                                </span>
                            )}
                    </div>

                    {comment.is_deleted ? (
                        <p className="mt-2 italic text-muted-foreground">
                            This comment has been
                            deleted.
                        </p>
                    ) : (
                        <>
                            <p className="mt-2 whitespace-pre-wrap break-words leading-7">
                                {comment.content}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setReplying(
                                            (
                                                prev
                                            ) =>
                                                !prev
                                        )
                                    }
                                >
                                    {replying
                                        ? "Cancel Reply"
                                        : "Reply"}
                                </Button>

                                {currentUserId ===
                                    comment.user_id && (
                                        <DeleteCommentDialog
                                            commentId={
                                                comment.id
                                            }
                                            onSuccess={
                                                onRefresh
                                            }
                                        />
                                    )}
                            </div>

                            {replying && (
                                <ReplyForm
                                    postId={
                                        comment.post_id
                                    }
                                    parentId={
                                        comment.id
                                    }
                                    onCancel={() =>
                                        setReplying(
                                            false
                                        )
                                    }
                                    onSuccess={() => {
                                        setReplying(
                                            false
                                        );
                                        onRefresh();
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {replies.length > 0 && (
                <div className="ml-6 space-y-6 border-l pl-6 md:ml-12">
                    {replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            comments={comments}
                            currentUserId={
                                currentUserId
                            }
                            onRefresh={
                                onRefresh
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}