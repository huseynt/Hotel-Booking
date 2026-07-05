"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75 animate-fade-in">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
          Hotel Booking
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl border border-border bg-card p-2 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-secondary" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
        </button>
      </div>
    </header>
  );
}
