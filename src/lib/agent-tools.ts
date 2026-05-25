// Tools the agent can call.
// Currently empty. Email tools were removed because Resend's free tier
// only sends to the verified own address, which broke the visitor-summary
// flow. Visitors now download the conversation client-side instead
// (see the Download button in ChatBubble).

import type Anthropic from "@anthropic-ai/sdk";

export const agentTools: Anthropic.Tool[] = [];

export type ToolResult = {
  success: boolean;
  error?: string;
  details?: string;
};

export async function executeAgentTool(
  name: string,
  _input: Record<string, unknown>,
  _conversationContext?: string
): Promise<ToolResult> {
  return { success: false, error: `Unknown tool: ${name}` };
}
