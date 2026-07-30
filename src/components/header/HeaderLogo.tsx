import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="shrink-0 -mt-[3px]"
            aria-label="জীবন চক্র"
        >
            <Image
                src="/logo.png"
                alt="জীবন চক্র"
                width={180}
                height={50}
                priority
                className="h-9 w-auto lg:h-10"
            />
        </Link>
    );
}