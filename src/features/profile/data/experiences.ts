import type { Experience } from "../types";

export const EXPERIENCES: Experience[] = [
  {
    id: "borderpass",
    companyName: "BorderPass",
    companyLogo: "/images/companies/borderpass.jpg",
    companyAchievements: [
      "Financial Times: ranked number 13 overall and number 2 in Canada on the Financial Times Americas' Fastest Growing Companies 2026 list.",
      "Deloitte & Globe and Mail: named to Deloitte's 2025 Technology Fast 50 and ranked number 27 on The Globe and Mail's 2025 Top Growing Companies list.",
    ],
    positions: [
      {
        id: "borderpass-pey",
        title: "Software Developer, PEY Co-op",
        employmentType: "Co-op",
        period: { start: "Sept 2025", end: "Aug 2026" },
        location: "Toronto, Canada",
        isExpanded: true,
        highlights: [
          "Developed production full-stack applications using React, TypeScript, Node.js, and GraphQL.",
          "Designed GraphQL APIs connecting React frontends to Node.js backends.",
          "Built multi-step data-intake workflows in React and TypeScript.",
          "Integrated AI-powered document parsing and generative AI into immigration workflows.",
          "Automated immigration pathway evaluation across 800+ applications, cutting processing time by roughly 50%.",
          "Built asynchronous job workflows with BullMQ and Redis.",
          "Built AWS Lambda functions for document compression and merging via S3.",
          "Used AWS S3, EC2, ECS, and Vercel for infrastructure and deployment.",
          "Automated testing with Playwright, Cypress, and Jest.",
        ],
        skills: [
          "React",
          "TypeScript",
          "Node.js",
          "GraphQL",
          "Generative AI",
          "BullMQ",
          "Redis",
          "AWS Lambda",
          "AWS S3",
          "AWS ECS",
          "Playwright",
          "Cypress",
          "Jest",
        ],
      },
    ],
  },
  {
    id: "denovonet",
    companyName: "Denovonet",
    positions: [
      {
        id: "denovonet-intern",
        title: "Software Engineering Intern, Data & ML Infrastructure",
        employmentType: "Internship",
        period: { start: "May 2025", end: "Aug 2025" },
        location: "Toronto, Canada",
        highlights: [
          "Built Django backend APIs querying Apache Iceberg tables stored in AWS S3.",
          "Used Trino for large-scale analytical queries, with PyIceberg and Polars for downstream processing.",
          "Containerized services with Docker.",
          "Built React dashboards with Vis.js and Recharts.",
        ],
        skills: [
          "Django",
          "Python",
          "Apache Iceberg",
          "Trino",
          "PyIceberg",
          "Polars",
          "Docker",
          "React",
          "AWS S3",
        ],
      },
    ],
  },
  {
    id: "softech",
    companyName: "Softech Systems Pvt. Limited",
    companyLogo: "/images/companies/softech.jpg",
    positions: [
      {
        id: "softech-intern",
        title: "Software Engineering Intern",
        employmentType: "Internship",
        period: { start: "May 2024", end: "Aug 2024" },
        location: "Remote",
        highlights: [
          "Implemented backend functionality in Java and Spring.",
          "Handled database interactions through JDBC and MySQL.",
          "Contributed to backend and API development following object-oriented design practices.",
        ],
        skills: ["Java", "Spring", "JDBC", "MySQL", "OOP"],
      },
    ],
  },
];
