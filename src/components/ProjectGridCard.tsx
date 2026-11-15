"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Banner } from "@/components/Banner";
import { trackEvent } from "@/lib/analytics";
import { banners } from "@/lib/banners";
import { cardCopy, type ResearchItem } from "@/lib/project-cards";
import type { Project } from "@/lib/projects";

function openTracked(slug: string) {
  return () => trackEvent("project_open", { project: slug });
}

// The whole card opens the project page (stretched link); the demo link sits above it and
// opens the project page at its embedded demo, so visitors stay on the site.
const STRETCH =
  "outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-accent";

function Meta({ project, context }: { project: Project; context: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted">
      {project.liveUrl ? (
        <>
          <span className="font-medium text-accent">Live demo</span>
          <span aria-hidden>·</span>
        </>
      ) : null}
      <span>{context}</span>
      <span aria-hidden>·</span>
      <span>{project.year}</span>
    </p>
  );
}

function Limit({ text }: { text: string }) {
  return (
    <p className="mt-2 text-[13px] leading-relaxed text-amber-200/90">
      <span className="font-semibold text-amber-300">Limit: </span>
      {text}
    </p>
  );
}

// wide: on tablets (two columns) the last card spans the row, banner beside the text.
export function FeaturedProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const c = cardCopy[project.slug];
  const b = banners[project.slug];
  if (!c || !b) return null;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/50 focus-within:border-accent/60 ${
        wide ? "md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex" : ""
      }`}
    >
      <Banner
        spec={b}
        className={`border-b border-border ${wide ? "md:self-start md:border-b-0 md:border-r lg:self-stretch lg:border-b lg:border-r-0" : ""}`}
      />
      <div className="flex flex-1 flex-col p-5">
        <Meta project={project} context={c.context} />
        <h3 className="mt-2 text-lg font-semibold leading-snug text-text">
          <Link href={`/projects/${project.slug}`} onClick={openTracked(project.slug)} className={`${STRETCH} after:rounded-2xl`}>
            {c.title}
          </Link>
        </h3>
        {c.hook ? <p className="mt-2 text-sm leading-relaxed text-muted">{c.hook}</p> : null}
        <div className="mb-4">
          <Limit text={c.limit} />
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-text group-hover:text-accent">
            Read the write-up <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
          {project.liveUrl ? (
            <Link
              href={`/projects/${project.slug}#live-demo`}
              onClick={openTracked(project.slug)}
              className="relative z-10 inline-flex items-center gap-1 text-accent hover:underline"
            >
              <Play className="h-3.5 w-3.5" aria-hidden /> Live demo
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function CompactProjectCard({ project }: { project: Project }) {
  const c = cardCopy[project.slug];
  const b = banners[project.slug];
  if (!c || !b) return null;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/50 focus-within:border-accent/60">
      <Banner spec={b} className="border-b border-border" />
      <div className="flex flex-1 flex-col p-4">
        <Meta project={project} context={c.context} />
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-text">
          <Link href={`/projects/${project.slug}`} onClick={openTracked(project.slug)} className={`${STRETCH} after:rounded-xl`}>
            {c.title}
          </Link>
        </h3>
        <Limit text={c.limit} />
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm text-text group-hover:text-accent">
          Write-up <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}

// Research cards sit next to Experience: banner left, text right; stacked on phones.
export function ResearchCard({ item }: { item: ResearchItem }) {
  const b = banners[item.key];
  if (!b) return null;
  return (
    <article
      className={`group relative grid overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-[46%_1fr] ${
        item.href ? "transition-colors hover:border-accent/50 focus-within:border-accent/60" : ""
      }`}
    >
      <Banner spec={b} className="border-b border-border sm:self-start sm:border-b-0 sm:border-r" />
      <div className="flex flex-col p-4">
        <p className="text-xs text-muted">{item.context}</p>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-text">
          {item.href ? (
            <Link href={item.href} className={`${STRETCH} after:rounded-xl group-hover:text-accent`}>
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.hook}</p>
        <Limit text={item.limit} />
      </div>
    </article>
  );
}
