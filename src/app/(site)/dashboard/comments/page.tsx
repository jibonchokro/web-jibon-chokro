import { MessageSquare, MessageSquareOff } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import MyCommentRow from "@/components/comments/MyCommentRow";

import {
    getCurrentUser,
    getMyComments,
} from "@/services/comment.service";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        q?: string;
    }>;
}

const PAGE_SIZE = 10;

function buildPageHref(page: number, search: string) {
    const params = new URLSearchParams();

    if (search) {
        params.set("q", search);
    }

    params.set("page", String(page));

    return `/dashboard/comments?${params.toString()}`;
}

export default async function Page({
    searchParams,
}: PageProps) {
    const user = await getCurrentUser();

    if (!user) {
        redirect(
            "/auth/login?redirect=/dashboard/comments"
        );
    }

    const {
        page: pageParam,
        q,
    } = await searchParams;

    const page = Math.max(
        1,
        Number.parseInt(
            pageParam ?? "1",
            10
        ) || 1
    );

    const search = q?.trim() ?? "";

    const {
        comments,
        total,
    } = await getMyComments(
        user.id,
        {
            page,
            pageSize: PAGE_SIZE,
            search,
        }
    );

    const totalPages = Math.max(
        1,
        Math.ceil(
            total / PAGE_SIZE
        )
    );

    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    // Starting serial number for the current page.
    const startSerial =
        (page - 1) * PAGE_SIZE + 1;

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Comments
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {total > 0
                            ? `${total} comment${total === 1 ? "" : "s"} across all your posts`
                            : "You haven't commented on anything yet"}
                    </p>
                </div>

                {/* Search */}

                <form
                    action="/dashboard/comments"
                    method="GET"
                    className="flex w-full max-w-md items-center gap-2"
                >
                    <input
                        type="search"
                        name="q"
                        defaultValue={search}
                        placeholder="Search your comments..."
                        className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground outline-none transition placeholder:text-muted-foreground focus:border-muted-foreground focus:ring-1 focus:ring-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <button
                        type="submit"
                        className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Search Result Info */}

            {search && (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm">
                    <span className="text-muted-foreground">
                        Showing results for
                    </span>

                    <span className="font-medium text-foreground">
                        &ldquo;{search}&rdquo;
                    </span>

                    <span className="text-muted-foreground">
                        ·
                    </span>

                    <Link
                        href="/dashboard/comments"
                        className="font-medium text-foreground underline-offset-4 transition hover:text-primary hover:underline"
                    >
                        Clear
                    </Link>
                </div>
            )}

            {/* Comments */}

            {comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center shadow-sm">
                    {search ? (
                        <>
                            <div className="mb-3 flex size-11 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                                <MessageSquareOff
                                    size={21}
                                />
                            </div>

                            <p className="text-sm font-medium text-foreground">
                                No comments match
                                &ldquo;{search}&rdquo;
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Try searching with a
                                different keyword.
                            </p>

                            <Link
                                href="/dashboard/comments"
                                className="mt-4 text-sm font-medium text-foreground underline-offset-4 transition hover:text-primary hover:underline"
                            >
                                Clear search
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="mb-3 flex size-11 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                                <MessageSquare
                                    size={21}
                                />
                            </div>

                            <p className="text-sm font-medium text-foreground">
                                You haven&apos;t
                                commented on anything
                                yet
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Your comments will appear
                                here.
                            </p>

                            <Link
                                href="/posts"
                                className="mt-4 text-sm font-medium text-foreground underline-offset-4 transition hover:text-primary hover:underline"
                            >
                                Browse posts
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    {comments.map(
                        (comment, index) => (
                            <MyCommentRow
                                key={comment.id}
                                comment={comment}
                                serial={
                                    startSerial + index
                                }
                            />
                        )
                    )}
                </div>
            )}

            {/* Pagination */}

            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
                    {/* Previous */}

                    {hasPrev ? (
                        <Link
                            href={buildPageHref(
                                page - 1,
                                search
                            )}
                            className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                        >
                            Previous
                        </Link>
                    ) : (
                        <span className="inline-flex h-9 items-center rounded-lg border border-border bg-muted px-3.5 text-sm font-medium text-muted-foreground opacity-50">
                            Previous
                        </span>
                    )}

                    {/* Page */}

                    <span className="text-sm text-muted-foreground">
                        Page{" "}
                        <span className="font-medium text-foreground">
                            {page}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-foreground">
                            {totalPages}
                        </span>
                    </span>

                    {/* Next */}

                    {hasNext ? (
                        <Link
                            href={buildPageHref(
                                page + 1,
                                search
                            )}
                            className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                        >
                            Next
                        </Link>
                    ) : (
                        <span className="inline-flex h-9 items-center rounded-lg border border-border bg-muted px-3.5 text-sm font-medium text-muted-foreground opacity-50">
                            Next
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}