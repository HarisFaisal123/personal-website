import type { TechStackGroup } from "../types";

export const TECH_STACK: TechStackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "JavaFX"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: ["Node.js", "GraphQL", "FastAPI", "Django", "Spring", "Prisma"],
  },
  {
    id: "ai-data",
    label: "AI & Data",
    items: [
      "RAG",
      "OpenAI",
      "Gemini",
      "Vector Search",
      "Apache Iceberg",
      "Trino",
      "PyIceberg",
      "Polars",
    ],
  },
  {
    id: "infra",
    label: "Infrastructure & Tools",
    items: [
      "AWS S3",
      "AWS EC2",
      "AWS ECS",
      "AWS Lambda",
      "Docker",
      "Redis",
      "BullMQ",
      "Playwright",
      "Cypress",
      "Jest",
      "Git",
    ],
  },
];
