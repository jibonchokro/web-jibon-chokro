import type { Metadata } from "next";
import Link from "next/link";

import PostCard from "@/components/post/PostCard";
import Container from "@/components/ui/Container";
import { searchPosts } from "@/services/search.service";

interface Props {
    searchParams: Promise<{
        q?: string;
    }>;
}

export const metadata: Metadata = {
    title: "সার্চ",
    description: "জীবন চক্রে আপনার পছন্দের লেখা খুঁজুন।",
};

export default async function SearchPage({
    searchParams,
}: Props) {
    const { q } = await searchParams;

    const query = q?.trim() ?? "";

    const posts =
        query.length >= 2
            ? await searchPosts(query)
            : [];

    return (
        <main className="py-16">
            <Container>
                <header className="mb-10">

                    <h1 className="text-4xl font-bold">
                        সার্চ ফলাফল
                    </h1>

                    {query ? (
                        <p className="mt-3 text-gray-600">
                            "<strong>{query}</strong>" এর জন্য{" "}
                            <strong>{posts.length}</strong> টি ফলাফল পাওয়া গেছে।
                        </p>
                    ) : (
                        <p className="mt-3 text-gray-600">
                            উপরের সার্চ বক্স ব্যবহার করে আপনার পছন্দের লেখা খুঁজুন।
                        </p>
                    )}

                </header>

                {query.length < 2 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">

                        <h2 className="text-2xl font-semibold">
                            কিছু লিখে সার্চ করুন
                        </h2>

                        <p className="mt-3 text-gray-500">
                            অন্তত ২টি অক্ষর লিখুন।
                        </p>

                    </div>
                )}

                {query.length >= 2 && posts.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">

                        <h2 className="text-2xl font-semibold">
                            কোনো ফলাফল পাওয়া যায়নি
                        </h2>

                        <p className="mt-3 text-gray-500">
                            অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন।
                        </p>

                        <Link
                            href="/posts"
                            className="mt-8 inline-flex rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
                        >
                            সব লেখা দেখুন
                        </Link>

                    </div>
                )}

                {posts.length > 0 && (
                    <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))}

                    </section>
                )}

            </Container>
        </main>
    );
}