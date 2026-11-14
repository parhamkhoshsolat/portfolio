import { AlertTriangle } from "lucide-react";
import { projectGlance } from "@/lib/project-glance";

// Problem / my role / result in one strip, then the honest limits.
// Sits near the top of every project page so a 10-second reader gets the story.
export function ProjectGlance({ slug }: { slug: string }) {
  const g = projectGlance[slug];
  if (!g) return null;
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
    </div>
  );
}
