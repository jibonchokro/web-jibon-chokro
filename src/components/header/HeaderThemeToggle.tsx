"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function HeaderThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        setDark(document.documentElement.classList.contains("dark"));
    }, []);

    function toggleTheme() {
        const nextDark = !document.documentElement.classList.contains("dark");

        document.documentElement.classList.toggle("dark", nextDark);
        localStorage.setItem("theme", nextDark ? "dark" : "light");
        setDark(nextDark);
    }

    if (!mounted) {
        return (
            <Button type="button" variant="ghost" size="icon" className="h-9.5 w-9.5 sm:w-10 sm:h-10 rounded-full" aria-label="Toggle theme">
                <Moon className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
            </Button>
        );
    }

    return (
        <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="h-9.5 w-9.5 sm:w-10 sm:h-10 rounded-full bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
            {dark ? <Sun className="h-5.5 w-5.5 sm:h-6 sm:w-6" /> : <Moon className="h-5.5 w-5.5 sm:h-6 sm:w-6" />}
        </Button>
    );
}