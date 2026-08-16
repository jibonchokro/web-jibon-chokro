"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

interface Props {
    currentEmail: string;
}

export default function ChangeEmailForm({
    currentEmail,
}: Props) {
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState(currentEmail);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (loading) return;

        if (email.trim() === currentEmail) {
            setEditing(false);
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();

            const { error } =
                await supabase.auth.updateUser({
                    email: email.trim(),
                });

            if (error) {
                toast.error(
                    "ইমেইল পরিবর্তন ব্যর্থ হয়েছে",
                    {
                        description: error.message,
                        position: "bottom-center",
                    }
                );

                return;
            }

            toast.success(
                "নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে",
                {
                    description:
                        "নতুন ইমেইলে পাঠানো লিংকে ক্লিক করে পরিবর্তন সম্পন্ন করুন।",
                    position: "bottom-center",
                }
            );

            setEditing(false);
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

    if (!editing) {
        return (
            <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
                পরিবর্তন করুন
            </button>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
        >
            <input
                type="email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                disabled={loading}
                autoFocus
                className="h-10 w-full max-w-xs rounded-lg border border-black/10 bg-background px-3 text-sm outline-none transition focus:border-black disabled:opacity-60"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading && (
                        <Loader2 className="size-4 animate-spin" />
                    )}
                    সংরক্ষণ
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setEditing(false);
                        setEmail(currentEmail);
                    }}
                    disabled={loading}
                    className="rounded-lg border border-black/10 px-3 py-2 text-sm transition hover:bg-muted disabled:opacity-50"
                >
                    বাতিল
                </button>
            </div>
        </form>
    );
}