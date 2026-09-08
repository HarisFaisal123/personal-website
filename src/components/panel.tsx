import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A page section rendered as a bordered plate: side rails from `border-x`, and
 * full-viewport hairlines above and below from the `screen-line-*` utilities.
 */
function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "screen-line-before screen-line-after border-x border-edge",
        className
      )}
      {...props}
    />
  );
}

function PanelHeader({
  className,
  index,
  title,
  count,
  id,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  /** Two-digit section number shown in the mono gutter, e.g. "04". */
  index: string;
  title: string;
  count?: number;
}) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        "screen-line-after flex items-baseline gap-3 px-4 py-3.5",
        className
      )}
      {...props}
    >
      <span
        className="font-mono text-xs font-medium text-accent tabular-nums select-none"
        aria-hidden
      >
        {index}
      </span>

      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
        {typeof count === "number" && (
          <sup className="ml-1 font-mono text-xs font-normal text-muted-foreground select-none">
            {count}
          </sup>
        )}
      </h2>
    </header>
  );
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-content"
      className={cn("px-4 py-4", className)}
      {...props}
    />
  );
}

export { Panel, PanelContent, PanelHeader };
