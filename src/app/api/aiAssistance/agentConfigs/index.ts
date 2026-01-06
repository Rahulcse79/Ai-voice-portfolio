import { ResumeAiAgent } from "./ResumeAiAgent";
import { RealtimeAgent } from "@openai/agents/realtime";

export const allAgentSets: Record<string, RealtimeAgent[]> = {
  ResumeAiScenario: ResumeAiAgent,
};

export const defaultAgentSetKey = "ResumeAiScenario";