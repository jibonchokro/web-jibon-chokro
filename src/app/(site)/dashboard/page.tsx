import {
    Bookmark,
    ChevronRight,
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
            title: "আমার কমেন্টস",
            description: "আপনার করা সকল কমেন্টস দেখুন।",
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
        <div className="space-y-8">
            {/* Header */}

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    ড্যাশবোর্ড
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    আপনার অ্যাকাউন্ট, বুকমার্ক, লাইক, মন্তব্য এবং
                    ব্যক্তিগত সেটিংস এখান থেকে সহজেই পরিচালনা করুন।
                </p>
            </div>

            {/* Cards */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-xs"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
                                    <Icon size={20} />
                                </div>

                                <ChevronRight
                                    size={18}
                                    className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                                />
                            </div>

                            <div className="mt-5">
                                <h2 className="text-lg font-semibold tracking-tight text-foreground">
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