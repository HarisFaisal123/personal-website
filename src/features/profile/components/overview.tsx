import {
  BriefcaseIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";
import type * as React from "react";

import { Panel, PanelContent } from "@/components/panel";

import { USER } from "../data/user";

export function Overview() {
  const [currentJob, school] = USER.jobs;

  return (
    <Panel>
      <h2 className="sr-only">At a glance</h2>

      <PanelContent>
        <dl className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          <Item icon={<BriefcaseIcon aria-hidden />} label="Current role">
            {currentJob.title} at {currentJob.company}
          </Item>

          <Item icon={<GraduationCapIcon aria-hidden />} label="Studying">
            {school.title}, {school.company}
          </Item>

          <Item icon={<MapPinIcon aria-hidden />} label="Location">
            <a
              className="transition-colors hover:text-accent"
              href={USER.locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {USER.location}
            </a>
          </Item>

          <Item icon={<MailIcon aria-hidden />} label="Email">
            <a
              className="break-all transition-colors hover:text-accent"
              href={`mailto:${USER.email}`}
            >
              {USER.email}
            </a>
          </Item>
        </dl>
      </PanelContent>
    </Panel>
  );
}

function Item({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4"
        aria-hidden
      >
        {icon}
      </span>

      <div className="min-w-0 text-sm">
        <dt className="sr-only">{label}</dt>
        <dd className="text-pretty">{children}</dd>
      </div>
    </div>
  );
}
