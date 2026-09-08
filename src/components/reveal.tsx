"use client";

import * as React from "react";

/**
 * Fades a section in the first time it scrolls into view, so the page reads
 * as loading progressively as you go down it rather than all at once.
 *
 * Renders visible by default — with JavaScript disabled, or before hydration
 * runs, every section is just there. Only after mount does it check whether
 * a section starts below the fold; if so it hides it, then reveals it once
 * on the first intersection. Content already on screen at load never hides,
 * so there is no flash of an invisible first fold.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(true);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        "transition-[opacity,transform] duration-700 ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6") +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </div>
  );
}
