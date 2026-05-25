"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card transition-all hover:border-accent/40",
        featured
          ? "border-accent/30 bg-gradient-to-br from-accent-soft/30 via-card to-card md:col-span-2"
          : "border-border"
      )}
    >
      {featured ? (
        <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
          <Star className="h-3 w-3" /> Featured
        </div>
      ) : null}
      <Link
        href={`/projects/${project.slug}`}
        className={cn("block", featured ? "p-8" : "p-7")}
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
          {!featured ? (
            <ArrowUpRight
              className="h-5 w-5 text-muted transition-all group-hover:text-accent group-hover:rotate-12"
              aria-hidden
            />
          ) : null}
        </div>

        <h3
          className={cn(
            "font-semibold text-text",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {project.shortTitle}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-muted",
            featured ? "max-w-2xl text-base" : "text-sm"
          )}
        >
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
