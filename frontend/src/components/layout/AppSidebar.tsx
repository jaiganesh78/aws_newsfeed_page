"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

type AppSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/news", label: "News Feed", icon: Newspaper },
  { href: "#events", label: "Events", icon: CalendarDays },
  { href: "#learning", label: "Learning", icon: GraduationCap },
];

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <aside className="flex h-full flex-col rounded-[var(--radius-xl)] border border-border bg-card p-4 [box-shadow:var(--shadow-soft)]">
      <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
        <span className="font-display text-lg font-semibold">Navigation</span>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition hover:text-foreground"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="hidden px-2 pb-6 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Workspace
        </p>
      </div>

      <nav aria-label="Sidebar navigation" className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted hover:bg-white/70 hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="hidden w-64 shrink-0 lg:block">{sidebarContent}</div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(20rem,calc(100vw-2rem))] p-4 transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}
