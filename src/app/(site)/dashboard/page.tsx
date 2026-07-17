import {
    Bookmark,
    ChevronRight,
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
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    ড্যাশবোর্ড
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    আপনার অ্যাকাউন্ট, বুকমার্ক, লাইক, মন্তব্য এবং
                    ব্যক্তিগত সেটিংস এখান থেকে সহজেই পরিচালনা করুন।
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="
                                group
                                rounded-xl
                                border
                                border-black/10
                                bg-card
                                p-6
                                transition-all
                                hover:-translate-y-0.5
                                hover:border-gray-300
                                hover:shadow-sm
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/10 bg-muted text-muted-foreground transition-colors group-hover:bg-gray-100 group-hover:text-gray-900">
                                    <Icon size={20} />
                                </div>

                                <ChevronRight
                                    size={18}
                                    className="text-gray-400 transition-transform group-hover:translate-x-1"
                                />
                            </div>

                            <div className="mt-5">
                                <h2 className="text-lg font-semibold tracking-tight">
                                    {card.title}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {card.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}