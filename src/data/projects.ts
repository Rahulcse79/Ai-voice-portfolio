export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: "AI" | "Web" | "IoT";
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "ai-voice-agent",
    title: "AI/ML-Based Real-Time Voice Agent with Human Monitoring System",
    description:
      "Designed and built a real-time AI voice agent using OpenAI Realtime APIs, featuring intelligent call escalation to human agents only when required. Integrated an immersive human hologram interface and hardware sensors for live physiological monitoring, enabling low-latency, context-aware conversations while significantly reducing operational workload.",
    category: "AI",
    techStack: [
      "OpenAI Realtime API",
      "AI/ML",
      "Next.js",
      "TypeScript",
      "WebRTC",
      "Real-Time Streaming",
      "Sensor Integration",
    ],
    github: "https://github.com/your-username/ai-voice-agent",
    live: "https://your-live-demo.com",
  },
  {
    id: "geofencing-tracker",
    title: "Geofencing Live Tracker",
    description:
      "Developed a scalable real-time geofencing and live tracking platform with route detection, OTP-based verification, and automated alerting. Integrated GPS and SIM modules using Arduino for reliable real-world hardware connectivity and end-to-end live location monitoring.",
    category: "IoT",
    techStack: ["React", "Node.js", "MongoDB", "Arduino", "GPS", "SIM Modules"],
    github: "https://github.com/your-username/geofencing-tracker",
  },
];
