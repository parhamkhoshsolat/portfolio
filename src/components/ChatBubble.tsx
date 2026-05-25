"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getProject } from "@/lib/projects";

type Msg = { role: "user" | "agent"; text: string };

const HOME_SUGGESTIONS = [
  "What's Parham's strongest project?",
  "Has he worked on LLMs?",
  "Compare the warehouse RL project with the localization one",
  "What kind of role is Parham looking for?",
];

const PROJECT_SUGGESTIONS = [
  "Explain this project for a non-technical person",
  "What was the main result?",
  "What tech stack does this use?",
  "Why does this matter for recruiters?",
];

function projectSlugFromPath(pathname: string | null): string | null {
  if (!pathname) return null;
  const m = pathname.match(/^\/projects\/([^/]+)/);
  return m ? m[1] : null;
}

export function ChatBubble() {
  const pathname = usePathname();
  const currentProjectSlug = projectSlugFromPath(pathname);
  const currentProject = currentProjectSlug
    ? getProject(currentProjectSlug)
    : undefined;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-show a gentle tooltip after 5s on the home page so visitors notice
  // the chat. Closes when they engage or after 18s. Once dismissed, stays
  // dismissed for the session (localStorage).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const seen = window.sessionStorage.getItem("agent-tooltip-seen");
    if (seen) return;
    const show = window.setTimeout(() => setShowTooltip(true), 5000);
    const hide = window.setTimeout(() => {
      setShowTooltip(false);
      window.sessionStorage.setItem("agent-tooltip-seen", "1");
    }, 18000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Allow the rest of the site to open the chat by dispatching
  // `window.dispatchEvent(new CustomEvent("open-agent-chat"))`. Used by
  // the hero CTA card.
  useEffect(() => {
    function handler() {
      setOpen(true);
      setShowTooltip(false);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("agent-tooltip-seen", "1");
      }
    }
    window.addEventListener("open-agent-chat", handler);
    return () => window.removeEventListener("open-agent-chat", handler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const suggestions = useMemo(
    () => (currentProject ? PROJECT_SUGGESTIONS : HOME_SUGGESTIONS),
    [currentProject]
  );

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("agent-tooltip-seen", "1");
    }
  }, []);

  const downloadConversation = useCallback(() => {
    if (messages.length === 0 || typeof window === "undefined") return;
    const stamp = new Date().toISOString().slice(0, 10);
    const lines: string[] = [
      "# Conversation with Parham Khosh Solat's portfolio agent",
      "",
      `Saved on ${stamp}`,
      "",
      "---",
      "",
    ];
    for (const m of messages) {
      lines.push(m.role === "user" ? "## You" : "## Agent");
      lines.push("");
      lines.push(m.text);
      lines.push("");
    }
    lines.push("---");
    lines.push("");
    lines.push("Reach Parham: https://www.linkedin.com/in/parham-khoshsolat");
    lines.push("Portfolio: https://parhamkhoshsolat.com");
    const blob = new Blob([lines.join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `parham-portfolio-chat-${stamp}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages]);

  async function ask(text: string) {
    if (!text.trim() || streaming) return;

    const userMsg: Msg = { role: "user", text };
    const baseMessages: Msg[] = [...messages, userMsg];
    setMessages([...baseMessages, { role: "agent", text: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: text,
          currentProjectSlug: currentProjectSlug ?? undefined,
          history: messages.map((m) => ({
            role: m.role === "agent" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        setMessages([
          ...baseMessages,
          {
            role: "agent",
            text:
              errText ||
              "I'm having trouble reaching the backend. Try again in a moment.",
          },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        setMessages([...baseMessages, { role: "agent", text: buffer }]);
      }
      buffer += decoder.decode();
      if (buffer) {
        setMessages([...baseMessages, { role: "agent", text: buffer }]);
      }
    } catch {
      setMessages([
        ...baseMessages,
        {
          role: "agent",
          text: "Network hiccup. Try again in a moment.",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {showTooltip && !open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-9 right-24 z-50 max-w-[260px] rounded-xl border border-border bg-card px-4 py-3 shadow-2xl shadow-black/40"
          >
            <button
              type="button"
              onClick={dismissTooltip}
              aria-label="Dismiss"
              className="absolute right-2 top-2 text-muted hover:text-text"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="pr-4 text-xs leading-relaxed text-text">
              <span className="font-semibold text-accent">Hey, ask me anything.</span>{" "}
              I&apos;m trained on the full memory of Parham&apos;s work.
            </p>
            <div
              className="absolute -right-1.5 bottom-4 h-3 w-3 rotate-45 border-b border-r border-border bg-card"
              aria-hidden
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen((o) => !o);
          dismissTooltip();
        }}
        aria-label={open ? "Close chat" : "Open chat with the agent"}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-text shadow-2xl shadow-black/40 transition-colors hover:border-accent/60 hover:text-accent",
          open && "bg-accent text-bg border-accent"
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[680px] max-h-[calc(100vh-7rem)] w-[420px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50 sm:w-[460px] md:w-[520px]"
            role="dialog"
            aria-label="AI agent chat"
          >
            <header className="flex items-center justify-between gap-3 border-b border-border/60 bg-bg/40 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft">
                  <Sparkles className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">
                    Ask the agent
                  </p>
                  <p className="text-[11px] text-muted">
                    {currentProject
                      ? `Context: ${currentProject.shortTitle}`
                      : "Trained on the full project memory"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={downloadConversation}
                disabled={messages.length === 0}
                aria-label="Download conversation as a markdown file"
                title="Download conversation"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted hover:border-accent/60 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
            >
              {messages.length === 0 ? (
                <div>
                  <p className="text-[13.5px] leading-relaxed text-text">
                    {currentProject
                      ? `You're on the ${currentProject.shortTitle} page. I'm trained on the full project memory and can answer questions about anything on this site.`
                      : "I'm trained on the full memory of Parham's work and I can answer any question about it. Use the download icon up top to save our conversation when you're done."}
                  </p>
                  <p className="mt-4 text-[11px] uppercase tracking-wider text-muted">
                    Try one of these
                  </p>
                  <div className="mt-2 grid gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="rounded-lg border border-border bg-bg px-4 py-2.5 text-left text-[13px] text-text hover:border-accent/60 hover:text-accent transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => {
                    const isStreamingThisMsg =
                      streaming &&
                      i === messages.length - 1 &&
                      m.role === "agent";
                    return (
                      <div
                        key={i}
                        className={cn(
                          "max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[14px] leading-[1.55]",
                          m.role === "user"
                            ? "ml-auto bg-accent text-bg shadow-sm"
                            : "bg-bg/80 text-text"
                        )}
                      >
                        {m.text}
                        {isStreamingThisMsg && !m.text ? (
                          <span className="inline-flex items-center gap-2 text-muted">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Thinking...
                          </span>
                        ) : null}
                        {isStreamingThisMsg && m.text ? (
                          <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-accent align-baseline" />
                        ) : null}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-border/60 bg-bg/40 p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  currentProject
                    ? `Ask about ${currentProject.shortTitle}...`
                    : "Ask anything..."
                }
                className="flex-1 rounded-lg border border-border bg-bg px-3 py-2.5 text-[14px] text-text placeholder:text-muted focus:border-accent focus:outline-none"
                disabled={streaming}
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-bg disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
