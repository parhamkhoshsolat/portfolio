"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// HuggingFace Spaces sleep after periods of inactivity. The first request
// after sleep takes 30-60 seconds to wake the container. We render a small
// CTA panel by default, then mount the iframe only after the visitor opts
// in (lazy + transparent about the cold-start delay).

export function HFSpaceEmbed({
  liveUrl,
  spaceName,
  height = 720,
}: {
  liveUrl: string;
  spaceName: string;
  height?: number;
}) {
  const [embedded, setEmbedded] = useState(false);

  if (!embedded) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
        <p className="text-sm text-text">
          The {spaceName} HuggingFace Space sleeps when idle to save compute.
        </p>
        <p className="mt-2 text-xs text-muted">
          Click below to wake the container and load it inline. First
          request after a sleep takes 30 to 60 seconds.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={() => setEmbedded(true)}>Wake it up</Button>
          <Button asChild variant="secondary">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Open in new tab
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        src={liveUrl}
        title={`${spaceName} demo`}
        className="w-full bg-white"
        style={{ height }}
        loading="lazy"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
