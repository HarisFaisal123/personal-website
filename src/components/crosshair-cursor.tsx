"use client";

import * as React from "react";

type Ripple = { id: number; x: number; y: number };

/**
 * Drafting-table overlay: two hairlines track the pointer across the full
 * viewport — the same full-bleed rules the layout already uses — with a live
 * coordinate readout in the corner, plus an expanding ring on every left
 * click.
 *
 * Skipped entirely for coarse pointers and for anyone asking for reduced
 * motion. It never intercepts input: everything here is pointer-events: none.
 */
export function CrosshairCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const readoutRef = React.useRef<HTMLSpanElement>(null);
  const rippleId = React.useRef(0);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();

    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let hot = false;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--cx", `${x}px`);
      root.style.setProperty("--cy", `${y}px`);
      root.dataset.hot = String(hot);

      const readout = readoutRef.current;
      if (readout) {
        readout.textContent = `x ${String(Math.round(x)).padStart(4, "0")}  y ${String(
          Math.round(y)
        ).padStart(4, "0")}`;
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      const target = event.target;
      hot =
        target instanceof Element &&
        !!target.closest('a, button, [role="radio"], summary');

      root.dataset.visible = "true";
      // Coalesce to one write per frame; pointermove can fire far more often.
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      root.dataset.visible = "false";
    };

    // Left clicks only — a ripple on a right-click would read as a response
    // to the context menu, which this has nothing to do with.
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const id = ++rippleId.current;
      setRipples((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled]);

  const removeRipple = (id: number) =>
    setRipples((current) => current.filter((r) => r.id !== id));

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-visible="false"
      data-hot="false"
      className="group pointer-events-none fixed inset-0 z-[60] opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
    >
      <span className="absolute inset-y-0 left-0 w-px translate-x-[var(--cx)] bg-accent/25 transition-colors group-data-[hot=true]:bg-accent/60" />
      <span className="absolute inset-x-0 top-0 h-px translate-y-[var(--cy)] bg-accent/25 transition-colors group-data-[hot=true]:bg-accent/60" />

      {/* Node marker on the intersection. One combined transform, so the
          centring offset and the pointer position cannot clobber each other. */}
      <span
        className="absolute top-0 left-0 size-1.5 rounded-full bg-accent/50 transition-colors group-data-[hot=true]:bg-accent"
        style={{
          transform: "translate(calc(var(--cx) - 50%), calc(var(--cy) - 50%))",
        }}
      />

      <span
        ref={readoutRef}
        className="absolute right-3 bottom-3 rounded-sm border border-edge bg-surface/90 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground tabular-nums backdrop-blur-sm"
      />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={() => removeRipple(ripple.id)}
          className="absolute top-0 left-0 size-8 animate-cursor-ripple rounded-full border border-accent"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </div>
  );
}
