import {
  ArrowUpRightIcon,
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";

import { Panel } from "@/components/panel";
import { cn } from "@/lib/utils";

import { SOCIAL_LINKS } from "../data/social-links";
import type { SocialLink } from "../types";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  globe: GlobeIcon,
} as const;

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Elsewhere</h2>

      <ul className="grid sm:grid-cols-3">
        {SOCIAL_LINKS.map((link, index) => (
          <li
            key={link.href}
            className={cn(
              "border-edge max-sm:border-b max-sm:last:border-b-0",
              index > 0 && "sm:border-l"
            )}
          >
            <SocialLinkItem link={link} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function SocialLinkItem({ link }: { link: SocialLink }) {
  const Icon = ICONS[link.icon];
  const isExternal = !link.href.startsWith("mailto:");

  return (
    <a
      className="group flex h-full flex-col gap-1.5 p-4 transition-colors hover:bg-muted"
      href={link.href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" aria-hidden />

        <span className="text-sm font-medium">{link.title}</span>

        <ArrowUpRightIcon
          className="ml-auto size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent"
          aria-hidden
        />
      </div>

      <span className="font-mono text-xs break-all text-muted-foreground">
        {link.handle}
      </span>

      <span className="sr-only">{link.description}</span>
    </a>
  );
}
