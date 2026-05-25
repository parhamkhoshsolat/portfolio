"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wrench } from "lucide-react";
import { InProgressCard } from "@/components/InProgressCard";
import { inProgressProjects } from "@/lib/in-progress-projects";
import { FadeIn } from "@/components/FadeIn";

export function InProgressSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="in-progress" className="container pb-20 md:pb-28">
      <FadeIn>
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Currently building
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Three research projects in flight
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-controls="in-progress-cards"
          className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-card/40 px-5 py-4 text-left transition-colors hover:border-accent/40"
        >
          <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <Wrench className="h-3.5 w-3.5 text-amber-400" />
            {inProgressProjects.map((p, i) => (
              <span key={p.slug} className="inline-flex items-center gap-3">
                <span className="text-text">{p.shortTitle}</span>
                {i < inProgressProjects.length - 1 ? (
                  <span className="text-border">·</span>
                ) : null}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted group-hover:text-accent">
            {expanded ? "Hide" : "See all"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </FadeIn>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id="in-progress-cards"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgressProjects.map((project, i) => (
                <InProgressCard
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
