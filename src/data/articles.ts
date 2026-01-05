export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  formattedDate: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "ai-voice-agent",
    title: "Building a Real-Time AI Voice Agent with Human Escalation",
    summary:
      "How I designed and implemented a real-time AI/ML-powered voice agent that seamlessly escalates to human operators, integrating OpenAI APIs, WebRTC, and live sensor data for enterprise telecom.",
    date: "2025-11-10",
    formattedDate: "Nov 10, 2025",
    tags: ["AI", "Voice", "OpenAI", "WebRTC", "Real-Time"],
  },
  {
    id: "geofencing-tracker",
    title: "End-to-End Geofencing and Live Tracking with IoT Hardware",
    summary:
      "A deep dive into building a scalable geofencing platform using React, Node.js, and Arduino, with real-time GPS/SIM integration and OTP-based verification for secure, reliable tracking.",
    date: "2025-09-22",
    formattedDate: "Sep 22, 2025",
    tags: ["IoT", "Geofencing", "GPS", "Arduino", "Node.js"],
  },
  {
    id: "scalable-web-architecture",
    title: "Designing Scalable Web Architectures for Telecom Solutions",
    summary:
      "Lessons learned from architecting and optimizing high-performance web applications in the telecom industry, focusing on modularity, microservices, and real-time communication workflows.",
    date: "2025-07-15",
    formattedDate: "Jul 15, 2025",
    tags: ["Web", "Architecture", "Telecom", "Microservices"],
  },
  {
    id: "ai-integration-enterprise",
    title: "Integrating AI/ML into Enterprise Workflows: A Practical Guide",
    summary:
      "A practical guide to embedding AI/ML-driven features into existing enterprise systems, with a focus on automation, reliability, and measurable business impact.",
    date: "2025-05-30",
    formattedDate: "May 30, 2025",
    tags: ["AI", "ML", "Enterprise", "Automation"],
  },
];
