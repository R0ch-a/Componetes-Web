"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { collections } from "@/content/registry";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Components Library
        </Link>

        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {collections.map((collection) => {
            const href = `/${collection.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={collection.slug}
                href={href}
                className={cn(
                  "whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {collection.name}
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
