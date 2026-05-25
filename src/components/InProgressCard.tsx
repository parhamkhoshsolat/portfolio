"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { InProgressProject } from "@/lib/in-progress-projects";

const SLUGS_WITH_DEEP_PAGES = new Set([
  "preference-shielding-hri",
  "active-object-localization-rl",
  "six-robot-warehouse-rl",
]);

export function InProgressCard({
  project,
  index,
}: {
  project: InProgressProject;
  index: number;
}) {
  const hasDeepPage = SLUGS_WITH_DEEP_PAGES.has(project.slug);

  const Inner = (
    <>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-amber-400/40 bg-amber-400/10 text-amber-200"
          >
            <Wrench className="mr-1 h-3 w-3" /> In progress
          </Badge>
          <Badge variant="outline">{project.statusLabel}</Badge>
        </div>
        {hasDeepPage ? (
          <ArrowUpRight
            className="h-5 w-5 text-muted transition-all group-hover:text-accent group-hover:rotate-12"
            aria-hidden
          />
        ) : null}
      </div>

      <h3 className="text-xl font-semibold text-text">
        {project.shortTitle}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.tagline}
      </p>

      {project.hypothesis ? (
        <p className="mt-4 rounded-md border-l-2 border-accent/40 bg-accent-soft/40 px-3 py-2 text-xs leading-relaxed text-text">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Hypothesis
          </span>
          {project.hypothesis}
        </p>
      ) : null}

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-accent tabular-nums">
          {project.progressStat.value}
        </span>
        <span className="text-xs uppercase tracking-wider text-muted">
          {project.progressStat.label}
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
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      whileHover={hasDeepPage ? { y: -4 } : undefined}
      className="group relative overflow-hidden rounded-2xl border border-dashed border-border bg-card/60 transition-all hover:border-accent/40"
    >
      {hasDeepPage ? (
        <Link
          href={`/projects/${project.slug}`}
          className="block p-7 transition-all active:scale-[0.985] active:bg-bg/30"
          aria-label={`View ${project.shortTitle} write-up`}
        >
          {Inner}
        </Link>
      ) : (
        <div className="p-7">{Inner}</div>
      )}
    </motion.article>
  );
}
