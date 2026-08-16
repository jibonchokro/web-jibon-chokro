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
                className="h-10 w-10 rounded-xl border border-border object-cover lg:rounded-full"
            />
        );
    }

    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-sm font-semibold text-white lg:rounded-full">
            {name.charAt(0).toUpperCase()}
        </div>
    );
}