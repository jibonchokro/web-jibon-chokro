"use client";

import SearchBox from "@/components/search/SearchBox";
import {
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import Container from "@/components/ui/Container";
import {
    mainNavigation,
    mobileNavigation,
    navigationGroups,
} from "@/constants/navigation";

export default function Header() {
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

    const desktopMenuRef = useRef<HTMLDivElement>(null);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(event.target as Node)
            ) {
                setDesktopMenuOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setDesktopMenuOpen(false);
                setMobileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center gap-6">

                    {/* Logo */}

                    <Link
                        href="/"
                        className="shrink-0"
                        aria-label="জীবন চক্র"
                    >
                        <Image
                            src="/JibonChokroLogo.png"
                            alt="জীবন চক্র"
                            width={180}
                            height={50}
                            priority
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Search */}

                    <div className="hidden flex-1 lg:block">
                        <SearchBox />
                    </div>

                    {/* Desktop Navigation */}

                    <nav className="hidden items-center gap-6 lg:flex">

                        {mainNavigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition ${isActive(item.href)
                                    ? "font-semibold text-green-700"
                                    : "text-gray-700 hover:text-green-700"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Dropdown */}

                        <div
                            ref={desktopMenuRef}
                            className="relative"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setDesktopMenuOpen((prev) => !prev)
                                }
                                className="flex items-center gap-1 text-gray-700 transition hover:text-green-700"
                            >
                                আরও

                                <ChevronDown
                                    size={18}
                                    className={`transition ${desktopMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {desktopMenuOpen && (
                                <div className="absolute right-0 mt-4 w-[520px] rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">

                                    <div className="grid grid-cols-2 gap-8">

                                        {navigationGroups.map((group) => (
                                            <div key={group.title}>
                                                <h3 className="mb-4 font-semibold text-green-700">
                                                    {group.title}
                                                </h3>

                                                <div className="space-y-3">
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            onClick={() =>
                                                                setDesktopMenuOpen(false)
                                                            }
                                                            className={`block transition ${isActive(item.href)
                                                                ? "font-semibold text-green-700"
                                                                : "text-gray-700 hover:text-green-700"
                                                                }`}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>

                    </nav>

                    {/* Mobile Button */}

                    <button
                        type="button"
                        className="ml-auto rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
                        onClick={() =>
                            setMobileOpen((prev) => !prev)
                        }
                        aria-label="Open Menu"
                    >
                        {mobileOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>

                </div>

                {/* Mobile Menu */}

                {mobileOpen && (
                    <div className="border-t border-gray-200 py-5 lg:hidden">

                        <div className="mb-6">
                            <SearchBox />
                        </div>

                        <nav className="space-y-1">
                            {mobileNavigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block rounded-lg px-3 py-3 transition ${isActive(item.href)
                                        ? "bg-green-50 font-semibold text-green-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                    </div>
                )}
            </Container>
        </header>
    );
}