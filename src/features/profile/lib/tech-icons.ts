import {
  AppWindow,
  Archive,
  Braces,
  Container,
  Drama,
  FileSearch,
  ListOrdered,
  type LucideIcon,
  Radar,
  Server,
  Sparkles,
  Table2,
  Zap,
} from "lucide-react";
import {
  siClaude,
  siCplusplus,
  siCypress,
  siDjango,
  siDocker,
  siFastapi,
  siGit,
  siGooglegemini,
  siGraphql,
  siJavascript,
  siJest,
  siMistralai,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPolars,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siSpring,
  siTrino,
  siTypescript,
} from "simple-icons";

type Brand = { title: string; hex: string; path: string };

/**
 * Display name -> brand mark. Anything absent here renders a monogram instead,
 * which is deliberate: simple-icons has removed OpenAI, the AWS family,
 * Playwright, Apache Iceberg and Cohere over trademark requests, and several
 * entries (RAG, Vector Search, BullMQ, JavaFX) have no brand mark at all.
 */
const BRANDS: Record<string, Brand | undefined> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  // Oracle's Java mark is not distributable; OpenJDK is the usual stand-in.
  Java: siOpenjdk,
  "C++": siCplusplus,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  GraphQL: siGraphql,
  FastAPI: siFastapi,
  Django: siDjango,
  Spring: siSpring,
  Prisma: siPrisma,
  Gemini: siGooglegemini,
  Trino: siTrino,
  Polars: siPolars,
  Docker: siDocker,
  Redis: siRedis,
  Cypress: siCypress,
  Jest: siJest,
  Git: siGit,
  "Claude API": siClaude,
};

/**
 * Stand-in glyphs for entries with no distributable brand mark. These are
 * generic lucide icons, kept in the muted text colour so they read as
 * descriptive rather than pretending to be a logo.
 */
const GENERIC: Record<string, LucideIcon | undefined> = {
  JavaFX: AppWindow,
  RAG: FileSearch,
  OpenAI: Sparkles,
  "Vector Search": Radar,
  "Apache Iceberg": Table2,
  PyIceberg: Braces,
  "AWS S3": Archive,
  "AWS EC2": Server,
  "AWS ECS": Container,
  "AWS Lambda": Zap,
  BullMQ: ListOrdered,
  // Playwright's own mark is a theatre mask, so this one is close to the real thing.
  Playwright: Drama,
};

export type TechIcon =
  | { kind: "brand"; path: string; light: string; dark: string }
  | { kind: "generic"; Icon: LucideIcon }
  | { kind: "monogram"; letter: string };

export function getTechIcon(name: string): TechIcon {
  const brand = BRANDS[name];
  if (brand) {
    const { light, dark } = themeSafeColors(brand.hex);
    return { kind: "brand", path: brand.path, light, dark };
  }

  const Icon = GENERIC[name];
  if (Icon) return { kind: "generic", Icon };

  return { kind: "monogram", letter: name.charAt(0) };
}

/**
 * Brand hexes are picked for a white page, so a few (Next.js #000, OpenJDK #000,
 * Django #092E20) disappear on a dark one. Keep the hue and clamp lightness into
 * a readable band per theme; near-greyscale marks just follow the text color,
 * which is how those brands present themselves anyway.
 */
function themeSafeColors(hex: string) {
  const { h, s, l } = hexToHsl(hex);

  if (s < 0.08) {
    return { light: "var(--foreground)", dark: "var(--foreground)" };
  }

  return {
    light: hsl(h, s, clamp(l, 0.2, 0.5)),
    dark: hsl(h, s, clamp(l, 0.6, 0.85)),
  };
}

function hexToHsl(hex: string) {
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) return { h: 0, s: 0, l };

  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;

  return { h: (h * 60 + 360) % 360, s, l };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const hsl = (h: number, s: number, l: number) =>
  `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
