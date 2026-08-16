"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteAccount } from "@/actions/profile";

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

export default function DeleteAccountDialog() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [confirmText, setConfirmText] =
        useState("");
    const [loading, setLoading] = useState(false);

    const canConfirm =
        confirmText.trim().toUpperCase() ===
        "DELETE";

    async function handleDelete() {
        if (!canConfirm || loading) return;

        setLoading(true);

        try {
            const result = await deleteAccount();

            if (!result.success) {
                toast.error(
                    "অ্যাকাউন্ট মুছে ফেলা যায়নি",
                    {
                        description: result.error,
                        position: "bottom-center",
                    }
                );

                return;
            }

            toast.success(
                "অ্যাকাউন্ট মুছে ফেলা হয়েছে",
                {
                    position: "bottom-center",
                }
            );

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);

            toast.error("কিছু একটা ভুল হয়েছে", {
                description: "আবার চেষ্টা করুন।",
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
                <Trash2 size={16} />
                Delete Account
            </button>

            <AlertDialog
                open={open}
                onOpenChange={setOpen}
            >
                <AlertDialogContent size="default">
                    <AlertDialogHeader>
                        <AlertDialogMedia>
                            <Trash2 className="size-5 text-red-600" />
                        </AlertDialogMedia>

                        <AlertDialogTitle>
                            আপনি কি নিশ্চিত?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            এই কাজটি ফিরিয়ে আনা যাবে
                            না। আপনার অ্যাকাউন্ট,
                            বুকমার্ক এবং মন্তব্যসহ
                            সমস্ত তথ্য স্থায়ীভাবে
                            মুছে যাবে। নিশ্চিত করতে
                            নিচে{" "}
                            <span className="font-semibold">
                                DELETE
                            </span>{" "}
                            লিখুন।
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <input
                        value={confirmText}
                        onChange={(e) =>
                            setConfirmText(
                                e.target.value
                            )
                        }
                        disabled={loading}
                        placeholder="DELETE"
                        className="w-full rounded-lg border border-black/10 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-black disabled:opacity-60"
                    />

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={loading}
                        >
                            বাতিল
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={
                                !canConfirm || loading
                            }
                            className="bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading && (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            )}
                            স্থায়ীভাবে মুছুন
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}