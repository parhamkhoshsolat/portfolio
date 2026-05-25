"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
  featured?: boolean;
};

export function ExpandableProjectCard({ project, index, featured = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card transition-colors hover:border-accent/40",
        featured
          ? "border-accent/30 bg-gradient-to-br from-accent-soft/30 via-card to-card md:col-span-2"
          : "border-border",
        expanded && "border-accent/60"
      )}
    >
      {featured ? (
        <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
          <Star className="h-3 w-3" /> Featured
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-controls={contentId}
        className={cn(
          "block w-full text-left",
          featured ? "p-8" : "p-7"
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.year}</Badge>
            {project.grade ? (
              <Badge variant="outline">{project.grade}</Badge>
            ) : null}
            {project.status === "live-demo" ? (
              <Badge
                variant="outline"
                className="border-emerald-500/40 text-emerald-400"
              >
                Live demo
              </Badge>
            ) : (
              <Badge variant="outline">Case study</Badge>
            )}
          </div>
          {!featured ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-bg/60 text-muted transition-all group-hover:border-accent/60 group-hover:text-accent">
              {expanded ? (
                <Minus className="h-3.5 w-3.5" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
            </span>
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
          {project.techStack.length > 5 && !expanded ? (
            <Badge variant="default">+{project.techStack.length - 5}</Badge>
          ) : null}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={contentId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60"
          >
            <div className={cn(featured ? "p-8 pt-6" : "p-7 pt-5")}>
              {project.techStack.length > 5 ? (
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.techStack.slice(5).map((t) => (
                    <Badge key={t} variant="default">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <p className="text-sm leading-relaxed text-muted">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent-soft/40 px-3 py-2 text-xs font-medium text-accent hover:bg-accent-soft/60"
                >
                  Open full write-up
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted hover:border-accent/60 hover:text-accent"
                >
                  <Github className="h-3.5 w-3.5" /> Repo
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted hover:border-accent/60 hover:text-accent"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live demo
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
