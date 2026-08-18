"use client";

import {
    Calendar,
    Eye,
    Loader2,
    TrendingUp,
    Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

import {
    getViewsInRange,
    type ViewsRangePreset,
} from "@/actions/statistics";

const PRESETS: {
    value: ViewsRangePreset;
    label: string;
}[] = [
        { value: "today", label: "আজ" },
        { value: "week", label: "৭ দিন" },
        { value: "month", label: "৩০ দিন" },
        { value: "year", label: "১ বছর" },
        { value: "all", label: "সর্বমোট" },
        { value: "custom", label: "কাস্টম" },
    ];

interface DailyPoint {
    date: string;
    views: number;
}

const chartConfig = {
    views: {
        label: "ভিউ",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

/**
 * The server only returns dates that actually had a view.
 * Days with zero views are absent from the response.
 *
 * This fills every date in [startDate, endDate] with 0
 * where the server didn't report any views.
 */
function fillDateGaps(
    daily: DailyPoint[],
    startDate: string | null,
    endDate: string
): DailyPoint[] {
    if (!startDate || !endDate) {
        return daily;
    }

    const viewsByDate = new Map(
        daily.map((item) => [item.date, item.views])
    );

    const filled: DailyPoint[] = [];

    const cursor = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T00:00:00Z`);

    while (cursor.getTime() <= end.getTime()) {
        const key = cursor.toISOString().slice(0, 10);

        filled.push({
            date: key,
            views: viewsByDate.get(key) ?? 0,
        });

        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return filled;
}

function formatShortDate(dateStr: string): string {
    const [, month, day] = dateStr.split("-");
    return `${day}/${month}`;
}

function formatFullDate(dateStr: string): string {
    return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString(
        "bn-BD",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );
}

export default function ViewsAnalytics() {
    const [preset, setPreset] =
        useState<ViewsRangePreset>("month");

    const [customStart, setCustomStart] =
        useState("");

    const [customEnd, setCustomEnd] =
        useState("");

    const [totalViews, setTotalViews] =
        useState<number | null>(null);

    const [rawDaily, setRawDaily] =
        useState<DailyPoint[]>([]);

    const [range, setRange] = useState<{
        startDate: string | null;
        endDate: string;
    }>({
        startDate: null,
        endDate: "",
    });

    const [dailyIsPartial, setDailyIsPartial] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [isPending, startTransition] =
        useTransition();

    function loadRange(
        selectedPreset: ViewsRangePreset,
        start?: string,
        end?: string
    ) {
        setError(null);

        startTransition(async () => {
            const result = await getViewsInRange(
                selectedPreset,
                start,
                end
            );

            if (!result.success) {
                setError(result.error);
                return;
            }

            setTotalViews(result.totalViews);
            setRawDaily(result.daily);

            setRange({
                startDate: result.startDate,
                endDate: result.endDate,
            });

            setDailyIsPartial(
                result.dailyIsPartial
            );
        });
    }

    useEffect(() => {
        loadRange("month");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handlePresetClick(
        value: ViewsRangePreset
    ) {
        setPreset(value);

        if (value !== "custom") {
            loadRange(value);
        }
    }

    function handleCustomSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (!customStart || !customEnd) {
            setError(
                "শুরু এবং শেষ তারিখ দিন।"
            );
            return;
        }

        if (customStart > customEnd) {
            setError(
                "শুরুর তারিখ শেষ তারিখের পরে হতে পারবে না।"
            );
            return;
        }

        loadRange(
            "custom",
            customStart,
            customEnd
        );
    }

    const daily = useMemo(
        () =>
            fillDateGaps(
                rawDaily,
                range.startDate,
                range.endDate
            ),
        [rawDaily, range]
    );

    const {
        averagePerDay,
        peakDay,
    } = useMemo(() => {
        if (daily.length === 0) {
            return {
                averagePerDay: 0,
                peakDay: null as DailyPoint | null,
            };
        }

        const sum = daily.reduce(
            (total, item) =>
                total + item.views,
            0
        );

        const peak = daily.reduce(
            (best, item) =>
                item.views > best.views
                    ? item
                    : best,
            daily[0]
        );

        return {
            averagePerDay: Math.round(
                sum / daily.length
            ),
            peakDay: peak,
        };
    }, [daily]);

    /**
     * Avoid a cluttered x-axis on long ranges.
     * Shows roughly 8 ticks regardless of range length.
     */
    const tickInterval = Math.max(
        0,
        Math.ceil(daily.length / 8) - 1
    );

    return (
        <section className="overflow-hidden rounded-xl border border-border bg-muted/40">
            {/* Header */}

            <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-semibold tracking-tight text-foreground">
                        ভিউ বিশ্লেষণ
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                        সময়সীমা অনুযায়ী ভিউয়ের
                        পরিসংখ্যান দেখুন
                    </p>
                </div>

                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Eye size={17} />
                </div>
            </div>

            <div className="p-5">
                {/* Preset buttons */}

                <div className="flex flex-wrap gap-2">
                    {PRESETS.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() =>
                                handlePresetClick(
                                    item.value
                                )
                            }
                            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${preset === item.value
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:bg-muted"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Custom range */}

                {preset === "custom" && (
                    <form
                        onSubmit={
                            handleCustomSubmit
                        }
                        className="mt-4 flex flex-wrap items-end gap-3"
                    >
                        <div>
                            <label className="mb-1.5 block text-xs text-muted-foreground">
                                শুরুর তারিখ
                            </label>

                            <input
                                type="date"
                                value={customStart}
                                onChange={(e) =>
                                    setCustomStart(
                                        e.target.value
                                    )
                                }
                                className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs text-muted-foreground">
                                শেষ তারিখ
                            </label>

                            <input
                                type="date"
                                value={customEnd}
                                onChange={(e) =>
                                    setCustomEnd(
                                        e.target.value
                                    )
                                }
                                className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending && (
                                <Loader2
                                    size={14}
                                    className="animate-spin"
                                />
                            )}

                            প্রয়োগ করুন
                        </button>
                    </form>
                )}

                {/* Error */}

                {error && (
                    <p className="mt-4 text-sm text-destructive">
                        {error}
                    </p>
                )}

                {/* Stats */}

                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                        <Calendar
                            size={18}
                            className="text-muted-foreground"
                        />

                        {isPending ? (
                            <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
                        ) : (
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                {(
                                    totalViews ?? 0
                                ).toLocaleString(
                                    "bn-BD"
                                )}

                                <span className="ml-2 text-sm font-normal text-muted-foreground">
                                    টি ভিউ
                                </span>
                            </p>
                        )}
                    </div>

                    {daily.length > 0 &&
                        !isPending && (
                            <>
                                {/* Average */}

                                <div className="flex items-center gap-2 text-sm">
                                    <TrendingUp
                                        size={16}
                                        className="text-muted-foreground"
                                    />

                                    <span className="text-muted-foreground">
                                        গড়/দিন:
                                    </span>

                                    <span className="font-semibold text-foreground">
                                        {averagePerDay.toLocaleString(
                                            "bn-BD"
                                        )}
                                    </span>
                                </div>

                                {/* Peak */}

                                {peakDay &&
                                    peakDay.views >
                                    0 && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Zap
                                                size={16}
                                                className="text-muted-foreground"
                                            />

                                            <span className="text-muted-foreground">
                                                সর্বোচ্চ:
                                            </span>

                                            <span className="font-semibold text-foreground">
                                                {peakDay.views.toLocaleString(
                                                    "bn-BD"
                                                )}
                                            </span>

                                            <span className="text-muted-foreground">
                                                (
                                                {formatShortDate(
                                                    peakDay.date
                                                )}
                                                )
                                            </span>
                                        </div>
                                    )}
                            </>
                        )}
                </div>

                {/* Daily chart */}

                {daily.length > 0 ? (
                    <div className="mt-6">
                        <ChartContainer
                            config={chartConfig}
                            className="h-64 w-full aspect-auto"
                        >
                            <AreaChart
                                data={daily}
                                margin={{
                                    top: 8,
                                    right: 8,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="viewsFill"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-views)"
                                            stopOpacity={
                                                0.35
                                            }
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-views)"
                                            stopOpacity={
                                                0.02
                                            }
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    stroke="hsl(var(--border))"
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="date"
                                    tickFormatter={
                                        formatShortDate
                                    }
                                    interval={
                                        tickInterval
                                    }
                                    tick={{
                                        fontSize: 11,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    allowDecimals={
                                        false
                                    }
                                    width={36}
                                    tick={{
                                        fontSize: 11,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <ChartTooltip
                                    cursor={{
                                        stroke: "hsl(var(--border))",
                                        strokeWidth: 1,
                                    }}
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            indicator="dot"
                                            formatter={(
                                                value
                                            ) => (
                                                <span className="font-medium">
                                                    {Number(
                                                        value
                                                    ).toLocaleString(
                                                        "bn-BD"
                                                    )}{" "}
                                                    টি ভিউ
                                                </span>
                                            )}
                                        />
                                    }
                                />

                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="var(--color-views)"
                                    strokeWidth={2}
                                    fill="url(#viewsFill)"
                                    fillOpacity={1}
                                />
                            </AreaChart>
                        </ChartContainer>

                        {dailyIsPartial && (
                            <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400">
                                অনেক বেশি ডাটার কারণে
                                চার্টটি আংশিক নমুনার
                                ভিত্তিতে তৈরি — মোট
                                সংখ্যা তবুও সঠিক।
                            </p>
                        )}
                    </div>
                ) : (
                    preset === "all" &&
                    !isPending && (
                        <p className="mt-6 text-xs text-muted-foreground">
                            দৈনিক বিভাজন শুধুমাত্র
                            নির্দিষ্ট সময়সীমার
                            (আজ/৭ দিন/৩০ দিন/১ বছর/
                            কাস্টম) জন্য উপলব্ধ।
                        </p>
                    )
                )}
            </div>
        </section>
    );
}