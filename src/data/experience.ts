export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  duration: string;
  techStack?: string[];
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    id: "coral-telecom-software-engineer",
    role: "Software Engineer",
    company: "Coral Telecom",
    location: "Noida, India",
    duration: "Dec 2023 – Present",
    techStack: [
      "Go",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "GitLab CI/CD",
      "WebSockets",
    ],
    responsibilities: [
      "Architected 12+ RESTful microservices in Go, Node.js, and Spring Boot serving 50K+ daily API requests at 99.9% uptime across distributed production environments.",
      "Reduced API latency 40% via Redis caching, PostgreSQL query plan optimisation, and connection pooling across high-throughput services.",
      "Engineered CI/CD pipelines on Docker and GitLab CI, cutting deployment time 70% and enabling zero-downtime releases to production.",
      "Delivered real-time modules using WebSockets and Server-Sent Events, powering sub-second streaming for enterprise monitoring dashboards across 20+ tenants.",
      "Authored unit and integration tests with Jest and JUnit, achieving 85%+ code coverage and reducing regression incidents by 45%.",
      "Led 50+ code reviews enforcing SOLID and clean architecture, cutting post-release defects 30%; mentored 3 junior engineers (2-week faster onboarding).",
    ],
  },
];
