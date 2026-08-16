"use client";

import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { updateProfileName } from "@/actions/profile";

interface Props {
    initialName: string;
}

export default function EditProfileForm({
    initialName,
}: Props) {
    const router = useRouter();

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const result =
                await updateProfileName(name);

            if (!result.success) {
                toast.error("আপডেট ব্যর্থ হয়েছে", {
                    description: result.error,
                    position: "bottom-center",
                });

                return;
            }

            toast.success("প্রোফাইল আপডেট হয়েছে", {
                position: "bottom-center",
            });

            setEditing(false);
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

    if (!editing) {
        return (
            <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
                <Pencil size={15} />
                নাম পরিবর্তন করুন
            </button>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                disabled={loading}
                autoFocus
                className="h-11 w-full max-w-xs rounded-lg border border-black/10 bg-background px-4 text-sm outline-none transition focus:border-black disabled:opacity-60 sm:w-auto"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading && (
                        <Loader2 className="size-4 animate-spin" />
                    )}
                    সংরক্ষণ করুন
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setEditing(false);
                        setName(initialName);
                    }}
                    disabled={loading}
                    className="rounded-lg border border-black/10 px-4 py-2 text-sm transition hover:bg-muted disabled:opacity-50"
                >
                    বাতিল
                </button>
            </div>
        </form>
    );
}