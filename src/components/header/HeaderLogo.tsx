import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="relative -mt-[5px] inline-flex h-9 w-[130px] shrink-0 items-center lg:h-10 lg:w-[144px]"
            aria-label="জীবন চক্র"
        >
            {/* Light mode logo */}
            <Image
                src="/logo.png"
                alt="জীবন চক্র"
                width={180}
                height={50}
                priority
                className="
                    h-9
                    w-auto
                    object-contain
                    opacity-100
                    dark:opacity-0
                    lg:h-10
                "
            />

            {/* Dark mode logo */}
            <Image
                src="/logo-white.png"
                alt="জীবন চক্র"
                width={180}
                height={50}
                priority
                className="
                    absolute
                    inset-0
                    h-9
                    w-auto
                    object-contain
                    opacity-0
                    dark:opacity-100
                    lg:h-10
                "
            />
        </Link>
    );
}