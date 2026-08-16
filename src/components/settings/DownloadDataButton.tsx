"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { exportUserData } from "@/actions/profile";

export default function DownloadDataButton() {
    const [loading, setLoading] = useState(false);

    async function handleDownload() {
        if (loading) return;

        setLoading(true);

        try {
            const result = await exportUserData();

            if (!result.success) {
                toast.error(
                    "ডাটা এক্সপোর্ট ব্যর্থ হয়েছে",
                    {
                        description: result.error,
                        position: "bottom-center",
                    }
                );

                return;
            }

            const blob = new Blob(
                [result.data],
                { type: "application/json" }
            );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;
            link.download = `jibonchokro-data-${Date.now()}.json`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
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
        <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? (
                <Loader2
                    size={16}
                    className="animate-spin"
                />
            ) : (
                <Download size={16} />
            )}
            Download My Data
        </button>
    );
}