"use client";

import { MessageSquare } from "lucide-react";

// Client-side wrapper for the contact section's "Ask the agent" card.
// Dispatches the open-agent-chat event ChatBubble listens for.

export function OpenAgentContactCard() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-agent-chat"));
        }
      }}
      className="group flex h-full w-full flex-col rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-accent/60"
    >
      <MessageSquare className="h-5 w-5 text-accent" />
      <p className="mt-3 font-semibold text-text">Ask the agent</p>
      <p className="mt-1 text-sm text-muted">
        Project Q&amp;A, role-fit conversation, downloadable transcript.
      </p>
      <p className="mt-auto pt-4 text-xs text-accent group-hover:underline">
        Open chat →
      </p>
    </button>
  );
}
