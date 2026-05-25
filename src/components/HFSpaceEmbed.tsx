"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

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
  const [loaded, setLoaded] = useState(false);

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
        loading="lazy"
        onLoad={() => setLoaded(true)}
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
