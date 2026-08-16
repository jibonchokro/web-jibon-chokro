import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <figure className="my-8 sm:my-10">
                <div className="overflow-hidden rounded-xl">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || ""}
                        width={1200}
                        height={800}
                        className="h-auto w-full object-contain"
                    />
                </div>

                {value.caption && (
                    <figcaption className="mt-3 text-center text-sm leading-6 text-muted-foreground">
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
    },

    block: {
        h1: ({ children }) => (
            <h1 className="mt-10 mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:mt-12 sm:mb-6 sm:text-4xl">
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:mt-12 sm:mb-5 sm:text-3xl">
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 className="mt-8 mb-4 text-xl font-bold leading-tight text-foreground sm:mt-10 sm:text-2xl">
                {children}
            </h3>
        ),

        h4: ({ children }) => (
            <h4 className="mt-7 mb-3 text-lg font-semibold leading-tight text-foreground sm:mt-8 sm:text-xl">
                {children}
            </h4>
        ),

        normal: ({ children }) => (
            <p className="my-4 text-[17px] leading-8 tracking-normal [word-spacing:0.1em] text-foreground/85 sm:text-[18px] sm:leading-9">
                {children}
            </p>
        ),

        blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-xl border-l-4 border-green-600 bg-green-50 px-5 py-4 text-[17px] leading-8 text-green-950 sm:px-6 sm:py-5 sm:text-[18px] sm:leading-9 dark:border-green-400 dark:bg-green-950/30 dark:text-green-100">
                {children}
            </blockquote>
        ),
    },

    marks: {
        strong: ({ children }) => (
            <strong className="font-bold text-foreground">
                {children}
            </strong>
        ),

        em: ({ children }) => (
            <em className="italic">
                {children}
            </em>
        ),

        underline: ({ children }) => (
            <span className="underline underline-offset-2">
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

            const external =
                href.startsWith("http://") ||
                href.startsWith("https://");

            return (
                <Link
                    href={href}
                    target={
                        external
                            ? "_blank"
                            : undefined
                    }
                    rel={
                        external
                            ? "noopener noreferrer"
                            : undefined
                    }
                    className="font-medium text-green-700 underline decoration-green-700/40 underline-offset-4 transition-colors hover:text-green-800 hover:decoration-green-800 dark:text-green-400 dark:decoration-green-400/40 dark:hover:text-green-300 dark:hover:decoration-green-300"
                >
                    {children}
                </Link>
            );
        },
    },

    list: {
        bullet: ({ children }) => (
            <ul className="my-6 list-disc space-y-2.5 pl-6 text-[17px] leading-8 text-foreground/85 sm:my-7 sm:text-[18px] sm:leading-9">
                {children}
            </ul>
        ),

        number: ({ children }) => (
            <ol className="my-6 list-decimal space-y-2.5 pl-6 text-[17px] leading-8 text-foreground/85 sm:my-7 sm:text-[18px] sm:leading-9">
                {children}
            </ol>
        ),
    },

    listItem: {
        bullet: ({ children }) => (
            <li className="pl-1">
                {children}
            </li>
        ),

        number: ({ children }) => (
            <li className="pl-1">
                {children}
            </li>
        ),
    },
};