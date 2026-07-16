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
            color: "hover:bg-gray-100 hover:border-gray-150",
        },
        {
            name: "X",
            href: "https://x.com/jibonchokro",
            icon: FaXTwitter,
            color: "hover:bg-gray-100 hover:border-gray-150",
        },
        {
            name: "Instagram",
            href: "https://instagram.com/jibonchokro",
            icon: FaInstagram,
            color: "hover:bg-gray-100 hover:border-gray-150",
        },
        {
            name: "YouTube",
            href: "https://youtube.com/@jibonchokro",
            icon: FaYoutube,
            color: "hover:bg-gray-100 hover:border-gray-150",
        },
    ];

    return (
        <section className="rounded-md border border-[#e7e7e7] bg-white p-6">

            <h2 className="mb-4 text-lg font-bold text-gray-900">
                আমাদের অনুসরণ করুন
            </h2>

            <div className="grid grid-cols-4 gap-3">

                {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.name}
                            className={`
                                group
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-50
                                text-gray-600
                                transition-all
                                duration-200
                                hover:text-white
                                hover:shadow-sm
                                ${item.color}
                            `}
                        >
                            <Icon
                                size={20}
                                className="transition-transform duration-200 group-hover:scale-110"
                            />
                        </Link>
                    );
                })}

            </div>

        </section>
    );
}