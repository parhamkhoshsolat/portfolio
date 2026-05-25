"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/40"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block p-7"
        aria-label={`View ${project.shortTitle} project`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.year}</Badge>
            {project.grade ? (
              <Badge variant="outline">{project.grade}</Badge>
            ) : null}
            {project.status === "live-demo" ? (
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-400">
                Live demo
              </Badge>
            ) : null}
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-muted transition-all group-hover:text-accent group-hover:rotate-12"
            aria-hidden
          />
        </div>

        <h3 className="text-xl font-semibold text-text">
          {project.shortTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-accent tabular-nums">
            {project.heroStat.value}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted">
            {project.heroStat.label}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => (
            <Badge key={t} variant="default">
              {t}
            </Badge>
          ))}
          {project.techStack.length > 5 ? (
            <Badge variant="default">+{project.techStack.length - 5}</Badge>
          ) : null}
        </div>
      </Link>

      <div className="flex items-center gap-3 border-t border-border/60 px-7 py-3 text-xs text-muted">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 hover:text-text"
        >
          <Github className="h-3.5 w-3.5" /> Repo
        </a>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 hover:text-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" /> HuggingFace Space
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
