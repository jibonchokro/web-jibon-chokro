"use client";

import { useEffect, useState } from "react";

/**
 * Thin fixed progress bar that fills as the reader scrolls through
 * the article. Purely client-side, no props required.
 *
 * Usage: drop <ReadingProgressBar /> once near the top of the
 * article's JSX (it renders itself as position:fixed, so placement
 * in the tree doesn't matter).
 */
export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setProgress(Math.min(100, Math.max(0, pct)));
        };

        onScroll();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div aria-hidden="true" className="fixed left-0 top-0 z-50 h-[2.5px] w-full bg-transparent">
            <div className="h-full bg-primary transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
        </div>
    );
}