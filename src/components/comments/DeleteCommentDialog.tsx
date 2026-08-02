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

import { Button } from "@/components/ui/button";

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
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
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