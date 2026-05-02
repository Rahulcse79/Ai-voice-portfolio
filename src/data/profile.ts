export interface SocialLink {
  label: "LinkedIn" | "GitHub" | "LeetCode" | "Twitter";
  url: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  roles: string[];
  headline: string;
  tagline: string;
  specialties: string[];
  location: string;
  email?: string;
  phone?: string;
  summary: string;
  bio: string;
  resumeUrl?: string;
  availability?: string;
  metrics: Metric[];
  socialLinks: SocialLink[];
}

export const profile: Profile = {
  name: "Rahul Singh",
  firstName: "Rahul",
  lastName: "Singh",
  nickname: "Most people call me Rahul.",
  role: "Software Engineer",
  roles: [
    "Software Engineer @ Coral Telecom",
    "Distributed Systems · Go · TypeScript · Java",
    "Real-Time AI · WebRTC · OpenAI Realtime",
    "Backend · Microservices · PostgreSQL · Redis",
  ],
  headline:
    "Building scalable, low-latency distributed systems and real-time AI products.",
  tagline: "Software Engineer at Coral Telecom — Noida",
  specialties: [
    "Distributed Systems",
    "Real-Time AI",
    "WebRTC",
    "Go · TypeScript",
    "Cloud · AWS · GCP",
  ],
  location: "Noida, India",
  email: "rahul.singh.cse79@gmail.com",
  phone: "+91-9752079591",
  availability:
    "Open to Senior / Staff SDE roles · Remote · Hybrid (Noida / Bengaluru)",
  summary:
    "Software Engineer with 2.5+ years building scalable, low-latency distributed systems in Go, TypeScript, Java, and C/C++ that serve 50K+ daily requests at 99.9% uptime. Specialised in microservices, real-time WebSocket streaming, and production AI integration on AWS and GCP.",
  bio:
    "I design and ship production systems that move real bytes for real users. At Coral Telecom I architect Go and Spring Boot microservices, drive 40% latency cuts via Redis and PostgreSQL tuning, and ship CI/CD pipelines that release in 70% less time. On the side I built a FreeSWITCH C/C++ module that streams live call audio to an OpenAI-powered backend at sub-200 ms end-to-end latency — the same engine class powering the voice agent on this site.",
  resumeUrl: "/resume/Rahul_singh_resume.pdf",
  metrics: [
    { value: "50K+", label: "Daily API requests served" },
    { value: "99.9%", label: "Production uptime" },
    { value: "40%", label: "API latency reduction" },
    { value: "<200ms", label: "Real-time AI voice latency" },
    { value: "500+", label: "LeetCode · Top 8%" },
    { value: "2.5+ yrs", label: "Production engineering" },
  ],
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/rahul-singh-a32261206/",
    },
    {
      label: "GitHub",
      url: "https://github.com/Rahulcse79",
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/rahulcse79/",
    },
  ],
};
