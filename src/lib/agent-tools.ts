// Tool definitions for the portfolio AI agent.
// Each tool has a JSON-schema definition (sent to Claude) and an executor
// (run server-side after Claude requests the tool).

import type Anthropic from "@anthropic-ai/sdk";
import { sendEmailToParham } from "./email";

export const agentTools: Anthropic.Tool[] = [
  {
    name: "send_message_to_parham",
    description:
      "Forward a message from the visitor to Parham via email. Use this ONLY when the visitor explicitly asks you to contact Parham, pass a message, have him reach out, or apply for a role through you. " +
      "Before calling this tool you MUST: (1) draft what you intend to send and confirm with the visitor that they want it sent, and (2) ask for their email or other contact method so Parham can reply (this is optional but strongly encouraged). " +
      "Returns success or failure of the email delivery.",
    input_schema: {
      type: "object",
      properties: {
        visitor_name: {
          type: "string",
          description:
            "The visitor's name if they shared it. Optional but useful for Parham.",
        },
        visitor_contact: {
          type: "string",
          description:
            "The visitor's email address or other reply-to contact. Optional but strongly encouraged; without it Parham cannot respond.",
        },
        message_body: {
          type: "string",
          description:
            "The full message Parham should receive. Include enough context (what the visitor was looking at, what role they represent, what they want from Parham) that Parham can reply meaningfully without needing back-and-forth.",
        },
      },
      required: ["message_body"],
    },
  },
];

export type ToolResult = {
  success: boolean;
  error?: string;
  details?: string;
};

export async function executeAgentTool(
  name: string,
  input: Record<string, unknown>,
  conversationContext?: string
): Promise<ToolResult> {
  if (name === "send_message_to_parham") {
    const result = await sendEmailToParham(
      {
        visitor_name: typeof input.visitor_name === "string" ? input.visitor_name : undefined,
        visitor_contact:
          typeof input.visitor_contact === "string" ? input.visitor_contact : undefined,
        message_body: typeof input.message_body === "string" ? input.message_body : "",
      },
      conversationContext
    );
    if (result.success) {
      return {
        success: true,
        details:
          "Email delivered to Parham. Tell the visitor that Parham typically replies within a working day, and thank them for getting in touch.",
      };
    }
    return {
      success: false,
      error: result.error ?? "Unknown email error.",
      details:
        "Tell the visitor the message could not be sent automatically, and suggest they email parhamkhoshsolat@gmail.com directly.",
    };
  }
  return { success: false, error: `Unknown tool: ${name}` };
}
