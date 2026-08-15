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

    const { page: pageParam, q } = await searchParams;

    const page = Math.max(
        1,
        Number.parseInt(pageParam ?? "1", 10) || 1
    );

    const search = q?.trim() ?? "";

    const { comments, total } = await getMyComments(
        user.id,
        {
            page,
            pageSize: PAGE_SIZE,
            search,
        }
    );

    const totalPages = Math.max(
        1,
        Math.ceil(total / PAGE_SIZE)
    );

    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Comments
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {total > 0
                            ? `${total} comment${total === 1
                                ? ""
                                : "s"
                            } across all your posts`
                            : "You haven't commented on anything yet"}
                    </p>
                </div>

                <form
                    action="/dashboard/comments"
                    method="GET"
                    className="flex w-full max-w-sm items-center gap-2 sm:w-auto"
                >
                    <input
                        type="search"
                        name="q"
                        defaultValue={search}
                        placeholder="Search your comments..."
                        className="w-full min-w-0 rounded-lg border border-black/10 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    />

                    <button
                        type="submit"
                        className="shrink-0 rounded-lg border border-black/10 bg-muted px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
                    >
                        Search
                    </button>
                </form>
            </div>

            {search && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                        Showing results for
                        &ldquo;{search}&rdquo;
                    </span>

                    <Link
                        href="/dashboard/comments"
                        className="font-medium text-foreground hover:underline"
                    >
                        Clear
                    </Link>
                </div>
            )}

            {comments.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-black/10 bg-white px-6 py-16 text-center shadow-custom">
                    {search ? (
                        <>
                            <MessageSquareOff
                                size={32}
                                className="text-muted-foreground"
                            />

                            <p className="text-sm font-medium text-foreground">
                                No comments match
                                &ldquo;{search}&rdquo;
                            </p>

                            <Link
                                href="/dashboard/comments"
                                className="text-sm font-medium text-foreground hover:underline"
                            >
                                Clear search
                            </Link>
                        </>
                    ) : (
                        <>
                            <MessageSquare
                                size={32}
                                className="text-muted-foreground"
                            />

                            <p className="text-sm font-medium text-foreground">
                                You haven&apos;t
                                commented on anything
                                yet
                            </p>

                            <Link
                                href="/posts"
                                className="text-sm font-medium text-foreground hover:underline"
                            >
                                Browse posts
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    {comments.map((comment) => (
                        <MyCommentRow
                            key={comment.id}
                            comment={comment}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-3 pt-2">
                    {hasPrev ? (
                        <Link
                            href={buildPageHref(
                                page - 1,
                                search
                            )}
                            className="rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                        >
                            Previous
                        </Link>
                    ) : (
                        <span className="rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium text-muted-foreground opacity-50">
                            Previous
                        </span>
                    )}

                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>

                    {hasNext ? (
                        <Link
                            href={buildPageHref(
                                page + 1,
                                search
                            )}
                            className="rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                        >
                            Next
                        </Link>
                    ) : (
                        <span className="rounded-lg border border-black/10 bg-background px-4 py-2 text-sm font-medium text-muted-foreground opacity-50">
                            Next
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}