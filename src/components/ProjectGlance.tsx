import Image from "next/image";
import { AlertTriangle, Play } from "lucide-react";
import { projectGlance } from "@/lib/project-glance";
import { getProject } from "@/lib/projects";

// Real screenshots of the live demos, reused from the home page cards.
const DEMO_SHOTS: Record<string, { src: string; alt: string }> = {
  "shielded-lgv-routing": {
    src: "/projects/shielded-lgv-routing/card.jpg",
    alt: "Screenshot of the live 3D warehouse demo",
  },
  "rl-restore": {
    src: "/projects/rl-restore/card.jpg",
    alt: "Screenshot of the live demo showing the agent's repair steps",
  },
};

// Points the reader at the live demo right after the summary; the demo itself
// stays further down and loads only on click.
function DemoTeaser({ slug }: { slug: string }) {
  const shot = DEMO_SHOTS[slug];
  return (
    <div className="overflow-hidden rounded-2xl border border-accent/40 bg-card/70 sm:flex">
      {shot ? (
        <a href="#live-demo" className="relative block aspect-[16/9] border-b border-border sm:w-2/5 sm:shrink-0 sm:border-b-0 sm:border-r">
          <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 640px) 320px, 100vw" className="object-cover" />
        </a>
      ) : null}
      <div className="flex flex-col justify-center p-4 sm:p-5">
        <a href="#live-demo" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">
          <Play className="h-4 w-4" aria-hidden /> Try it live
        </a>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Runs right here on this page. It loads from Hugging Face, which may set its own
          cookies, and a sleeping demo takes 30 to 60 seconds to wake up.
        </p>
      </div>
    </div>
  );
}

// Problem / my role / result in one strip, then the honest limits.
// Sits near the top of every project page so a 10-second reader gets the story.
export function ProjectGlance({ slug }: { slug: string }) {
  const g = projectGlance[slug];
  if (!g) return null;
  const liveUrl = getProject(slug)?.liveUrl;
  const cells: [string, string, boolean][] = [
    ["Problem", g.problem, false],
    ["My role", g.role, false],
    ["Result", g.result, true],
  ];
  return (
    <div className="mt-8 space-y-3">
      <dl className="grid overflow-hidden rounded-2xl border border-border bg-card/70 md:grid-cols-3">
        {cells.map(([label, text, isResult]) => (
          <div
            key={label}
            className={`border-border p-4 md:border-r md:last:border-r-0 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 ${
              isResult ? "bg-accent-soft/40" : ""
            }`}
          >
            <dt
              className={`text-xs uppercase tracking-[0.18em] ${
                isResult ? "text-accent" : "text-muted"
              }`}
            >
              {label}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-text">{text}</dd>
          </div>
        ))}
      </dl>
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> Honest limits
        </p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-text">
          {g.limits.map((l) => (
            <li key={l} className="flex gap-2">
              <span aria-hidden className="text-amber-300">
                ·
              </span>
              {l}
            </li>
          ))}
        </ul>
      </div>
      {liveUrl ? <DemoTeaser slug={slug} /> : null}
    </div>
  );
}
