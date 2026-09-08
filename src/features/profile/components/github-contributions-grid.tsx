"use client";

import * as React from "react";

import type { Week } from "../lib/contribution-graph";
import { WEEKDAY_ROWS } from "../lib/contribution-graph";

const CELL = 10;
const GAP = 3;
const PITCH = CELL + GAP;
const GUTTER = 28;

/**
 * Intensity scale built from the theme's own tokens rather than a hardcoded
 * palette, so it's automatically legible — and on-brand — in both themes.
 */
const LEVEL_FILL = [
  "var(--edge)",
  "color-mix(in oklch, var(--accent) 32%, var(--edge))",
  "color-mix(in oklch, var(--accent) 56%, var(--edge))",
  "color-mix(in oklch, var(--accent) 80%, var(--edge))",
  "var(--accent)",
];

const WEEKDAY_LABEL: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

type Hovered = { weekIndex: number; dayIndex: number; label: string };

/**
 * A native SVG `<title>` per cell was the first pass here, but it needs the
 * cursor to sit still for ~1.5s before the browser shows anything, and these
 * cells are 10px square with 3px gaps — a hair of drift resets that timer
 * before it ever fires. This tracks hover in state instead, so the tooltip
 * appears the instant the pointer lands on a cell.
 */
export function GithubContributionGrid({
  weeks,
  months,
  total,
}: {
  weeks: Week[];
  months: { label: string; weekIndex: number }[];
  total: number;
}) {
  const [hovered, setHovered] = React.useState<Hovered | null>(null);

  const width = Math.max(0, weeks.length * PITCH - GAP);
  const height = 7 * PITCH - GAP;

  const tooltipLeft = hovered
    ? Math.min(
        Math.max(hovered.weekIndex * PITCH + GUTTER + CELL / 2, 44),
        width + GUTTER - 44
      )
    : 0;
  const tooltipTop = hovered ? hovered.dayIndex * PITCH + 16 : 0;

  return (
    // The dir flip is a CSS-only trick: it starts this scroll container
    // scrolled to its end, so the most recent weeks are in view on a narrow
    // screen without any client-side JS to set scrollLeft.
    <div dir="rtl" className="-mx-1 overflow-x-auto px-1 pb-1">
      <div dir="ltr" className="relative inline-block">
        <svg
          role="img"
          aria-label={`GitHub contribution graph: ${total.toLocaleString("en")} contributions in the last year`}
          width={width + GUTTER}
          height={height + 16}
          className="block"
          onMouseLeave={() => setHovered(null)}
        >
          {months.map(({ label, weekIndex }) => (
            <text
              key={weekIndex}
              x={GUTTER + weekIndex * PITCH}
              y={10}
              className="fill-muted-foreground font-mono text-[9px] uppercase"
            >
              {label}
            </text>
          ))}

          {WEEKDAY_ROWS.map((row) => (
            <text
              key={row}
              x={0}
              y={16 + row * PITCH + CELL - 1}
              className="fill-muted-foreground font-mono text-[9px]"
            >
              {WEEKDAY_LABEL[row]}
            </text>
          ))}

          <g transform={`translate(${GUTTER}, 16)`}>
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                if (!day) return null;

                const label = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${new Date(
                  day.date
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`;

                return (
                  <rect
                    key={day.date}
                    x={weekIndex * PITCH}
                    y={dayIndex * PITCH}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={LEVEL_FILL[day.level] ?? LEVEL_FILL[0]}
                    onMouseEnter={() => setHovered({ weekIndex, dayIndex, label })}
                  />
                );
              })
            )}
          </g>
        </svg>

        {hovered && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-sm border border-edge bg-surface px-2 py-1 font-mono text-[10px] whitespace-nowrap text-foreground shadow-md"
            style={{ left: tooltipLeft, top: tooltipTop - 6 }}
          >
            {hovered.label}
          </div>
        )}
      </div>
    </div>
  );
}
