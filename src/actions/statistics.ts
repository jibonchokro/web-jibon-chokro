"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type ViewsRangePreset =
    | "today"
    | "week"
    | "month"
    | "year"
    | "all"
    | "custom";

export interface DailyViewPoint {
    date: string;
    views: number;
}

export interface ViewsRangeSuccess {
    success: true;
    totalViews: number;
    daily: DailyViewPoint[];
    startDate: string | null;
    endDate: string;
    dailyIsPartial: boolean;
}

export interface ViewsRangeFailure {
    success: false;
    error: string;
}

export type ViewsRangeResult =
    | ViewsRangeSuccess
    | ViewsRangeFailure;

const DAILY_ROW_CAP = 20000;
const PAGE_SIZE = 1000;

function toDateKey(date: Date): string {
    return date.toISOString().slice(0, 10);
}

async function requireAdmin(): Promise<
    | { ok: true }
    | { ok: false; error: string }
> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            ok: false,
            error: "Unauthorized",
        };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if ((profile?.role ?? "user") !== "admin") {
        return {
            ok: false,
            error: "Forbidden",
        };
    }

    return { ok: true };
}

/**
 * Exact row count for a date range — uses `count: 'exact', head:
 * true`, a server-side aggregate that is NOT subject to
 * PostgREST's default 1000-row response cap. Always accurate
 * regardless of how many view events exist in the range.
 */
async function countViewsInRange(
    startDate: string | null,
    endDate: string
): Promise<number> {
    let query = supabaseAdmin
        .from("post_view_events")
        .select("id", {
            count: "exact",
            head: true,
        })
        .lte("view_date", endDate);

    if (startDate) {
        query = query.gte("view_date", startDate);
    }

    const { count, error } = await query;

    if (error) {
        throw error;
    }

    return count ?? 0;
}

/**
 * Fetches individual view_date rows for the daily chart, paginated
 * past the 1000-row default cap. Stops at DAILY_ROW_CAP as a safety
 * ceiling — for very high-traffic ranges the chart may then be
 * based on a partial sample even though countViewsInRange (above)
 * remains exact. Callers get `dailyIsPartial` to know when that
 * happened.
 */
async function fetchViewDatesInRange(
    startDate: string | null,
    endDate: string
): Promise<{
    dates: string[];
    isPartial: boolean;
}> {
    let offset = 0;
    const dates: string[] = [];

    while (true) {
        let query = supabaseAdmin
            .from("post_view_events")
            .select("view_date")
            .lte("view_date", endDate)
            .order("view_date", {
                ascending: true,
            })
            .range(
                offset,
                offset + PAGE_SIZE - 1
            );

        if (startDate) {
            query = query.gte(
                "view_date",
                startDate
            );
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        const rows = data ?? [];

        for (const row of rows) {
            dates.push(row.view_date as string);
        }

        if (
            rows.length < PAGE_SIZE ||
            dates.length >= DAILY_ROW_CAP
        ) {
            return {
                dates,
                isPartial:
                    dates.length >= DAILY_ROW_CAP &&
                    rows.length === PAGE_SIZE,
            };
        }

        offset += PAGE_SIZE;
    }
}

export async function getViewsInRange(
    preset: ViewsRangePreset,
    customStart?: string,
    customEnd?: string
): Promise<ViewsRangeResult> {
    const auth = await requireAdmin();

    if (!auth.ok) {
        return {
            success: false,
            error: auth.error,
        };
    }

    const today = new Date();
    const todayKey = toDateKey(today);

    let startDate: string | null = null;
    let endDate = todayKey;

    switch (preset) {
        case "today": {
            startDate = todayKey;
            break;
        }

        case "week": {
            const start = new Date(today);
            start.setDate(start.getDate() - 6);
            startDate = toDateKey(start);
            break;
        }

        case "month": {
            const start = new Date(today);
            start.setDate(start.getDate() - 29);
            startDate = toDateKey(start);
            break;
        }

        case "year": {
            const start = new Date(today);
            start.setDate(start.getDate() - 364);
            startDate = toDateKey(start);
            break;
        }

        case "custom": {
            if (!customStart || !customEnd) {
                return {
                    success: false,
                    error: "শুরু এবং শেষ তারিখ দিন।",
                };
            }

            if (customStart > customEnd) {
                return {
                    success: false,
                    error:
                        "শুরুর তারিখ শেষ তারিখের পরে হতে পারবে না।",
                };
            }

            startDate = customStart;
            endDate = customEnd;
            break;
        }

        case "all":
        default: {
            startDate = null;
            break;
        }
    }

    try {
        // "All time" totals come from the pre-aggregated
        // post_views table (one row per post) rather than
        // counting every event ever — much cheaper, and a daily
        // breakdown over a site's entire history isn't very
        // useful to chart anyway.
        if (preset === "all") {
            const { data: totals, error } =
                await supabaseAdmin
                    .from("post_views")
                    .select("views");

            if (error) {
                throw error;
            }

            const totalViews = (totals ?? []).reduce(
                (sum, row) =>
                    sum + Number(row.views ?? 0),
                0
            );

            return {
                success: true,
                totalViews,
                daily: [],
                startDate: null,
                endDate: todayKey,
                dailyIsPartial: false,
            };
        }

        const [totalViews, dateResult] =
            await Promise.all([
                countViewsInRange(
                    startDate,
                    endDate
                ),
                fetchViewDatesInRange(
                    startDate,
                    endDate
                ),
            ]);

        const dailyMap = new Map<
            string,
            number
        >();

        for (const date of dateResult.dates) {
            dailyMap.set(
                date,
                (dailyMap.get(date) ?? 0) + 1
            );
        }

        const daily = Array.from(
            dailyMap.entries()
        )
            .map(([date, views]) => ({
                date,
                views,
            }))
            .sort((a, b) =>
                a.date.localeCompare(b.date)
            );

        return {
            success: true,
            totalViews,
            daily,
            startDate,
            endDate,
            dailyIsPartial: dateResult.isPartial,
        };
    } catch (error) {
        console.error(
            "getViewsInRange error:",
            error
        );

        return {
            success: false,
            error: "ভিউ ডাটা আনতে ব্যর্থ হয়েছে।",
        };
    }
}