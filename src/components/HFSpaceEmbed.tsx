"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

// Direct embed of the running HuggingFace Space via its dedicated
// *.hf.space subdomain. Hides the bare iframe area behind a placeholder
// for the 30-60s cold-start window so the page never reads as broken
// while the container wakes up.

export function HFSpaceEmbed({
  liveUrl,
  spaceName,
  height = 720,
}: {
  liveUrl: string;
  spaceName: string;
  height?: number;
}) {
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Nothing loads from Hugging Face until the visitor asks for it, so the page
  // itself stays cookie-free.
  if (!started) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/60 px-6 text-center"
        style={{ minHeight: Math.min(height, 360) }}
      >
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent/90"
        >
          <Play className="h-4 w-4" aria-hidden /> Run the live demo here
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          Loads {spaceName} from huggingface.co, which may set its own cookies.
          A sleeping demo takes 30 to 60 seconds to wake up.
        </p>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Or open it in a new tab
        </a>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
      {!loaded ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-bg px-6 text-center"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <p className="text-sm font-medium text-text">
              Container starting
            </p>
          </div>
          <p className="text-xs leading-relaxed text-muted">
            {spaceName} usually wakes up in 30 to 60 seconds.
          </p>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Or open in a new tab
          </a>
        </div>
      ) : null}
      <iframe
        src={liveUrl}
        title={`${spaceName} demo`}
        className="w-full bg-white"
        style={{ height }}
        onLoad={() => setLoaded(true)}
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
