"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProject } from "@/lib/projects";

type Msg = { role: "user" | "agent"; text: string };

const HOME_SUGGESTIONS = [
  "What's Parham's strongest project?",
  "Has he worked on LLMs?",
  "Is he Naples-based?",
  "What's he looking for?",
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const suggestions = useMemo(
    () => (currentProject ? PROJECT_SUGGESTIONS : HOME_SUGGESTIONS),
    [currentProject]
  );

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
              "I'm having trouble reaching the backend. Try again, or email Parham directly.",
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
          text: "Network hiccup. Try again, or email Parham directly.",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
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
            className="fixed bottom-24 right-6 z-50 flex h-[560px] max-h-[80vh] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50"
            role="dialog"
            aria-label="AI agent chat"
          >
            <header className="flex items-center justify-between gap-3 border-b border-border/60 bg-bg/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft">
                  <Sparkles className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">
                    Ask the agent
                  </p>
                  <p className="text-[11px] text-muted">
                    {currentProject
                      ? `Context: ${currentProject.shortTitle}`
                      : "Claude Haiku, grounded in my project memory"}
                  </p>
                </div>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 ? (
                <div>
                  <p className="text-sm text-muted">
                    {currentProject
                      ? `You're on the ${currentProject.shortTitle} page. The agent has the full project memory, including non-technical explanations.`
                      : "Ask the agent anything about my work, target roles, or availability. It runs on Claude Haiku, grounded in my project memory."}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="rounded-lg border border-border bg-bg px-3 py-2 text-left text-xs text-text hover:border-accent/60 hover:text-accent transition-colors"
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
                          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                          m.role === "user"
                            ? "ml-auto bg-accent text-bg"
                            : "bg-bg/70 text-text border border-border"
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
                          <span className="ml-0.5 inline-block h-3 w-1 translate-y-0.5 animate-pulse bg-accent align-baseline" />
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
              className="flex items-center gap-2 border-t border-border/60 bg-bg/40 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  currentProject
                    ? `Ask about ${currentProject.shortTitle}...`
                    : "Ask about my work..."
                }
                className="flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
                disabled={streaming}
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-bg disabled:opacity-50"
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
