"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const OPTIONS = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
] as const;

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    // Avoid a hydration mismatch: next-themes only knows the real
    // active theme after mounting on the client.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex flex-wrap gap-3">
                {OPTIONS.map((option) => (
                    <div
                        key={option.value}
                        className="h-[38px] w-[96px] animate-pulse rounded-lg bg-muted"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-3">
            {OPTIONS.map((option) => {
                const Icon = option.icon;
                const active = theme === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                            setTheme(option.value)
                        }
                        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${active
                                ? "border-black bg-black text-white"
                                : "border-black/10 bg-muted text-muted-foreground hover:bg-muted/70"
                            }`}
                    >
                        <Icon size={16} />
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}