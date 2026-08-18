import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

export default function SidebarFollowUs() {
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://www.facebook.com/profile.php?id=61553329931242",
            icon: FaFacebookF,
        },
        {
            name: "X",
            href: "https://x.com/jibonchokro",
            icon: FaXTwitter,
        },
        {
            name: "Instagram",
            href: "https://instagram.com/jibonchokro",
            icon: FaInstagram,
        },
        {
            name: "YouTube",
            href: "https://youtube.com/@jibonchokro",
            icon: FaYoutube,
        },
    ];

    return (
        <section className="rounded-none border border-border bg-card p-4 shadow-custom sm:rounded-xl lg:rounded-xl">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    অনুসরণ করুন:
                </h2>

                <div className="flex items-center gap-2">
                    {socialLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.name}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                            >
                                <Icon size={16} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}