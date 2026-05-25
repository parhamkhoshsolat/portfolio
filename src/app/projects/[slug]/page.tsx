import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { getProject, projects } from "@/lib/projects";

const STATIC_ROUTED_SLUGS = new Set([
  "florence2-vqa",
  "stock-clustering",
  "oulad-timeseries",
  "retail-geospatial",
  "pest-forecasting",
  "talentsonar",
  // In-progress deep pages live at their own static routes too:
  "preference-shielding-hri",
  "active-object-localization-rl",
  "six-robot-warehouse-rl",
]);

export function generateStaticParams() {
  return projects
    .filter((p) => !STATIC_ROUTED_SLUGS.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.shortTitle,
    description: project.tagline,
  };
}

export default function ProjectStubPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project || STATIC_ROUTED_SLUGS.has(project.slug)) notFound();

  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <FadeIn>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.year}</Badge>
          {project.grade ? <Badge variant="outline">{project.grade}</Badge> : null}
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
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            </Button>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-2xl font-semibold tabular-nums text-accent">
              {project.heroStat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted">
              {project.heroStat.label}
            </p>
          </div>
          {project.grade ? (
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-text">{project.grade}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                Grade
              </p>
            </div>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn>
        <section className="mt-14 border-t border-border/40 pt-10">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
        </section>

        <section className="mt-12 border-t border-border/40 pt-10">
          <h2 className="text-2xl font-semibold">Tech stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-dashed border-border bg-card/40 p-8">
          <div className="flex items-start gap-3">
            <Construction className="h-5 w-5 text-accent" />
            <div>
              <h3 className="font-semibold text-text">
                Interactive demo coming in v2
              </h3>
              <p className="mt-2 text-sm text-muted">
                The deep write-up and interactive view for this project ship
                in the next iteration. In the meantime, the source code and
                technical artifacts are live on GitHub.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-3.5 w-3.5" /> View repo
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/#projects">Back to projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </article>
  );
}
