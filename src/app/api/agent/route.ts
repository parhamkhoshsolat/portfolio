import Anthropic from "@anthropic-ai/sdk";
import { AGENT_SYSTEM_PROMPT } from "@/lib/agent-prompt";
import { generateStubAnswer } from "@/lib/agent-stub";
import { getProject } from "@/lib/projects";
import { agentTools, executeAgentTool } from "@/lib/agent-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY_TURNS = 6;
const MAX_MESSAGE_LEN = 1500;
const MAX_TOOL_ITERATIONS = 3;

type AnthropicMessage = Parameters<Anthropic["messages"]["create"]>[0]["messages"][number];

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

  const conversationContext = trimmedHistory
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .concat(`USER: ${rawMessage}`)
    .join("\n");

  const messages: AnthropicMessage[] = [
    ...trimmedHistory,
    { role: "user", content: userMessageWithContext },
  ];

  try {
    // Agentic loop. Most turns finish in 1 iteration. Tool-using turns
    // take 2 (tool call -> tool result -> final text).
    for (let iter = 0; iter < MAX_TOOL_ITERATIONS; iter++) {
      const resp = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 800,
        system: AGENT_SYSTEM_PROMPT,
        tools: agentTools,
        messages,
      });

      if (resp.stop_reason !== "tool_use") {
        const text = resp.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("");
        return new Response(text, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-agent-source": "claude-haiku-4-5",
            "cache-control": "no-store",
          },
        });
      }

      const toolUse = resp.content.find(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );
      if (!toolUse) break;

      const toolResult = await executeAgentTool(
        toolUse.name,
        toolUse.input as Record<string, unknown>,
        conversationContext
      );

      messages.push({ role: "assistant", content: resp.content });
      messages.push({
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(toolResult),
          },
        ],
      });
    }

    return new Response(
      "I tried to handle that but hit a snag. Please email Parham directly at parhamkhoshsolat@gmail.com.",
      {
        status: 200,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-agent-source": "max-iterations",
        },
      }
    );
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
