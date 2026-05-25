import Anthropic from "@anthropic-ai/sdk";
import { AGENT_SYSTEM_PROMPT } from "@/lib/agent-prompt";
import { generateStubAnswer } from "@/lib/agent-stub";
import { getProject } from "@/lib/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY_TURNS = 6;
const MAX_MESSAGE_LEN = 1500;

type AnthropicMessage = Parameters<
  Anthropic["messages"]["create"]
>[0]["messages"][number];

export async function POST(req: Request) {
  let payload: {
    message?: string;
    history?: ChatMessage[];
    currentProjectSlug?: string;
  };
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const rawMessage = (payload.message ?? "").toString().slice(0, MAX_MESSAGE_LEN);
  if (!rawMessage.trim()) {
    return new Response("Empty message", { status: 400 });
  }

  const currentProject = payload.currentProjectSlug
    ? getProject(payload.currentProjectSlug)
    : undefined;
  const userMessageWithContext = currentProject
    ? `[Page context: visitor is viewing the project page for "${currentProject.shortTitle}"]\n${rawMessage}`
    : rawMessage;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const answer = generateStubAnswer(rawMessage);
    return new Response(answer, {
      headers: { "content-type": "text/plain; charset=utf-8", "x-agent-source": "stub" },
    });
  }

  const client = new Anthropic({ apiKey });
  const history = Array.isArray(payload.history) ? payload.history : [];
  const trimmedHistory: AnthropicMessage[] = history
    .slice(-MAX_HISTORY_TURNS)
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LEN),
    }));

  try {
    const stream = await client.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 800,
      system: AGENT_SYSTEM_PROMPT,
      messages: [
        ...trimmedHistory,
        { role: "user", content: userMessageWithContext },
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("agent stream error", err);
          controller.enqueue(
            encoder.encode(
              "\n\n(Hit a snag mid-response. Try again, or save what you have via the download button at the top of the chat.)"
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-agent-source": "claude",
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    console.error("agent request error", err);
    const answer = generateStubAnswer(rawMessage);
    return new Response(answer, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-agent-source": "stub-fallback",
      },
    });
  }
}
