export default function Loading() {
    return (
        <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center justify-center px-6 py-16">

            <div className="w-full max-w-md text-center">

                {/* Badge */}

                <div className="inline-flex rounded-full border border-black/10 bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
                    Loading
                </div>

                {/* Spinner */}

                <div className="mt-8 flex justify-center">

                    <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-black/10 border-t-black" />

                </div>

                {/* Title */}

                <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground">
                    লোড হচ্ছে...
                </h1>

                {/* Description */}

                <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-muted-foreground">
                    অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।
                    আপনার অনুরোধকৃত তথ্য প্রস্তুত করা হচ্ছে।
                </p>

            </div>

        </main>
    );
}