"use client";

import { ChevronDownIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";

import type { ExperiencePosition } from "../../types";

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const { start, end } = position.period;
  const isOngoing = !end;

  return (
    <Collapsible defaultOpen={position.isExpanded} className="relative pl-9">
      {/* Node on the company timeline rail. */}
      <span
        className="absolute top-2 left-[9px] size-[7px] rounded-full border border-edge-strong bg-background"
        aria-hidden
      />

      {/* APG accordion shape: the heading wraps the disclosure button. */}
      <h4>
        <CollapsibleTrigger className="group/collapsible flex w-full items-start gap-3 rounded-sm py-1 pr-1 text-left transition-colors hover:text-accent">
          <span className="flex-1 text-sm font-medium text-balance">
            {position.title}
          </span>

          <ChevronDownIcon
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
            aria-hidden
          />
        </CollapsibleTrigger>
      </h4>

      <dl className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <div>
          <dt className="sr-only">Employment type</dt>
          <dd>{position.employmentType}</dd>
        </div>

        <span className="h-3 w-px bg-edge" aria-hidden />

        <div>
          <dt className="sr-only">Employment period</dt>
          <dd className="font-mono">
            {start} — {isOngoing ? "Present" : end}
          </dd>
        </div>

        <span className="h-3 w-px bg-edge" aria-hidden />

        <div>
          <dt className="sr-only">Location</dt>
          <dd>{position.location}</dd>
        </div>
      </dl>

      <CollapsibleContent>
        <div className="animate-fade-in space-y-3 pt-3 pb-1">
          <ul className="space-y-1.5">
            {position.highlights.map((highlight, index) => (
              <li
                key={index}
                className="relative pl-4 text-sm/relaxed text-pretty text-muted-foreground before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-edge-strong"
              >
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-1.5">
            {position.skills.map((skill) => (
              <li key={skill} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
