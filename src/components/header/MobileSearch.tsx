"use client";

import SearchBox from "@/components/search/SearchBox";
import Container from "@/components/ui/Container";
import { ArrowLeft, Search } from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

export default function MobileSearch() {
    const [open, setOpen] =
        useState(false);

    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const inputRef =
        useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(
            event: MouseEvent
        ) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        }

        function handleEscape(
            event: KeyboardEvent
        ) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    useEffect(() => {
        if (!open) {
            return;
        }

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }, [open]);

    return (
        <div
            ref={wrapperRef}
            className="lg:hidden"
        >
            {/* Search Button */}

            <button
                type="button"
                aria-label="Search"
                onClick={() =>
                    setOpen(true)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                <Search className="size-5" />
            </button>

            {/* Search Header */}

            <div
                className={`
                    fixed
                    inset-x-0
                    top-0
                    z-[200]
                    origin-top
                    border-b
                    border-border
                    bg-background
                    text-foreground
                    shadow-sm
                    transition-all
                    duration-200
                    ease-out
                    ${open
                        ? "scale-y-100 opacity-100"
                        : "pointer-events-none scale-y-95 opacity-0"
                    }
                `}
            >
                <Container>
                    <div className="flex h-16 items-center">

                        {/* Back Button */}

                        <button
                            type="button"
                            aria-label="Close search"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="flex h-10 w-8 shrink-0 items-center justify-start rounded-full transition hover:bg-muted"
                        >
                            <ArrowLeft className="size-6" />
                        </button>

                        {/* Search */}

                        <div className="min-w-0 flex-1">
                            <SearchBox
                                ref={inputRef}
                                className="w-full"
                            />
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    );
}