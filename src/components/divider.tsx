import { cn } from "@/lib/utils";

/**
 * Structural gap between panels: a hatched band held between the page rails,
 * with a crosshair at each rail intersection.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn("hatch relative flex h-10 w-full border-x border-edge", className)}
      aria-hidden
    >
      <CrossMark className="-top-[3px] -left-[3px]" />
      <CrossMark className="-top-[3px] -right-[3px]" />
    </div>
  );
}

function CrossMark({ className }: { className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute size-[7px]", className)}>
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-edge-strong" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-edge-strong" />
    </span>
  );
}
