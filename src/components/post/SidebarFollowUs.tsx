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
            href: "https://facebook.com/jibonchokro",
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
        <section className="rounded-xl border border-black/10 bg-white p-5">

            <h2 className="mb-4 text-base font-semibold tracking-tight text-foreground">
                আমাদের অনুসরণ করুন
            </h2>

            <div className="grid grid-cols-4 gap-4">

                {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.name}
                            className="
                                group
                                flex
                                aspect-square
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-black/10
                                bg-white
                                text-muted-foreground
                                transition-all
                                duration-200
                                hover:bg-muted
                                hover:text-foreground
                            "
                        >
                            <Icon
                                size={24}
                                className="transition-transform duration-200 group-hover:scale-110"
                            />
                        </Link>
                    );
                })}

            </div>

        </section>
    );
}