import { RealtimeItem, tool } from "@openai/agents/realtime";
import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const supervisorAgentInstructions = `
You are a personal resume AI assistant for Rahul Singh.
Your responses will be read directly to the user.

================ LANGUAGE RULES =================
- Detect the user's language from their most recent clear message.
- Reply ONLY in that same language.
- Do NOT mix languages in a single response.
- If the user's last message is short or ambiguous (e.g. "ok", "yes", numbers),
  continue using the previous clear language.
- Translate ONLY if the user explicitly asks for translation.

================ ROLE =================
- Speak only about Rahul Singh’s resume, experience, projects, skills, and background.
- Answer questions as if you are explaining Rahul’s profile to a recruiter or interviewer.
- Be accurate and factual based on the provided data.

================ RESPONSE STYLE =================
- Professional
- Clear
- Confident
- Concise
- Voice-friendly (no bullet lists)
- Natural spoken tone

================ AVAILABLE RESUME DATA =================
You MUST rely only on this data:
- profile
- experiences
- projects
- skills
- education
- achievements

================ OUTPUT RULE =================
- Produce a single, natural spoken response.
- If clarification is needed, ask one short follow-up question.
`;

export const getNextResponseFromResumeAiAgent = tool({
  name: "getNextResponseFromResumeAiAgent",
  description:
    "Generates the next resume-focused response using Rahul Singh's resume data.",
  parameters: {
    type: "object",
    properties: {
      relevantContextFromLastUserMessage: {
        type: "string",
        description:
          "Key intent or information from the user's most recent message.",
      },
    },
    required: ["relevantContextFromLastUserMessage"],
    additionalProperties: false,
  },

  execute: async (input, details) => {
    const { relevantContextFromLastUserMessage } = input as {
      relevantContextFromLastUserMessage: string;
    };

    const history: RealtimeItem[] = (details?.context as any)?.history ?? [];
    const conversationHistory = history.filter(
      (item) => item.type === "message"
    );

    const body = {
      model: "gpt-4.1",
      input: [
        {
          type: "message",
          role: "system",
          content: supervisorAgentInstructions,
        },
        {
          type: "message",
          role: "user",
          content: `
==== PROFILE ====
${JSON.stringify(profile, null, 2)}

==== EXPERIENCE ====
${JSON.stringify(experiences, null, 2)}

==== PROJECTS ====
${JSON.stringify(projects, null, 2)}

==== SKILLS ====
${JSON.stringify(skills, null, 2)}

==== EDUCATION ====
${JSON.stringify(education, null, 2)}

==== ACHIEVEMENTS ====
${JSON.stringify(achievements, null, 2)}

==== CONVERSATION HISTORY ====
${JSON.stringify(conversationHistory, null, 2)}

==== USER QUESTION / CONTEXT ====
${relevantContextFromLastUserMessage}
`,
        },
      ],
    };

    const response = await fetch("/api/aiAssistance/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return { error: "Failed to generate response." };
    }

    const completion = await response.json();
    const outputItems = completion.output ?? [];

    const finalText = outputItems
      .filter((item: any) => item.type === "message")
      .flatMap((msg: any) => msg.content ?? [])
      .filter((c: any) => c.type === "output_text")
      .map((c: any) => c.text)
      .join("");

    return { nextResponse: finalText };
  },
});
