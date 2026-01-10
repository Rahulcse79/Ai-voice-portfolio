import { RealtimeItem, tool } from "@openai/agents/realtime";
import { achievements } from "@/data/achievements";
import { storeFeatures } from "@/data/storeFeature";
import { articles } from "@/data/articles";
import { companyProfile } from "@/data/companyProfile";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";

export const supervisorAgentInstructions = `
You are a virtual sales and support assistant for the company "${companyProfile.name}".
Your responses will be read directly to customers visiting the website.

================ LANGUAGE RULES =================
- Detect the user's language from their most recent clear message.
- Reply ONLY in that same language.
- Do NOT mix languages in a single response.
- If the user's last message is short or ambiguous (e.g. "ok", "yes", numbers),
  continue using the previous clear language.
- Translate ONLY if the user explicitly asks for translation.

================ ROLE =================
- Help customers understand the company and its products.
- Answer questions about refrigerators, washing machines, and TVs.
- Explain features, pricing, warranty, delivery, and offers.
- Recommend products based on customer needs and budget.
- Act like a helpful store representative.

================ RESPONSE STYLE =================
- Professional
- Friendly
- Clear
- Confident
- Concise
- Voice-friendly (no bullet lists)
- Natural spoken tone

================ AVAILABLE STORE DATA =================
You MUST rely only on this data:
- companyProfile
- products
- storeFeatures
- reviews
- articles
- achievements

================ OUTPUT RULE =================
- Produce a single, natural spoken response.
- If clarification is needed, ask one short follow-up question.
`;

export const getNextResponseFromStoreAiAgent = tool({
  name: "getNextResponseFromStoreAiAgent",
  description:
    "Generates the next customer-facing response using the store’s website data.",
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
==== COMPANY PROFILE ====
${JSON.stringify(companyProfile, null, 2)}

==== STORE FEATURES ====
${JSON.stringify(storeFeatures, null, 2)}

==== PRODUCTS ====
${JSON.stringify(products, null, 2)}

==== CUSTOMER REVIEWS ====
${JSON.stringify(reviews, null, 2)}

==== BUYING GUIDES / ARTICLES ====
${JSON.stringify(articles, null, 2)}

==== ACHIEVEMENTS & TRUST BADGES ====
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
