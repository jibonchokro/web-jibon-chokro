interface PageHeroProps {
    title: string;
    description?: string;
}

export default function PageHero({
    title,
    description,
}: PageHeroProps) {
    return (
        <header className="mb-12 rounded-3xl bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-12">

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                {title}
            </h1>

            {description && (
                <p className="mt-5 max-w-5xl text-lg leading-8 text-gray-600">
                    {description}
                </p>
            )}

        </header>
    );
}