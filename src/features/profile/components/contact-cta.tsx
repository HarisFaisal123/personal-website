import { ArrowUpRightIcon, FileTextIcon, MailIcon } from "lucide-react";

import { Panel, PanelContent, PanelHeader } from "@/components/panel";
import { RESUME_URL } from "@/config/site";

import { SOCIAL_LINKS } from "../data/social-links";
import { USER } from "../data/user";

export function ContactCta() {
  const github = SOCIAL_LINKS.find((link) => link.icon === "github");
  const linkedin = SOCIAL_LINKS.find((link) => link.icon === "linkedin");

  return (
    <Panel id="contact" aria-labelledby="contact-title">
      <PanelHeader id="contact-title" index="08" title="Get in touch" />

      <PanelContent className="space-y-4">
        <p className="max-w-prose text-sm/relaxed text-pretty text-muted-foreground">
          I&rsquo;m open to new grad and internship roles, and always happy to
          talk about AI-assisted development, developer tools, or anything
          you&rsquo;re building. The fastest way to reach me is email.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <a
            className="inline-flex items-center gap-2 rounded-sm bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
            href={`mailto:${USER.email}`}
          >
            <MailIcon className="size-4" aria-hidden />
            {USER.email}
          </a>

          <a
            className="inline-flex items-center gap-1.5 rounded-sm border border-edge px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileTextIcon className="size-3.5 text-muted-foreground" aria-hidden />
            Resume
          </a>

          {[github, linkedin].map(
            (link) =>
              link && (
                <a
                  key={link.href}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-edge px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                  <ArrowUpRightIcon className="size-3.5 text-muted-foreground" aria-hidden />
                </a>
              )
          )}
        </div>
      </PanelContent>
    </Panel>
  );
}
