import type { LucideIcon } from "lucide-react";
import {
    BookOpen,
    Flame,
    Folder,
    Home,
    Info,
    Lightbulb,
    Mail,
    MoonStar,
    Quote,
    Sparkles,
    Tags,
} from "lucide-react";

export interface NavigationItem {
    label: string;
    href: string;
    icon?: LucideIcon;
    description?: string;
}

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
    {
        label: "হোম",
        href: "/",
        icon: Home,
    },
    {
        label: "সকল লেখা",
        href: "/posts",
        icon: BookOpen,
    },
];

export const exploreNavigation: NavigationItem[] = [
    {
        label: "নির্বাচিত লেখা",
        href: "/featured",
        icon: Sparkles,
        description: "বিশেষভাবে নির্বাচিত লেখাগুলো দেখুন",
    },
    {
        label: "বিভাগসমূহ",
        href: "/categories",
        icon: Folder,
        description: "বিষয় অনুযায়ী লেখা খুঁজুন",
    },
    {
        label: "ট্যাগসমূহ",
        href: "/tags",
        icon: Tags,
        description: "বিভিন্ন ট্যাগ থেকে লেখা খুঁজুন",
    },
];

export const categoryNavigation: NavigationGroup = {
    title: "বিভাগসমূহ",
    items: [
        {
            label: "উপদেশ",
            href: "/category/advice",
            icon: Lightbulb,
        },
        {
            label: "উক্তি",
            href: "/category/quote",
            icon: Quote,
        },
        {
            label: "অনুপ্রেরণা",
            href: "/category/inspiration",
            icon: Flame,
        },
        {
            label: "ইসলামিক",
            href: "/category/islamic",
            icon: MoonStar,
        },
    ],
};

export const otherNavigation: NavigationGroup = {
    title: "অন্যান্য",
    items: [
        {
            label: "আমাদের সম্পর্কে",
            href: "/about",
            icon: Info,
        },
        {
            label: "যোগাযোগ",
            href: "/contact",
            icon: Mail,
        },
    ],
};

export const navigationGroups: NavigationGroup[] = [
    categoryNavigation,
    otherNavigation,
];

export const footerNavigation: NavigationItem[] = [
    {
        label: "Privacy Policy",
        href: "/privacy",
    },
    {
        label: "Terms of Service",
        href: "/terms",
    },
];