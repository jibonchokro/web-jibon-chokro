"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className={`
                fixed
                right-3
                bottom-3
                z-50
                flex
                size-8
                items-center
                justify-center
                rounded-full
                border
                border-black/10
                bg-white/70
                text-foreground
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-white/90
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-black/10
                sm:right-6
                sm:bottom-6
                sm:size-10
                ${visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }
            `}
        >
            <ArrowUp className="size-4 sm:size-5" />
        </button>
    );
}