import { Panel, PanelContent, PanelHeader } from "@/components/panel";
import { GITHUB_USERNAME } from "@/config/site";

import { getGithubContributions } from "../data/github-contributions";
import { monthLabels, toWeeks, totalCount } from "../lib/contribution-graph";
import { GithubContributionGrid } from "./github-contributions-grid";

const LEVEL_FILL = [
  "var(--edge)",
  "color-mix(in oklch, var(--accent) 32%, var(--edge))",
  "color-mix(in oklch, var(--accent) 56%, var(--edge))",
  "color-mix(in oklch, var(--accent) 80%, var(--edge))",
  "var(--accent)",
];

/**
 * Server Component: the fetch happens at build/revalidate time, not in the
 * browser, so there is no client-side loading state to design around. If the
 * API has nothing to say, the section simply isn't rendered — a visitor
 * should never see a broken graph.
 */
export async function GithubContributions() {
  const activities = await getGithubContributions();
  if (activities.length === 0) return null;

  const weeks = toWeeks(activities);
  const months = monthLabels(weeks);
  const total = totalCount(activities);

  return (
    <Panel id="github-activity" aria-labelledby="github-activity-title">
      <PanelHeader id="github-activity-title" index="01" title="GitHub activity" />

      <PanelContent>
        <GithubContributionGrid weeks={weeks} months={months} total={total} />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
          <p className="text-muted-foreground">
            {total.toLocaleString("en")} contributions in the last year on{" "}
            <a
              className="font-medium text-foreground underline decoration-edge-strong underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>

          <div
            className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground"
            aria-hidden
          >
            <span>Less</span>
            {LEVEL_FILL.map((fill, level) => (
              <span
                key={level}
                className="size-2.5 rounded-[2px]"
                style={{ backgroundColor: fill }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
