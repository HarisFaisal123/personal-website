import { ImageIcon } from "lucide-react";

import type { Project } from "../../types";

/**
 * Frame for a project's architecture diagram. Each project points at its own
 * file, so replacing one diagram never touches another. With no `src` set the
 * frame renders as a labelled empty slot.
 */
export function ArchitectureFigure({
  project,
}: {
  project: Pick<
    Project,
    "title" | "architectureImage" | "architectureSize" | "architectureCaption"
  >;
}) {
  const captionId = `${slugify(project.title)}-architecture-caption`;

  return (
    <figure className="overflow-hidden rounded-sm border border-edge bg-surface">
      <figcaption className="flex items-center gap-2 border-b border-edge px-3 py-2">
        <ImageIcon className="size-3.5 text-muted-foreground" aria-hidden />
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Architecture diagram
        </span>
      </figcaption>

      {project.architectureImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="block h-auto w-full"
            src={project.architectureImage}
            {...project.architectureSize}
            alt={
              project.architectureCaption ??
              `Architecture diagram for ${project.title}`
            }
            loading="lazy"
            decoding="async"
            {...(project.architectureCaption
              ? { "aria-describedby": captionId }
              : undefined)}
          />

          {project.architectureCaption && (
            <p
              id={captionId}
              className="border-t border-edge px-3 py-2 text-xs/relaxed text-pretty text-muted-foreground"
            >
              {project.architectureCaption}
            </p>
          )}
        </>
      ) : (
        <div className="flex min-h-32 items-center justify-center px-3 py-8">
          <p className="text-center font-mono text-xs text-muted-foreground">
            Diagram coming soon
          </p>
        </div>
      )}
    </figure>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
