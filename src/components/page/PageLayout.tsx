import PageContent from "./PageContent";
import PageHero from "./PageHero";

interface PageLayoutProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function PageLayout({
    title,
    description,
    children,
}: PageLayoutProps) {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">

            <PageHero
                title={title}
                description={description}
            />

            <PageContent>
                {children}
            </PageContent>

        </main>
    );
}