interface PageContentProps {
    children: React.ReactNode;
}

export default function PageContent({
    children,
}: PageContentProps) {
    return (
        <article
            className="
                prose
                prose-lg
                max-w-none

                prose-headings:scroll-mt-24
                prose-headings:font-bold
                prose-headings:text-foreground
                dark:prose-headings:text-white

                prose-p:text-foreground/80
                prose-p:leading-8
                dark:prose-p:text-white/75

                prose-a:text-green-700
                prose-a:no-underline
                hover:prose-a:underline
                dark:prose-a:text-green-400

                prose-strong:text-foreground
                dark:prose-strong:text-white

                prose-ul:text-foreground/80
                prose-ol:text-foreground/80
                dark:prose-ul:text-white/75
                dark:prose-ol:text-white/75

                prose-blockquote:border-green-600
                prose-blockquote:text-muted-foreground
                dark:prose-blockquote:border-green-400
                dark:prose-blockquote:text-white/70

                prose-img:rounded-2xl
            "
        >
            {children}
        </article>
    );
}