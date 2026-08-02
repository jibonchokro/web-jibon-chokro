import { Skeleton } from "@/components/ui/skeleton";

export default function CommentSkeleton() {
    return (
        <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-4"
                >
                    <Skeleton className="h-11 w-11 rounded-full shrink-0" />

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-24" />
                        </div>

                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[92%]" />
                        <Skeleton className="h-4 w-[68%]" />

                        <div className="flex gap-3 pt-2">
                            <Skeleton className="h-8 w-16 rounded-md" />
                            <Skeleton className="h-8 w-16 rounded-md" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}