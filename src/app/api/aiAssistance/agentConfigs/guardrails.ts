import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { GuardrailOutputZod, GuardrailOutput } from "@/app/types";

export async function runGuardrailClassifier(
  message: string,
  assistantName = "Resume AI Assistant"
): Promise<GuardrailOutput> {
  const messages = [
    {
      role: "user",
      content: `
You are classifying user-facing AI output.

Rules:
- The message may be in any language.
- Output JSON only, following the schema.
- Keep reasoning extremely short (max 2 sentences).

<assistant>
${assistantName}
</assistant>

<message>
${message}
</message>

<output_classes>
- OFFENSIVE: Hate speech, harassment, slurs, insults.
- OFF_BRAND: Disparaging or misleading content.
- VIOLENCE: Explicit threats or physical harm.
- NONE: Normal, acceptable content.
</output_classes>
`,
    },
  ];

  const response = await fetch("/api/aiAssistance/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: messages,
      text: {
        format: zodTextFormat(GuardrailOutputZod, "output_format"),
      },
    }),
  });

  if (!response.ok) {
    return Promise.reject("runGuardrailClassifier failed");
  }

  const data = await response.json();
  const parsed = GuardrailOutputZod.parse(data.output_parsed);

  return {
    ...parsed,
    testText: message,
  };
}

export interface RealtimeOutputGuardrailResult {
  tripwireTriggered: boolean;
  outputInfo: any;
}

export interface RealtimeOutputGuardrailArgs {
  agentOutput: string;
  context?: any;
}

const LanguageDetectionZod = z.object({
  language: z.string(),
  iso639_1: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
});

type LanguageDetection = z.infer<typeof LanguageDetectionZod>;

async function detectLanguage(text: string): Promise<LanguageDetection> {
  const messages = [
    {
      role: "user",
      content: `
Detect the language of the text below.

Rules:
- Output JSON only.
- language: human readable name (e.g., English, Hindi).
- iso639_1: optional (e.g., en, hi).
- confidence: 0..1.

<text>
${text}
</text>
`,
    },
  ];

  const response = await fetch("/api/aiAssistance/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: messages,
      text: {
        format: zodTextFormat(LanguageDetectionZod, "output_format"),
      },
    }),
  });

  if (!response.ok) {
    return Promise.reject("detectLanguage failed");
  }

  const data = await response.json();
  return LanguageDetectionZod.parse(data.output_parsed);
}

function isTriviallyLanguageAgnostic(text: string): boolean {
  const t = (text ?? "").trim();
  if (!t) return true;
  if (/^[\d\s+\-()#.,]*$/.test(t)) return true;
  if (
    /^(ok|okay|yes|no|ya|yep|haan|han|ji|theek|thik)\b/i.test(t) &&
    t.length <= 8
  ) {
    return true;
  }
  return false;
}

function isShortOrAmbiguousUserTurn(text: string): boolean {
  const t = (text ?? "").trim();
  if (!t) return true;
  if (t.length <= 2) return true;
  if (!/\s/.test(t) && t.length <= 6) return true;
  if (/^[\d\s+\-()#.,]*$/.test(t)) return true;
  if (
    /^(ok|yes|no|haan|han|ji|thik|theek|nahi|nahin|nhi)\b/i.test(t) &&
    t.length <= 12
  ) {
    return true;
  }
  return false;
}

function extractTextFromHistoryMessage(h: any): string {
  const c = h?.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) {
    return c
      .map((p: any) => p?.text || p?.transcript || "")
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

export function createLanguageLockGuardrail(options?: {
  name?: string;
  contextKey?: string;
}) {
  const name = options?.name ?? "language_lock_guardrail";
  const contextKey = options?.contextKey ?? "languageLock";

  return {
    name,

    async execute({
      agentOutput,
      context,
    }: RealtimeOutputGuardrailArgs): Promise<RealtimeOutputGuardrailResult> {
      try {
        if (isTriviallyLanguageAgnostic(agentOutput)) {
          return {
            tripwireTriggered: false,
            outputInfo: { skipped: "agnostic" },
          };
        }

        const ctx = (context ?? {}) as any;
        const lock = (ctx[contextKey] ?? {}) as any;
        const history: any[] = ctx.history ?? [];

        const userMessages = history
          .filter((h) => h?.type === "message" && h?.role === "user")
          .map(extractTextFromHistoryMessage)
          .filter(Boolean);

        const clearMessages = userMessages.filter(
          (t) => !isShortOrAmbiguousUserTurn(t)
        );

        const latestClear = clearMessages[clearMessages.length - 1];

        if (latestClear) {
          lock.conversationLanguage = await detectLanguage(latestClear);
          ctx[contextKey] = lock;
        }

        if (!lock.conversationLanguage?.language) {
          return {
            tripwireTriggered: false,
            outputInfo: { skipped: "no_language" },
          };
        }

        const outLang = await detectLanguage(agentOutput);

        const normalize = (s: string) => s.toLowerCase().trim();

        const mismatch =
          normalize(lock.conversationLanguage.language) !==
            normalize(outLang.language) && (outLang.confidence ?? 0.6) >= 0.55;

        return {
          tripwireTriggered: mismatch,
          outputInfo: {
            conversationLanguage: lock.conversationLanguage,
            outputLanguage: outLang,
            reason: mismatch ? "language_mismatch" : "match",
          },
        };
      } catch {
        return {
          tripwireTriggered: false,
          outputInfo: { error: "language_guardrail_failed" },
        };
      }
    },
  } as const;
}

export function createModerationGuardrail(assistantName: string) {
  return {
    name: "moderation_guardrail",

    async execute({
      agentOutput,
    }: RealtimeOutputGuardrailArgs): Promise<RealtimeOutputGuardrailResult> {
      try {
        const res = await runGuardrailClassifier(agentOutput, assistantName);
        return {
          tripwireTriggered: res.moderationCategory !== "NONE",
          outputInfo: res,
        };
      } catch {
        return {
          tripwireTriggered: false,
          outputInfo: { error: "moderation_guardrail_failed" },
        };
      }
    },
  } as const;
}
