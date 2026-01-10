import { StoreAiAgent } from "./AiAgent";
import { RealtimeAgent } from "@openai/agents/realtime";

export const allAgentSets: Record<string, RealtimeAgent[]> = {
  StoreAiScenario: StoreAiAgent,
};

export const defaultAgentSetKey = "StoreAiScenario";