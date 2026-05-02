export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      "Go",
      "Java",
      "C",
      "C++",
      "TypeScript",
      "JavaScript (ES6+)",
      "Python",
      "SQL",
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Architecture",
    items: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "React.js",
      "Next.js",
      "GraphQL",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    id: "databases-cache",
    title: "Databases & Cache",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "AWS (EC2, S3)",
      "GCP",
      "GitLab CI/CD",
      "GitHub Actions",
      "Nginx",
      "Linux",
    ],
  },
  {
    id: "tools-integrations",
    title: "Tools & Integrations",
    items: [
      "Git",
      "WebSockets",
      "WebRTC",
      "OpenAI APIs",
      "Google Cloud STT/TTS",
      "Stripe",
      "Postman",
      "Maven",
      "NPM",
    ],
  },
  {
    id: "concepts",
    title: "Testing & Concepts",
    items: [
      "Jest",
      "JUnit",
      "Valgrind",
      "Distributed Systems",
      "System Design",
      "SOLID",
      "Design Patterns",
      "Multithreading",
      "Real-Time Streaming",
      "Observability",
      "Agile / Scrum",
      "AI Integration",
    ],
  },
];
