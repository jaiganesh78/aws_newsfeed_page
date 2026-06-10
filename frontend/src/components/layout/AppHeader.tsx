"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/utils/cn";

type AppHeaderProps = {
  onMenuClick: () => void;
};

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/news", label: "News Feed" },
  { href: "#events", label: "Events" },
  { href: "#learning", label: "Learning" },
];

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:scale-[1.02] lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>

          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="gradient-container flex size-11 shrink-0 items-center justify-center rounded-2xl">
              <span className="relative font-display text-sm font-bold text-foreground">
                AWS
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-semibold tracking-tight">
                AWS Student Builder Groups REC
              </span>
              <span className="block truncate text-xs font-medium text-muted">
                Community platform
              </span>
            </span>
          </Link>
        </div>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-2 rounded-full border border-border bg-card/80 p-1 shadow-sm lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted transition",
                "hover:bg-white/70 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="hidden size-11 items-center justify-center rounded-full border border-border bg-card text-muted transition hover:text-foreground sm:inline-flex"
          >
            <Search className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-muted transition hover:text-foreground"
          >
            <Bell className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
