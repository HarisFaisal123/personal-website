import { GITHUB_USERNAME } from "@/config/site";

import type { Activity } from "../lib/contribution-graph";

type ApiResponse = {
  total?: Record<string, number>;
  contributions?: Activity[];
};

/**
 * Free, unofficial API that mirrors GitHub's own contribution calendar —
 * GitHub has no public endpoint for this, only an authenticated GraphQL one.
 * Revalidated once a day rather than fetched on every request.
 *
 * Never throws: a network hiccup or an outage on their end degrades to an
 * empty result, and the section that renders it just hides itself rather
 * than showing broken UI to a visitor.
 */
export async function getGithubContributions(): Promise<Activity[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 60 * 60 * 24 } }
    );

    if (!res.ok) return [];

    const data = (await res.json()) as ApiResponse;
    return Array.isArray(data.contributions) ? data.contributions : [];
  } catch {
    return [];
  }
}
