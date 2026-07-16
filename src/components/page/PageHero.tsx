interface PageHeroProps {
    title: string;
    description?: string;
}

export default function PageHero({
    title,
    description,
}: PageHeroProps) {
    return (
        <header className="mb-12 rounded-3xl bg-white shadow-sm px-8 py-12">

            <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
                {title}
            </h1>

            {description && (
                <p className="mt-5 max-w-5xl text-lg leading-8 text-black">
                    {description}
                </p>
            )}

        </header>
    );
}