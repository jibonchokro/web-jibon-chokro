import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <figure className="my-10">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || ""}
                        width={1200}
                        height={675}
                        className="h-auto w-full object-cover"
                    />
                </div>

                {value.caption && (
                    <figcaption className="mt-3 text-center text-sm text-gray-500">
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
    },

    block: {
        h1: ({ children }) => (
            <h1 className="mt-12 mb-6 text-4xl font-bold leading-tight text-gray-900">
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2 className="mt-12 mb-5 text-3xl font-bold text-gray-900">
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 className="mt-10 mb-4 text-2xl font-semibold text-gray-900">
                {children}
            </h3>
        ),

        h4: ({ children }) => (
            <h4 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
                {children}
            </h4>
        ),

        normal: ({ children }) => (
            <p className="my-7 text-[18px] leading-9 text-gray-700">
                {children}
            </p>
        ),

        blockquote: ({ children }) => (
            <blockquote className="my-8 rounded-xl border-l-4 border-green-600 bg-green-50 px-6 py-4 italic">
                {children}
            </blockquote>
        ),
    },

    marks: {
        strong: ({ children }) => (
            <strong className="font-bold text-gray-900">
                {children}
            </strong>
        ),

        em: ({ children }) => (
            <em className="italic">
                {children}
            </em>
        ),

        underline: ({ children }) => (
            <span className="underline">
                {children}
            </span>
        ),

        strike: ({ children }) => (
            <span className="line-through">
                {children}
            </span>
        ),

        link: ({ children, value }) => {
            const href = value?.href ?? "";

            const external = href.startsWith("http");

            return (
                <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="font-medium text-green-700 underline underline-offset-4 transition hover:text-green-800"
                >
                    {children}
                </Link>
            );
        },
    },

    list: {
        bullet: ({ children }) => (
            <ul className="my-7 list-disc space-y-3 pl-6">
                {children}
            </ul>
        ),

        number: ({ children }) => (
            <ol className="my-7 list-decimal space-y-3 pl-6">
                {children}
            </ol>
        ),
    },

    listItem: {
        bullet: ({ children }) => (
            <li className="leading-8 text-gray-700">
                {children}
            </li>
        ),

        number: ({ children }) => (
            <li className="leading-8 text-gray-700">
                {children}
            </li>
        ),
    },
};