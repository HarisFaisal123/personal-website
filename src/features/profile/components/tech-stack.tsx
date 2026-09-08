import type * as React from "react";

import { Panel, PanelHeader } from "@/components/panel";

import { TECH_STACK } from "../data/tech-stack";
import { getTechIcon, type TechIcon } from "../lib/tech-icons";

export function TechStack() {
  return (
    <Panel id="tech-stack" aria-labelledby="tech-stack-title">
      <PanelHeader id="tech-stack-title" index="03" title="Tech stack" />

      <div>
        {TECH_STACK.map((group) => (
          <section
            key={group.id}
            className="border-b border-edge px-4 py-3.5 last:border-b-0 sm:flex sm:gap-4"
            aria-labelledby={`stack-${group.id}`}
          >
            <h3
              id={`stack-${group.id}`}
              className="mb-2 shrink-0 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:mb-0 sm:w-40 sm:pt-1.5"
            >
              {group.label}
            </h3>

            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="flex">
                  <TechChip name={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Panel>
  );
}

function TechChip({ name }: { name: string }) {
  const icon = getTechIcon(name);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-edge bg-surface py-1 pr-2 pl-1.5 text-[12px] leading-4">
      <TechChipIcon icon={icon} />
      <span className="font-mono tracking-tight">{name}</span>
    </span>
  );
}

function TechChipIcon({ icon }: { icon: TechIcon }) {
  if (icon.kind === "brand") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 shrink-0 text-[var(--icon-light)] dark:text-[var(--icon-dark)]"
        style={
          {
            "--icon-light": icon.light,
            "--icon-dark": icon.dark,
          } as React.CSSProperties
        }
        fill="currentColor"
        aria-hidden
      >
        <path d={icon.path} />
      </svg>
    );
  }

  if (icon.kind === "generic") {
    return <icon.Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />;
  }

  return (
    <span
      className="flex size-3.5 shrink-0 items-center justify-center rounded-[2px] bg-muted font-mono text-[9px] leading-none font-semibold text-muted-foreground"
      aria-hidden
    >
      {icon.letter}
    </span>
  );
}
