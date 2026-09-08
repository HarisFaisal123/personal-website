import type { User } from "../types";

export const USER: User = {
  displayName: "Haris Faisal",
  role: "Software Developer",
  tagline:
    "Computer Science Specialist at the University of Toronto building AI-powered products, full-stack applications, and developer tools.",
  avatar: "/images/avatar.jpg",
  cover: "/images/workspace.svg",
  initials: "HF",
  location: "Toronto, Canada",
  locationMapUrl:
    "https://www.google.com/maps/search/?api=1&query=Toronto%2C%20Canada",
  email: "haris.faisal@mail.utoronto.ca",
  jobs: [
    {
      title: "Ex Software Developer, PEY Co-op",
      company: "BorderPass",
    },
    {
      title: "Computer Science Specialist",
      company: "University of Toronto",
      website: "https://www.utoronto.ca",
    },
  ],
  about: [
    "I'm a Computer Science Specialist at the University of Toronto who enjoys building software across the stack — from interactive frontends and backend systems to AI-powered applications and data infrastructure.",
    "I've worked professionally on full-stack applications, AI automation, cloud infrastructure, and data/ML infrastructure. I'm particularly interested in AI-assisted development, developer tools, RAG systems, and building products that solve real problems.",
    "I like working on projects where I have to learn something new, whether that's building an AI tutor for computer architecture students, visualizing RISC-V processors, or developing production software used by hundreds of applications.",
  ],
};
