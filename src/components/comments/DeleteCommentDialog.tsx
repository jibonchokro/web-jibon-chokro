"use client";

import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
    commentId: string;
    onSuccess: () => void;
}

export default function DeleteCommentDialog({
    commentId,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    async function deleteComment() {
        try {
            setLoading(true);

            const response = await fetch(
                `/api/comments/${commentId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            onSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <button
                        type="button"
                        className="text-xs font-semibold text-muted-foreground hover:text-red-600 hover:underline"
                    />
                }
            >
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Delete Comment?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={deleteComment}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}