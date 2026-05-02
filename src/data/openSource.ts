export interface OpenSourceContribution {
  id: string;
  project: string;
  upstream: string;
  upstreamUrl: string;
  forkUrl: string;
  description: string;
  language: string;
  emoji: string;
  tags: string[];
  category: "Payments" | "Telecom" | "AI Platform" | "Mapping" | "Messaging" | "Community";
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: "hyperswitch",
    project: "Hyperswitch",
    upstream: "juspay/hyperswitch",
    upstreamUrl: "https://github.com/juspay/hyperswitch",
    forkUrl: "https://github.com/Rahulcse79/hyperswitch",
    description:
      "Open-source payments switch written in Rust to make payments fast, reliable and affordable. Working on connector orchestration and the core router.",
    language: "Rust",
    emoji: "💳",
    tags: ["Rust", "Payments", "Router", "Connectors"],
    category: "Payments",
  },
  {
    id: "hyperswitch-web",
    project: "Hyperswitch Web SDK",
    upstream: "juspay/hyperswitch-web",
    upstreamUrl: "https://github.com/juspay/hyperswitch-web",
    forkUrl: "https://github.com/Rahulcse79/hyperswitch-web",
    description:
      "ReScript-powered React library for seamless payment integration and customisation. Frontend SDK for the Hyperswitch payments switch.",
    language: "ReScript",
    emoji: "🧩",
    tags: ["ReScript", "React", "Payments SDK", "Frontend"],
    category: "Payments",
  },
  {
    id: "archestra",
    project: "Archestra",
    upstream: "archestra-ai/archestra",
    upstreamUrl: "https://github.com/archestra-ai/archestra",
    forkUrl: "https://github.com/Rahulcse79/archestra",
    description:
      "Enterprise AI platform with guardrails, MCP registry, gateway and orchestrator. Building the production rails for safe agentic AI deployments.",
    language: "TypeScript",
    emoji: "🛡️",
    tags: ["TypeScript", "MCP", "Guardrails", "AI Platform"],
    category: "AI Platform",
  },
  {
    id: "open5gs",
    project: "Open5GS",
    upstream: "open5gs/open5gs",
    upstreamUrl: "https://github.com/open5gs/open5gs",
    forkUrl: "https://github.com/Rahulcse79/open5gs",
    description:
      "C-language open-source implementation for 5G Core and EPC — the core network of LTE/NR (Release-17). Contributing on the telecom side that pairs with my day job at Coral.",
    language: "C",
    emoji: "📡",
    tags: ["C", "5G Core", "EPC", "Telecom"],
    category: "Telecom",
  },
  {
    id: "mod-audio-stream",
    project: "FreeSWITCH mod_audio_stream",
    upstream: "amigniter/mod_audio_stream",
    upstreamUrl: "https://github.com/amigniter/mod_audio_stream",
    forkUrl: "https://github.com/Rahulcse79/mod_audio_stream-1",
    description:
      "FreeSWITCH module that streams call audio to a WebSocket and receives responses — the upstream that powers my AI IVR voice agent. Contributing buffering and resampling fixes.",
    language: "C++",
    emoji: "🔊",
    tags: ["C++", "FreeSWITCH", "WebSockets", "Voice"],
    category: "Telecom",
  },
  {
    id: "google-maps-services-python",
    project: "Google Maps Services (Python)",
    upstream: "googlemaps/google-maps-services-python",
    upstreamUrl: "https://github.com/googlemaps/google-maps-services-python",
    forkUrl: "https://github.com/Rahulcse79/google-maps-services-python",
    description:
      "Official Python client library for Google Maps API web services. Contributed maintenance fixes and request-handling improvements.",
    language: "Python",
    emoji: "🗺️",
    tags: ["Python", "Google Maps", "REST", "SDK"],
    category: "Mapping",
  },
  {
    id: "matrix-sliding-sync",
    project: "Matrix Sliding-Sync Proxy",
    upstream: "matrix-org/sliding-sync",
    upstreamUrl: "https://github.com/matrix-org/sliding-sync",
    forkUrl: "https://github.com/Rahulcse79/whatsapp-clone-sliding-sync",
    description:
      "Go implementation of the Matrix sliding-sync proxy (MSC3575). Used as the low-latency room-sync backend behind my WhatsApp-clone messaging stack.",
    language: "Go",
    emoji: "📨",
    tags: ["Go", "Matrix", "Sliding Sync", "Realtime"],
    category: "Messaging",
  },
  {
    id: "first-contributions",
    project: "First Contributions",
    upstream: "firstcontributions/first-contributions",
    upstreamUrl: "https://github.com/firstcontributions/first-contributions",
    forkUrl: "https://github.com/Rahulcse79/first-contributions",
    description:
      "Helping beginners make their very first open-source contribution. Mentoring + docs improvements.",
    language: "Docs",
    emoji: "🚀",
    tags: ["Open Source", "Mentoring", "Docs"],
    category: "Community",
  },
];
