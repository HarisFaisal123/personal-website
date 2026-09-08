import type { Project } from "../types";

/** Featured work — rendered expanded by default. */
export const FEATURED_PROJECTS: Project[] = [
  {
    id: "instructli",
    title: "Instructli",
    subtitle: "AI Personal Tutor for CSC258",
    summary:
      "A retrieval-augmented tutor that grounds every answer in real CSC258 course material, paired with interactive CPU datapath visualizations.",
    details: [
      "A RAG-based question-answering system that retrieves relevant course material before generating a response, so answers stay grounded in what students were actually taught rather than in a model's general knowledge.",
      "The backend is built in FastAPI and the frontend in React and TypeScript. Course content is embedded and stored in a vector database, and semantic retrieval selects the passages that get passed to the model as context.",
      "Generation is routed across OpenAI, Gemini, Mistral, and Cohere, which makes it straightforward to compare model behaviour on the same retrieved context.",
      "Alongside the tutor, the app renders interactive visualizations of single-cycle, multicycle, and pipelined CPU designs, stepping through the IF, ID, EX, MEM, and WB stages so students can see how an instruction moves through the datapath.",
    ],
    skills: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "RAG",
      "OpenAI",
      "Gemini",
      "Mistral",
      "Cohere",
      "Vector Search",
    ],
    architectureImage: "/images/projects/instructli-architecture.svg",
    architectureSize: { width: 880, height: 470 },
    architectureCaption:
      "Retrieval path: course material is embedded once, then every question is embedded, matched against the vector store, and answered from the retrieved context.",
    isExpanded: true,
  },
  {
    id: "mergent",
    title: "Mergent",
    subtitle: "Autonomous PR-Generating Agent Pipeline",
    summary:
      "An autonomous multi-agent pipeline that generates pull requests from scratch — given a task, it explores the codebase, writes the change, tests it in a sandbox, and opens a verified PR, rather than reviewing PRs someone else already opened.",
    details: [
      "Given a task or issue, an Explorer agent first works through the codebase to figure out its structure and pull out the files and context relevant to the task, before any code gets written.",
      "A Coder agent then takes what the Explorer found and generates the actual code change for the task.",
      "An apply step writes that generated change to the repository and runs it in a Docker sandbox against the test suite.",
      "If the tests fail, the Coder agent automatically retries with that feedback until they pass, then opens the pull request — closing the loop from generated code to verified code.",
    ],
    skills: [
      "Claude",
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Docker",
      "React",
    ],
    architectureImage: "/images/projects/mergent-architecture.svg",
    architectureSize: { width: 880, height: 480 },
    architectureCaption:
      "A task is queued through Redis; an Explorer agent maps the codebase, a Coder agent generates the change, and an apply step runs it in a Docker sandbox. A retry loop re-runs the Coder agent until the tests pass, then the verified pull request is opened.",
    isExpanded: true,
  },
];

/** Everything else — collapsed by default. */
export const OTHER_PROJECTS: Project[] = [
  {
    id: "flynext",
    title: "FlyNext",
    subtitle: "Full-stack travel application",
    summary:
      "A full-stack booking application built with Next.js and Prisma, containerized with Docker behind an Nginx reverse proxy.",
    details: [
      "A full-stack application built with Next.js, Prisma, and TypeScript, covering both the user-facing interface and the data layer behind it.",
      "Deployment is containerized with Docker and served through Nginx as a reverse proxy.",
    ],
    skills: ["Next.js", "Prisma", "TypeScript", "Docker", "Nginx"],
  },
  {
    id: "colossal-adventure",
    title: "Colossal Adventure",
    subtitle: "GUI adventure game",
    summary:
      "A Java and JavaFX adventure game built to WCAG accessibility guidelines, developed in a Scrum team with SOLID and UML design practices.",
    details: [
      "A graphical adventure game written in Java with JavaFX, unit tested with JUnit and version controlled with Git.",
      "Built by a team working in Scrum, with the interface designed against WCAG accessibility guidelines.",
      "The codebase was structured around SOLID design principles and documented with UML diagrams.",
    ],
    skills: [
      "Java",
      "JavaFX",
      "JUnit",
      "Git",
      "Scrum",
      "WCAG Accessibility",
      "SOLID",
      "UML",
    ],
  },
  {
    id: "computer-networks",
    title: "Computer Networks Course Project",
    subtitle: "Client/server networking in C++",
    summary:
      "A client/server networking project written in C++, implementing the protocol and connection handling from the socket layer up.",
    details: [
      "A course project implementing client/server communication in C++, working directly with sockets to handle connections, message framing, and the request/response cycle.",
    ],
    skills: ["C++", "Sockets", "Client/Server", "Networking"],
  },
];
