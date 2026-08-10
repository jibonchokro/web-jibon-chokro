"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import type { Comment } from "@/types/comment";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import CommentSkeleton from "./CommentSkeleton";

import { MessageCircle } from "lucide-react";

interface CommentSectionProps {
    postId: string;
}

export default function CommentSection({
    postId,
}: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<
        string | null
    >(null);

    useEffect(() => {
        const supabase = createClient();

        supabase.auth
            .getUser()
            .then(({ data }) => {
                setCurrentUserId(data.user?.id ?? null);
            });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUserId(
                    session?.user?.id ?? null
                );
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const loadComments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `/api/comments?postId=${postId}`,
                {
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load comments.");
            }

            const data: Comment[] = await response.json();

            setComments(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load comments.");
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    return (
        <section>
            <div className="mb-5 flex items-center gap-2">

                <MessageCircle
                    size={18}
                    className="text-muted-foreground"
                />

                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    কমেন্টস ({comments.length})
                </h2>
            </div>

            <div className="mb-6">
                <CommentForm
                    postId={postId}
                    onSuccess={loadComments}
                />
            </div>

            {loading ? (
                <CommentSkeleton />
            ) : error ? (
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            ) : (
                <CommentList
                    comments={comments}
                    currentUserId={currentUserId}
                    loading={false}
                    onRefresh={loadComments}
                />
            )}
        </section>
    );
}