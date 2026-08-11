"use client";

import { Flag } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReportPostDialogProps {
    postId: string;
    postTitle: string;
    postUrl: string;
}

const REPORT_REASONS: {
    value: string;
    label: string;
}[] = [
        {
            value: "incorrect_information",
            label: "ভুল তথ্য",
        },
        { value: "spam", label: "স্প্যাম" },
        {
            value: "inappropriate",
            label: "অনুপযুক্ত কনটেন্ট",
        },
        {
            value: "copyright",
            label: "কপিরাইট লঙ্ঘন",
        },
        { value: "other", label: "অন্যান্য" },
    ];

export default function ReportPostDialog({
    postId,
    postTitle,
    postUrl,
}: ReportPostDialogProps) {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [description, setDescription] =
        useState("");
    const [reporterEmail, setReporterEmail] =
        useState("");
    const [submitting, setSubmitting] =
        useState(false);
    const [error, setError] = useState<
        string | null
    >(null);

    function resetForm() {
        setReason("");
        setDescription("");
        setReporterEmail("");
        setError(null);
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!reason) {
            setError(
                "অনুগ্রহ করে একটি কারণ নির্বাচন করুন।"
            );
            return;
        }

        if (!description.trim()) {
            setError("সমস্যাটি বর্ণনা করুন।");
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const response = await fetch(
                "/api/report",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        postId,
                        postTitle,
                        postUrl,
                        reason,
                        description:
                            description.trim(),
                        reporterEmail:
                            reporterEmail.trim() ||
                            undefined,
                    }),
                }
            );

            const data = await response
                .json()
                .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error ??
                    "রিপোর্ট পাঠাতে ব্যর্থ হয়েছে।"
                );
            }

            toast.success("রিপোর্ট পাঠানো হয়েছে", {
                description:
                    "আপনার রিপোর্টের জন্য ধন্যবাদ। আমরা শীঘ্রই এটি পর্যালোচনা করব।",
                position: "bottom-center",
            });

            resetForm();
            setOpen(false);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "রিপোর্ট পাঠাতে ব্যর্থ হয়েছে।"
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Report this post"
                className="
                    flex
                    h-[35px]
                    w-[35px]
                    items-center
                    justify-center
                    rounded-lg
                    bg-muted
                    px-1
                    text-muted-foreground
                    transition
                    hover:text-red-600
                "
            >
                <Flag size={18} />
            </button>

            <AlertDialog
                open={open}
                onOpenChange={(next) => {
                    setOpen(next);
                    if (!next) resetForm();
                }}
            >
                <AlertDialogContent>
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                রিপোর্ট করুন
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                এই পোস্টে কোনো সমস্যা
                                থাকলে আমাদের জানান।
                                আমরা যত দ্রুত সম্ভব এটি
                                পর্যালোচনা করব।
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="mt-4 space-y-3">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="report-reason"
                                    className="text-sm font-medium text-foreground"
                                >
                                    কারণ
                                </label>

                                <select
                                    id="report-reason"
                                    value={reason}
                                    onChange={(e) =>
                                        setReason(
                                            e.target
                                                .value
                                        )
                                    }
                                    disabled={
                                        submitting
                                    }
                                    className="w-full rounded-md border border-black/10 bg-background px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        নির্বাচন করুন
                                    </option>

                                    {REPORT_REASONS.map(
                                        (r) => (
                                            <option
                                                key={
                                                    r.value
                                                }
                                                value={
                                                    r.value
                                                }
                                            >
                                                {r.label}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="report-description"
                                    className="text-sm font-medium text-foreground"
                                >
                                    বিবরণ
                                </label>

                                <Textarea
                                    id="report-description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target
                                                .value
                                        )
                                    }
                                    rows={4}
                                    maxLength={2000}
                                    disabled={
                                        submitting
                                    }
                                    placeholder="সমস্যাটি বিস্তারিত লিখুন..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="report-email"
                                    className="text-sm font-medium text-foreground"
                                >
                                    আপনার ইমেইল (ঐচ্ছিক)
                                </label>

                                <input
                                    id="report-email"
                                    type="email"
                                    value={
                                        reporterEmail
                                    }
                                    onChange={(e) =>
                                        setReporterEmail(
                                            e.target
                                                .value
                                        )
                                    }
                                    disabled={
                                        submitting
                                    }
                                    placeholder="you@example.com"
                                    className="w-full rounded-md border border-black/10 bg-background px-3 py-2 text-sm"
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        <AlertDialogFooter className="mt-5 flex flex-row items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setOpen(false)
                                }
                                disabled={submitting}
                            >
                                বাতিল
                            </Button>

                            <Button
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "পাঠানো হচ্ছে..."
                                    : "রিপোর্ট পাঠান"}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}