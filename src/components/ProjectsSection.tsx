import { ProjectGridCard } from "@/components/ProjectGridCard";
import { FadeIn } from "@/components/FadeIn";
import { projects, type Project } from "@/lib/projects";

// Strongest first; one grid so every card lines up.
const ORDER = [
  "shielded-lgv-routing",
  "rl-restore",
  "5g-noc-root-cause",
  "florence2-vqa",
  "pest-forecasting",
  "retail-geospatial",
  "stock-clustering",
  "oulad-timeseries",
  "talentsonar",
];

export function ProjectsSection() {
  const ordered = ORDER.map((s) => projects.find((p) => p.slug === s)).filter(
    (p): p is Project => Boolean(p)
  );
  const demos = ordered.filter((p) => p.liveUrl).length;

  return (
    <section id="projects" className="container py-20 md:py-24">
      <FadeIn>
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Nine projects
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Things I&apos;ve shipped
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            {demos} have a live demo you can try. Each card opens the full
            write-up: the question, the method, the results and the honest
            limits.
          </p>
        </div>
      </FadeIn>

      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((project) => (
          <ProjectGridCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
