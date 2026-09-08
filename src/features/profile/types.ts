export type Job = {
  title: string;
  company: string;
  website?: string;
};

export type User = {
  displayName: string;
  role: string;
  tagline: string;
  avatar: string;
  /** Wide illustration shown as the banner above the profile header. */
  cover: string;
  initials: string;
  location: string;
  locationMapUrl: string;
  email: string;
  jobs: Job[];
  about: string[];
};

export type SocialLink = {
  icon: "github" | "linkedin" | "mail" | "globe";
  title: string;
  handle: string;
  href: string;
  description: string;
};

export type TechStackGroup = {
  id: string;
  label: string;
  items: string[];
};

export type ExperiencePosition = {
  id: string;
  title: string;
  employmentType: string;
  /** `end` omitted means the role is ongoing. */
  period: { start: string; end?: string };
  location: string;
  /** Rendered as a bulleted list inside the collapsible body. */
  highlights: string[];
  skills: string[];
  /** Current role opens by default; past roles start collapsed. */
  isExpanded?: boolean;
};

export type Experience = {
  id: string;
  companyName: string;
  /** Path to the company's logo mark. Falls back to an initial-letter badge when omitted. */
  companyLogo?: string;
  isCurrentEmployer?: boolean;
  /**
   * Company-level recognition (awards, rankings) shown under the company
   * name — distinct from a position's `highlights`, which are the individual
   * contributor's own work, not something the company earned as a whole.
   */
  companyAchievements?: string[];
  positions: ExperiencePosition[];
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  /** One-line summary, always visible on the collapsed card. */
  summary: string;
  /** Longer copy revealed by "Learn more". */
  details: string[];
  skills: string[];
  link?: string;
  /**
   * Path to this project's architecture diagram, unique per project so a real
   * one can be dropped in later without touching any other card. When omitted
   * the card renders a labelled empty frame instead.
   */
  architectureImage?: string;
  /**
   * Intrinsic pixel size of `architectureImage`. Supplying it lets the browser
   * reserve the right amount of space before the file loads, so expanding a
   * card does not shift the content underneath it.
   */
  architectureSize?: { width: number; height: number };
  architectureCaption?: string;
  isExpanded?: boolean;
};
