"use client";

import { useState, type ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
