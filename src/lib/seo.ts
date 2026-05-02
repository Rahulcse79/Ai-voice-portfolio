import { profile } from "@/data/profile";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ai-voice-portfolio.onrender.com";

export const SITE_NAME = `${profile.name} — ${profile.role}`;
export const SITE_TITLE = `${profile.name} · ${profile.role} · Distributed Systems & Real-Time AI`;
export const SITE_DESCRIPTION = profile.summary;

export const SITE_KEYWORDS = [
  "Rahul Singh",
  "Software Engineer Noida",
  "Software Engineer India",
  "Backend Engineer",
  "Distributed Systems Engineer",
  "Go developer India",
  "TypeScript developer",
  "Spring Boot",
  "Microservices",
  "Real-time WebSocket",
  "OpenAI Realtime",
  "WebRTC",
  "FreeSWITCH C++",
  "AI Voice Agent",
  "Coral Telecom",
  "FAANG portfolio",
  "Senior SDE India",
];

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  email: profile.email ? `mailto:${profile.email}` : undefined,
  telephone: profile.phone,
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/rahul.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "Coral Telecom",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NRI Institute of Science and Technology, Bhopal",
  },
  knowsAbout: [
    "Distributed Systems",
    "Microservices",
    "Real-Time Streaming",
    "WebRTC",
    "OpenAI Realtime API",
    "Go (Golang)",
    "TypeScript",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "GCP",
    "AWS",
  ],
  sameAs: profile.socialLinks.map((link) => link.url),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
  },
};
