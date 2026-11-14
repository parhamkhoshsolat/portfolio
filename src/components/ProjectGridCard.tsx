"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { projectGlance } from "@/lib/project-glance";
import type { Project } from "@/lib/projects";

// Short team label for the card badge; the full credit lives on the project page.
const TEAM: Record<string, string> = {
  "shielded-lgv-routing": "Solo",
  "rl-restore": "Solo",
  "5g-noc-root-cause": "Team of 8",
  "florence2-vqa": "Team of 3",
  "pest-forecasting": "Team of 3",
  "retail-geospatial": "Team of 4",
  "stock-clustering": "Team of 2",
  "oulad-timeseries": "Team of 3",
  talentsonar: "Hackathon, 2",
};

// One fixed-size card: the whole card opens the project page, the demo link opens the demo.
export function ProjectGridCard({ project }: { project: Project }) {
  const result = projectGlance[project.slug]?.result ?? project.tagline;
  const live = Boolean(project.liveUrl);
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50 focus-within:border-accent/60">
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
        <span
          className={`rounded-full border px-2 py-0.5 ${
            live ? "border-accent/50 text-accent" : "border-border text-muted"
          }`}
        >
          {live ? "Live demo" : "Case study"}
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-muted">{project.year}</span>
        <span className="rounded-full border border-border px-2 py-0.5 text-muted">
          {TEAM[project.slug] ?? ""}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-text">
        <Link
          href={`/projects/${project.slug}`}
          onClick={() => trackEvent("project_open", { project: project.slug })}
          className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-accent"
        >
          {project.shortTitle}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted">{result}</p>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums text-accent">{project.heroStat.value}</span>
        <span className="text-[11px] uppercase tracking-wider text-muted">{project.heroStat.label}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((t) => (
          <span key={t} className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-sm">
        <span className="inline-flex items-center gap-1.5 text-text group-hover:text-accent">
          Read the write-up <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
        {live ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1 text-accent hover:underline"
          >
            Live demo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}
