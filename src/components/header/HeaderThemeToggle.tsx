"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function HeaderThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        setDark(
            document.documentElement.classList.contains("dark")
        );
    }, []);

    function toggleTheme() {
        const nextDark =
            !document.documentElement.classList.contains("dark");

        document.documentElement.classList.toggle(
            "dark",
            nextDark
        );

        localStorage.setItem(
            "theme",
            nextDark ? "dark" : "light"
        );

        setDark(nextDark);
    }

    if (!mounted) {
        return (
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9.5 rounded-full sm:size-10"
                aria-label="Toggle theme"
            >
                <Moon className="size-5" />
            </Button>
        );
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="size-9.5 rounded-full bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground sm:size-10"
            aria-label={
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            title={dark ? "Light mode" : "Dark mode"}
        >
            {dark ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
        </Button>
    );
}