interface PageHeroProps {
    title: string;
    description?: string;
}

export default function PageHero({
    title,
    description,
}: PageHeroProps) {
    return (
        <header className="mb-8 rounded-2xl border border-[#f0f0f0] shadow-custom bg-zinc-50 p-5 sm:mb-10 sm:p-6 md:mb-12 md:rounded-3xl md:p-8 lg:p-10">

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {title}
            </h1>

            {description && (
                <p className="mt-4 max-w-5xl text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8 lg:leading-9">
                    {description}
                </p>
            )}

        </header>
    );
}