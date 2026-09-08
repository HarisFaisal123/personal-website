"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A physical rocker switch, not a sliding pill. The whole paddle — plate,
 * icons and all — rotates in 3D around its centre seam, so flipping it looks
 * like the top and bottom trade places, the way a real wall switch pivots.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={mounted ? `Turn ${isDark ? "off" : "on"} dark mode` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group/switch relative flex h-8 w-5 shrink-0 items-center justify-center rounded-[3px] border border-edge-strong bg-surface shadow-[inset_0_1px_2px_rgb(0_0_0/0.18)] transition-transform active:scale-90",
        className
      )}
      style={{ perspective: "70px" }}
    >
      {/* Pivot pin, drawn on the housing so it stays put while the paddle behind it rotates. */}
      <span
        className="absolute top-1/2 left-1/2 z-10 size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-edge-strong"
        aria-hidden
      />

      {/* The paddle: both icons ride on one rigid body that rotates as a unit. */}
      <span
        aria-hidden
        className="flex h-full w-full flex-col items-center justify-between rounded-[2px] bg-gradient-to-b from-white/10 via-transparent to-black/10 py-1 duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:duration-100 motion-reduce:ease-linear"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${isDark ? -46 : 46}deg)`,
          transition: "transform 280ms",
        }}
      >
        <MoonIcon
          className={cn(
            "size-2.5 shrink-0 transition-colors duration-200",
            isDark ? "text-accent" : "text-muted-foreground/35"
          )}
        />
        <SunIcon
          className={cn(
            "size-2.5 shrink-0 transition-colors duration-200",
            !isDark ? "text-accent" : "text-muted-foreground/35"
          )}
        />
      </span>
    </button>
  );
}
