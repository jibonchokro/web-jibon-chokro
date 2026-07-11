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
                prose-headings:text-gray-900

                prose-p:text-gray-700
                prose-p:leading-8

                prose-a:text-green-700
                prose-a:no-underline
                hover:prose-a:underline

                prose-strong:text-gray-900

                prose-ul:text-gray-700
                prose-ol:text-gray-700

                prose-blockquote:border-green-600
                prose-blockquote:text-gray-600

                prose-img:rounded-2xl
            "
        >
            {children}
        </article>
    );
}