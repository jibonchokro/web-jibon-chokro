"use client";

import { useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Comment } from "@/types/comment";

import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";
import EditCommentForm from "./EditCommentForm";
import ReplyForm from "./ReplyForm";

interface CommentItemProps {
    comment: Comment;
    comments: Comment[];
    currentUserId?: string | null;
    onRefresh: () => void;
    /**
     * The user_id of the top-level comment this item belongs to, if
     * it's a reply. Lets a parent-comment owner moderate replies left
     * on their own comment, the same way a post owner can moderate
     * comments on their post.
     */
    parentOwnerId?: string | null;
}

export default function CommentItem({
    comment,
    comments,
    currentUserId,
    onRefresh,
    parentOwnerId = null,
}: CommentItemProps) {
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);

    const replies = useMemo(
        () =>
            comments.filter(
                (item) =>
                    item.parent_id === comment.id
            ),
        [comments, comment.id]
    );

    const isOwner =
        !!currentUserId &&
        currentUserId === comment.user_id;

    const isParentOwner =
        !!currentUserId &&
        !!parentOwnerId &&
        currentUserId === parentOwnerId;

    const canEdit = isOwner && !comment.is_deleted;
    const canDelete =
        (isOwner || isParentOwner) && !comment.is_deleted;

    const name =
        comment.profiles?.name?.trim() ||
        "Anonymous";

    const initials =
        name
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?";

    return (
        <article className="space-y-1">
            {editing ? (
                <div className="flex items-start gap-2.5">
                    <Avatar className="h-9 w-9 shrink-0">
                        <AvatarImage
                            src={
                                comment.profiles
                                    ?.avatar ??
                                undefined
                            }
                            alt={name}
                        />
                        <AvatarFallback className="text-xs">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <EditCommentForm
                            comment={comment}
                            onCancel={() =>
                                setEditing(false)
                            }
                            onSuccess={() => {
                                setEditing(false);
                                onRefresh();
                            }}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <CommentHeader comment={comment} />

                    <CommentFooter
                        comment={comment}
                        canEdit={canEdit}
                        canDelete={canDelete}
                        onEdit={() => setEditing(true)}
                        replying={replying}
                        onReply={() =>
                            setReplying(
                                (previous) => !previous
                            )
                        }
                        onRefresh={onRefresh}
                    />

                    {replying && !comment.is_deleted && (
                        <div className="ml-11 mt-2">
                            <ReplyForm
                                postId={comment.post_id}
                                parentId={comment.id}
                                onSuccess={() => {
                                    setReplying(false);
                                    onRefresh();
                                }}
                            />
                        </div>
                    )}
                </>
            )}

            {replies.length > 0 && (
                <div className="ml-11 space-y-4 pt-1">
                    {replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            comments={comments}
                            currentUserId={
                                currentUserId
                            }
                            onRefresh={onRefresh}
                            parentOwnerId={
                                comment.user_id
                            }
                        />
                    ))}
                </div>
            )}
        </article>
    );
}