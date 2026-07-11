export default function Loading() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />

                <p className="mt-4 text-gray-600">
                    লোড হচ্ছে...
                </p>
            </div>
        </main>
    );
}