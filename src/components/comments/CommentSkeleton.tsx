import { Skeleton } from "@/components/ui/skeleton";

export default function CommentSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-start gap-2.5"
                >
                    <Skeleton className="h-9 w-9 shrink-0 rounded-full" />

                    <div className="flex-1 space-y-2">
                        <div className="space-y-2 rounded-2xl bg-muted px-3 py-2">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-[70%]" />
                        </div>

                        <div className="flex gap-3 pl-1">
                            <Skeleton className="h-3 w-10" />
                            <Skeleton className="h-3 w-10" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}