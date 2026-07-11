export interface NavigationItem {
    label: string;
    href: string;
}

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
    {
        label: "হোম",
        href: "/",
    },
    {
        label: "সকল লেখা",
        href: "/posts",
    },
];

export const navigationGroups: NavigationGroup[] = [
    {
        title: "বিভাগসমূহ",
        items: [
            {
                label: "উপদেশ",
                href: "/category/advice",
            },
            {
                label: "উক্তি",
                href: "/category/quotes",
            },
            {
                label: "শিক্ষণীয় গল্প",
                href: "/category/stories",
            },
            {
                label: "বাস্তব ঘটনা",
                href: "/category/real-life",
            },
            {
                label: "ইসলামিক",
                href: "/category/islamic",
            },
        ],
    },
    {
        title: "অন্যান্য",
        items: [
            {
                label: "আমাদের সম্পর্কে",
                href: "/about",
            },
            {
                label: "যোগাযোগ",
                href: "/contact",
            },
            {
                label: "গোপনীয়তা নীতি",
                href: "/privacy",
            },
            {
                label: "ব্যবহারের শর্তাবলী",
                href: "/terms",
            },
        ],
    },
];

export const mobileNavigation: NavigationItem[] = [
    ...mainNavigation,
    ...navigationGroups.flatMap((group) => group.items),
];

export const footerNavigation: NavigationItem[] = [
    {
        label: "আমাদের সম্পর্কে",
        href: "/about",
    },
    {
        label: "যোগাযোগ",
        href: "/contact",
    },
    {
        label: "গোপনীয়তা নীতি",
        href: "/privacy",
    },
    {
        label: "ব্যবহারের শর্তাবলী",
        href: "/terms",
    },
];