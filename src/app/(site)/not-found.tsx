import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center p-6">
            <div className="max-w-lg text-center">
                <h1 className="text-7xl font-bold text-green-700">
                    404
                </h1>

                <h2 className="mt-6 text-3xl font-bold">
                    পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                </h2>

                <p className="mt-4 text-gray-600">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয় মুছে ফেলা হয়েছে,
                    নয়তো এর ঠিকানা পরিবর্তন করা হয়েছে।
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex rounded-lg bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
                >
                    হোমপেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}