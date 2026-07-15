import {
    Bookmark,
    Heart,
    MessageCircle,
    Settings,
    User,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const cards = [
        {
            title: "আমার প্রোফাইল",
            description: "আপনার ব্যক্তিগত তথ্য দেখুন ও সম্পাদনা করুন।",
            href: "/dashboard/profile",
            icon: User,
        },
        {
            title: "বুকমার্ক",
            description: "সংরক্ষিত লেখাগুলো দেখুন।",
            href: "/dashboard/bookmarks",
            icon: Bookmark,
        },
        {
            title: "লাইক করা লেখা",
            description: "আপনার পছন্দের লেখাগুলো এক জায়গায়।",
            href: "/dashboard/likes",
            icon: Heart,
        },
        {
            title: "আমার মন্তব্য",
            description: "আপনার করা সকল মন্তব্য দেখুন।",
            href: "/dashboard/comments",
            icon: MessageCircle,
        },
        {
            title: "সেটিংস",
            description: "অ্যাকাউন্ট ও পছন্দসমূহ পরিচালনা করুন।",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ];

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">
                    ড্যাশবোর্ড
                </h1>

                <p className="mt-2 text-gray-600">
                    জীবন চক্রে স্বাগতম। এখান থেকে আপনার প্রোফাইল,
                    বুকমার্ক, লাইক, মন্তব্য এবং অ্যাকাউন্ট সেটিংস
                    পরিচালনা করতে পারবেন।
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="
                                group
                                rounded-2xl
                                border
                                border-[#e7e7e7]
                                bg-white
                                p-6
                                transition-all
                                hover:-translate-y-1
                                hover:border-green-600
                                hover:shadow-lg
                            "
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                                <Icon size={24} />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                {card.title}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                {card.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}