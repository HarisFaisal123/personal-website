import { AwardIcon } from "lucide-react";

import type { Experience } from "../../types";
import { ExperiencePositionItem } from "./experience-position-item";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="space-y-4 border-b border-edge px-4 py-4 last:border-b-0">
      <div className="flex items-center gap-3">
        {experience.companyLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={experience.companyLogo}
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0 rounded-sm border border-edge object-cover select-none"
            aria-hidden
          />
        ) : (
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-edge bg-surface font-mono text-[11px] font-semibold text-muted-foreground select-none"
            aria-hidden
          >
            {experience.companyName.charAt(0)}
          </span>
        )}

        <h3 className="text-base leading-snug font-semibold tracking-tight">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
            <span className="sr-only">Current employer</span>
          </span>
        )}
      </div>

      {experience.companyAchievements && experience.companyAchievements.length > 0 && (
        <ul className="space-y-1.5 pl-9">
          {experience.companyAchievements.map((achievement, index) => (
            <li
              key={index}
              className="flex gap-2 text-xs/relaxed text-pretty text-muted-foreground"
            >
              <AwardIcon
                className="mt-0.5 size-3.5 shrink-0 text-accent"
                aria-hidden
              />
              {achievement}
            </li>
          ))}
        </ul>
      )}

      {/* Vertical rail behind the position nodes. */}
      <div className="relative space-y-5 before:absolute before:top-1 before:bottom-1 before:left-3 before:w-px before:bg-edge">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}
