"use client";

import Image from "next/image";

interface Props {
    name: string;
    avatar?: string | null;
}

export default function UserAvatar({
    name,
    avatar,
}: Props) {
    if (avatar) {
        return (
            <Image
                src={avatar}
                alt={name}
                width={40}
                height={40}
                className="rounded-full border border-gray-200 object-cover"
            />
        );
    }

    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white">
            {name.charAt(0).toUpperCase()}
        </div>
    );
}