import type { CourseworkGroup } from "../types";

/**
 * University of Toronto Computer Science Specialist coursework, grouped by
 * area rather than by year so the section reads as a map of what I've studied.
 */
export const COURSEWORK: CourseworkGroup[] = [
  {
    id: "systems",
    label: "Systems",
    courses: [
      {
        code: "CSC258",
        title: "Computer Organization",
      },
      { code: "CSC209", title: "Software Tools & Systems Programming" },
      { code: "CSC367", title: "Parallel Programming" },
      { code: "CSC369", title: "Operating Systems" },
      { code: "CSC343", title: "Introduction to Databases" },
      { code:"CSC358", title: "Computer Networks" }
    ],
  },
  {
    id: "theory",
    label: "Theory & Algorithms",
    courses: [
      { code: "CSC236", title: "Introduction to the Theory of Computation" },
      { code: "CSC263", title: "Data Structures & Analysis" },
      { code:"CSC363", title: "Introduction to Complexity Theory"},
      { code: "CSC373", title: "Algorithm Design & Analysis" },
      { code: "CSC367", title: "Introduction to Robotics"}
    ],
  },
  {
    id: "software",
    label: "Software Design",
    courses: [
      { code: "CSC207", title: "Software Design" },
      { code: "CSC209", title: "Software Tools & Systems Programming" },
      {
        code: "CSC309",
        title: "Web Developement",
      },
      { code: "CSC148", title: "Introduction to Computer Science" },
    ],
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    courses: [
      { code: "CSC311", title: "Introduction to Machine Learning" },
      { code: "CSC413", title: "Neural Networks" },
      { code: "CSC420", title: "Image Understanding" },
    ],
  },
];
