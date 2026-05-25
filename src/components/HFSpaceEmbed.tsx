import { ExternalLink } from "lucide-react";

// Direct embed of the running HuggingFace Space via its dedicated
// *.hf.space subdomain. No interstitial click. If the Space is sleeping,
// HuggingFace's own warming-up UI renders inside the iframe automatically.

export function HFSpaceEmbed({
  liveUrl,
  spaceName,
  height = 720,
}: {
  liveUrl: string;
  spaceName: string;
  height?: number;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-muted">
        <span>
          Sleeps when idle. First request may take 30 to 60 seconds while
          the container wakes up.
        </span>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-accent hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Open in new tab
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <iframe
          src={liveUrl}
          title={`${spaceName} demo`}
          className="w-full"
          style={{ height }}
          loading="lazy"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
}
