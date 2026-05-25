import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { TechReportLink } from "@/components/ProjectGallery";
import type { Project } from "@/lib/projects";
import type { ProjectAssets } from "@/lib/project-assets";

type Stat = { label: string; value: string };

export function ProjectDeepHero({
  project,
  assets,
  stats,
  liveLabel,
}: {
  project: Project;
  assets: ProjectAssets;
  stats: Stat[];
  liveLabel?: string;
}) {
  return (
    <>
      <FadeIn>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.year}</Badge>
          {project.grade ? (
            <Badge variant="outline">{project.grade}</Badge>
          ) : null}
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> Source on GitHub
            </a>
          </Button>
          {project.liveUrl ? (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> {liveLabel ?? "Live demo"}
              </a>
            </Button>
          ) : null}
          {assets.techReport ? (
            <TechReportLink {...assets.techReport} />
          ) : null}
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-2xl font-semibold tabular-nums text-accent">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </>
  );
}

export function DeepSection({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-border/40 pt-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}
