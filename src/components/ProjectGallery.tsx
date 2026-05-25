import Image from "next/image";
import { FileImage } from "lucide-react";
import type { ChartAsset } from "@/lib/project-assets";

export function ChartFigure({
  chart,
  priority = false,
}: {
  chart: ChartAsset;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-bg/40 px-4 py-2 text-[10px] uppercase tracking-wider text-muted">
        <span className="inline-flex items-center gap-1.5">
          <FileImage className="h-3 w-3" /> Notebook output
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full bg-white">
        <Image
          src={chart.src}
          alt={chart.alt}
          fill
          className="object-contain p-4"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          unoptimized
        />
      </div>
      <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted">
        <span className="block text-text">{chart.caption}</span>
        {chart.interpretation ? (
          <span className="mt-3 block border-l-2 border-accent/40 pl-3 text-xs text-muted">
            {chart.interpretation}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function ProjectGallery({
  charts,
  cols = 2,
}: {
  charts: ChartAsset[];
  cols?: 1 | 2;
}) {
  if (charts.length === 0) return null;
  return (
    <div
      className={
        cols === 1
          ? "grid gap-6"
          : "grid gap-6 md:grid-cols-2"
      }
    >
      {charts.map((c, i) => (
        <ChartFigure key={c.src} chart={c} priority={i === 0} />
      ))}
    </div>
  );
}

export function ExternalEmbed({
  src,
  title,
  height,
}: {
  src: string;
  title: string;
  height: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="w-full bg-white"
        style={{ height }}
      />
      <p className="border-t border-border/60 px-5 py-3 text-xs text-muted">
        {title}
      </p>
    </div>
  );
}

export function TechReportLink({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-text hover:border-accent/60 hover:text-accent transition-colors"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M14 3v5h5M16 13H8m8 4H8m2-8H8" />
        <path d="M14 3H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V8z" />
      </svg>
      <span className="flex flex-col">
        <span className="font-medium">Read the full report (PDF)</span>
        <span className="text-xs text-muted">{title}</span>
      </span>
    </a>
  );
}
