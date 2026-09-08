"use client";

import { ChevronDownIcon, ExternalLinkIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";

import type { Project } from "../../types";
import { ArchitectureFigure } from "./architecture-figure";

export function ProjectItem({
  project,
  showArchitecture = false,
}: {
  project: Project;
  /** Featured cards carry a diagram frame; the shorter cards do not. */
  showArchitecture?: boolean;
}) {
  return (
    <Collapsible
      defaultOpen={project.isExpanded}
      className="border-b border-edge last:border-b-0"
    >
      <div className="px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base leading-snug font-semibold tracking-tight text-balance">
              {project.title}
              <span className="ml-2 font-mono text-[11px] font-normal tracking-tight text-muted-foreground">
                {project.subtitle}
              </span>
            </h3>

            <p className="mt-1.5 text-sm/relaxed text-pretty text-muted-foreground">
              {project.summary}
            </p>
          </div>

          {project.link && (
            <a
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-accent"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="size-4" aria-hidden />
              <span className="sr-only">Open {project.title}</span>
            </a>
          )}
        </div>

        <CollapsibleTrigger
          className="group/collapsible mt-3 flex items-center gap-1.5 rounded-sm font-mono text-xs font-medium text-accent transition-opacity hover:opacity-75"
          aria-label={`Learn more about ${project.title}`}
        >
          <span className="group-data-[state=open]/collapsible:hidden">
            Learn more
          </span>

          <span className="hidden group-data-[state=open]/collapsible:inline">
            Show less
          </span>

          <ChevronDownIcon
            className="size-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
            aria-hidden
          />
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="animate-fade-in space-y-4 border-t border-edge bg-muted/40 px-4 py-4">
          {project.details.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm/relaxed text-pretty text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}

          <ul className="flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <li key={skill} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>

          {showArchitecture && <ArchitectureFigure project={project} />}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
