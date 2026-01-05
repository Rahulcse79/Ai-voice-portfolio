export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["Java", "C++", "JavaScript", "TypeScript", "Go"],
  },
  {
    id: "frameworks",
    title: "Frameworks & Architecture",
    items: [
      "Spring Boot",
      "Node.js",
      "React.js",
      "Express.js",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    id: "databases-tools",
    title: "Databases & Tools",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Maven",
      "Gradle",
      "NPM",
      "Git",
      "GitHub",
      "GitLab",
      "CI/CD",
    ],
  },
  {
    id: "other",
    title: "Other Skills",
    items: [
      "Data Structures & Algorithms",
      "Low-Level Design",
      "Multithreading",
      "OpenAI APIs",
      "Prompt Engineering",
      "AI Integration",
      "Real-Time Streaming",
      "Postman",
      "Linux",
      "VS Code",
      "ChatGPT",
      "GitHub Copilot",
    ],
  },
];
