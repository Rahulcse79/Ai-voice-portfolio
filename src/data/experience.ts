export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    id: "coral-telecom-software-engineer",
    role: "Software Engineer",
    company: "Coral Telecom",
    duration: "Dec 2023 – Present",
    responsibilities: [
      "Designed and developed scalable, high-performance web applications used in enterprise-grade telecom and IVR solutions.",
      "Built and maintained modular, maintainable systems using modern frameworks, TypeScript, and RESTful microservices architecture.",
      "Integrated AI/ML-driven features and real-time communication workflows to improve automation and reduce manual operational overhead.",
      "Collaborated closely with product managers and stakeholders to translate complex business requirements into efficient technical solutions.",
      "Actively participated in code reviews, performance optimization, and system design discussions to ensure reliability and scalability.",
    ],
  },
];
