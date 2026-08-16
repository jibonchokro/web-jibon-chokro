interface PageHeroProps {
    title: string;
    description?: string;
}

export default function PageHero({
    title,
    description,
}: PageHeroProps) {
    return (
        <header
            className="
                mb-8
                rounded-2xl
                border
                border-black/10
                bg-zinc-50
                p-5
                shadow-custom
                transition-colors

                dark:border-white/10
                dark:bg-zinc-900

                sm:mb-10
                sm:p-6

                md:mb-12
                md:rounded-3xl
                md:p-8

                lg:p-10
            "
        >
            <h1
                className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-foreground
                    dark:text-white

                    sm:text-4xl
                    lg:text-5xl
                "
            >
                {title}
            </h1>

            {description && (
                <p
                    className="
                        mt-4
                        max-w-5xl
                        text-base
                        leading-7
                        text-muted-foreground

                        dark:text-white/65

                        sm:mt-5
                        sm:text-lg
                        sm:leading-8

                        lg:leading-9
                    "
                >
                    {description}
                </p>
            )}
        </header>
    );
}