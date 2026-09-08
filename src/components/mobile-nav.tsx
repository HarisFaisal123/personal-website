"use client";

import { MenuIcon, XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export function MobileNav({
  items,
  className,
}: {
  items: { title: string; href: string }[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <XIcon className="size-4" aria-hidden />
        ) : (
          <MenuIcon className="size-4" aria-hidden />
        )}
      </button>

      <div
        id="mobile-nav-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-edge bg-background"
      >
        <ul className="mx-auto flex max-w-3xl flex-col border-x border-edge">
          {items.map((item) => (
            <li key={item.href} className="border-b border-edge last:border-b-0">
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium",
                  "transition-colors hover:bg-muted hover:text-accent"
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
