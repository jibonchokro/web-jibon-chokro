"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="max-w-lg text-center">
                <h1 className="text-5xl font-bold text-red-600">
                    কিছু একটা ভুল হয়েছে
                </h1>

                <p className="mt-5 text-gray-600">
                    অনাকাঙ্ক্ষিত একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
                </p>

                <button
                    onClick={reset}
                    className="mt-8 rounded-lg bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
                >
                    আবার চেষ্টা করুন
                </button>
            </div>
        </main>
    );
}