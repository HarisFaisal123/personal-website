import type * as React from "react";

import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-edge bg-surface px-1.5 py-0.5",
        "font-mono text-[11px] leading-4 tracking-tight text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
