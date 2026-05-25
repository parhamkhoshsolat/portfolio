import { Boxes, FlaskConical, MessageSquare, FileText } from "lucide-react";

// Static "what's on this site" row that replaces the earlier marquee.
// Sets expectations without animation noise.

const items = [
  { icon: Boxes, label: "6 shipped projects" },
  { icon: FlaskConical, label: "3 research projects in flight" },
  { icon: MessageSquare, label: "Live AI agent trained on the work" },
  { icon: FileText, label: "3 verified certificates" },
];

export function HeroMarquee() {
  return (
    <div className="border-y border-border/30 bg-bg/40">
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-xs text-muted md:justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-accent">
          On this site
        </span>
        {items.map((it) => (
          <span
            key={it.label}
            className="inline-flex items-center gap-2 text-text"
          >
            <it.icon className="h-3.5 w-3.5 text-accent" aria-hidden />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
