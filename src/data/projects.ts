export interface Project {
  id: string;
  title: string;
  emoji: string;
  tagline?: string;
  description: string;
  techStack: string[];
  category: "AI" | "Web" | "IoT" | "Systems" | "Mobile";
  metrics?: string[];
  year?: string;
  featured?: boolean;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "ai-voice-portfolio",
    title: "AI Voice Portfolio",
    emoji: "🎙️",
    tagline: "Real-time multilingual voice agent that answers as me",
    description:
      "Production Next.js 15 + React 19 portfolio with an embedded OpenAI Realtime voice agent. WebRTC streams audio to a supervisor-pattern agent that answers recruiter questions about my resume in any language, with output guardrails for moderation and language locking.",
    category: "AI",
    year: "2025",
    featured: true,
    metrics: [
      "OpenAI Realtime + WebRTC",
      "Multilingual auto-detect",
      "Supervisor + guardrail pattern",
    ],
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "OpenAI Realtime",
      "WebRTC",
      "Tailwind",
      "Framer Motion",
    ],
    github: "https://github.com/Rahulcse79/Ai-voice-portfolio",
    live: "https://ai-voice-portfolio.onrender.com",
  },
  {
    id: "wastemgmt-iot",
    title: "WasteMgmt — Smart Waste Platform",
    emoji: "🛰️",
    tagline: "IoT-driven city-scale waste management with live dashboards",
    description:
      "Scalable smart waste management platform that uses IoT sensors and real-time data to monitor bin levels, gas, and environment. Provides admin control, live dashboards, alerts, and analytics to optimise collection routes and improve city cleanliness efficiently.",
    category: "IoT",
    year: "2025",
    featured: true,
    metrics: [
      "Real-time bin / gas / env telemetry",
      "Admin dashboards + alerting",
      "Route optimisation analytics",
    ],
    techStack: ["TypeScript", "Next.js", "Node.js", "MongoDB", "IoT Sensors", "MQTT"],
    github: "https://github.com/Rahulcse79/WasteMgmt-Smart-Waste-Management-Platform",
  },
  {
    id: "whatsapp-clone-android",
    title: "WhatsApp Clone — Android",
    emoji: "💬",
    tagline: "Production-grade real-time messaging — 4 000+ concurrent users",
    description:
      "Production-grade, real-time messaging platform for Android built to handle 4 000+ concurrent users. End-to-end chat, presence, media uploads, and push notifications, paired with a Python backend and the Matrix-compatible sliding-sync proxy for low-latency room sync.",
    category: "Mobile",
    year: "2025",
    featured: true,
    metrics: [
      "4 000+ concurrent users",
      "Sliding-sync (MSC3575) proxy",
      "Push notifications + media",
    ],
    techStack: ["Kotlin", "Jetpack Compose", "Python", "Go", "WebSockets", "Matrix"],
    github: "https://github.com/Rahulcse79/whatsapp-clone-x-android",
  },
  {
    id: "dressly",
    title: "Dressly — AI Stylist",
    emoji: "👗",
    tagline: "Gemini-powered outfit scoring and personalised style coach",
    description:
      "AI-powered app using Google's Gemini to generate outfit suggestions from uploaded clothing images. Delivers style scores and occasion-based recommendations in real time across iOS and Android, acting as a smart digital stylist.",
    category: "AI",
    year: "2025",
    featured: true,
    metrics: [
      "Gemini multimodal vision",
      "Real-time style scoring",
      "iOS + Android cross-platform",
    ],
    techStack: ["React Native", "Gemini API", "Node.js", "Firebase"],
    github: "https://github.com/Rahulcse79/Dressly",
  },
  {
    id: "ai-ivr-voice-agent",
    title: "AI IVR Voice Agent",
    emoji: "📞",
    tagline: "FreeSWITCH C/C++ module · sub-200 ms end-to-end latency",
    description:
      "Engineered a production FreeSWITCH C/C++ module that streams live call audio over WebSockets to an AI backend at sub-200 ms end-to-end latency. Integrated Google Cloud STT/TTS to autonomously resolve 80%+ of customer queries, cutting human agent workload by 60%. L16 audio pipeline (dual-channel buffering, 8/16 kHz resampling, WAV archival) with PostgreSQL/libpq persistence.",
    category: "Systems",
    year: "2024",
    featured: true,
    metrics: [
      "<200 ms end-to-end latency",
      "80%+ queries auto-resolved",
      "100+ concurrent WS sessions",
      "Zero leaks (Valgrind)",
    ],
    techStack: ["C", "C++", "FreeSWITCH", "libwebsockets", "GCP STT/TTS", "PostgreSQL"],
    github: "https://github.com/Rahulcse79/mod_audio_stream-1",
  },
  {
    id: "redkart24x7",
    title: "RedKart24X7 — E-Commerce",
    emoji: "🛒",
    tagline: "Full-stack storefront with admin, cart, checkout & RBAC",
    description:
      "Full-stack e-commerce platform with React storefront, admin dashboard, and Node.js/Express backend in clean MVC architecture. Cart, orders, reviews, RBAC, and PCI-compliant checkout — deployed live on Vercel.",
    category: "Web",
    year: "2025",
    metrics: ["Live on Vercel", "Admin + RBAC", "Stripe-style checkout flow"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vercel"],
    github: "https://github.com/Rahulcse79/RedKart24X7",
    live: "https://red-kart24-x7.vercel.app",
  },
  {
    id: "admission-crm",
    title: "Admission Management CRM",
    emoji: "🎓",
    tagline: "Lead-to-admission CRM for higher-ed institutions",
    description:
      "TypeScript CRM platform for managing the full admissions funnel — leads, follow-ups, document workflow, role-based dashboards, and reporting — purpose-built for higher-education institutions.",
    category: "Web",
    year: "2025",
    techStack: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind"],
    github: "https://github.com/Rahulcse79/Admission_management_crm",
  },
  {
    id: "openai-realtime-agents",
    title: "OpenAI Realtime Agents Lab",
    emoji: "🤖",
    tagline: "Multi-agent realtime voice/chat experiments",
    description:
      "Sandbox for the OpenAI Realtime API — exploring supervisor-worker agent topologies, tool calling under streaming voice, guardrail composition, and language locking. The patterns proven here power the voice agent in this very portfolio.",
    category: "AI",
    year: "2024",
    techStack: ["TypeScript", "Next.js", "OpenAI Realtime", "@openai/agents"],
    github: "https://github.com/Rahulcse79/openai-realtime-agents",
  },
];
