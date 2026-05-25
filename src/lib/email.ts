// Resend wrapper for the agent's send_message_to_parham tool.
// Falls back gracefully if RESEND_API_KEY isn't set so the route doesn't crash.

import { Resend } from "resend";
import { siteConfig } from "./site-config";

type EmailInput = {
  visitor_name?: string;
  visitor_contact?: string;
  message_body: string;
};

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM ?? "Portfolio Agent <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

function formatEmail(input: EmailInput, conversationContext?: string): string {
  const lines: string[] = [];
  lines.push("A visitor on your portfolio site asked the agent to send you a message.");
  lines.push("");
  if (input.visitor_name) {
    lines.push(`Name: ${input.visitor_name}`);
  }
  if (input.visitor_contact) {
    lines.push(`Reply-to: ${input.visitor_contact}`);
  }
  lines.push("");
  lines.push("--- Message ---");
  lines.push(input.message_body);
  lines.push("");
  if (conversationContext) {
    lines.push("--- Conversation context ---");
    lines.push(conversationContext);
    lines.push("");
  }
  lines.push(`Sent via the agent on ${siteConfig.url}`);
  return lines.join("\n");
}

export async function sendEmailToParham(
  input: EmailInput,
  conversationContext?: string
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  if (!resend) {
    return {
      success: false,
      error:
        "Email service not configured yet. Please ask the visitor to email parhamkhoshsolat@gmail.com directly.",
    };
  }
  if (!input.message_body || input.message_body.trim().length < 5) {
    return {
      success: false,
      error: "Message body is too short to send.",
    };
  }

  try {
    const subject = `[Portfolio] ${input.message_body.slice(0, 60)}${
      input.message_body.length > 60 ? "..." : ""
    }`;
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: siteConfig.contact.email,
      replyTo: input.visitor_contact || undefined,
      subject,
      text: formatEmail(input, conversationContext),
    });

    if (error) {
      console.error("[email] resend error:", error);
      return { success: false, error: String(error.message ?? error) };
    }
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("[email] send threw:", err);
    return { success: false, error: String(err) };
  }
}
