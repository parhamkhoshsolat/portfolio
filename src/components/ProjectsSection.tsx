import { CompactProjectCard, FeaturedProjectCard } from "@/components/ProjectGridCard";
import { FadeIn } from "@/components/FadeIn";
import { projects, type Project } from "@/lib/projects";
import { FEATURED, MORE } from "@/lib/project-cards";

function pick(slugs: string[]): Project[] {
  return slugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="container scroll-mt-20 py-16 md:py-20">
      <FadeIn>
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Selected work</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Three projects to start with</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Each card opens the full write-up: the question, the method, the results and the
            honest limits.
          </p>
        </div>
      </FadeIn>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pick(FEATURED).map((p, i, all) => (
          <FeaturedProjectCard key={p.slug} project={p} wide={i === all.length - 1 && all.length % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

export function MoreProjects() {
  const list = pick(MORE);
  return (
    <section id="more-projects" className="container scroll-mt-20 py-16 md:py-20">
      <FadeIn>
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">More projects</p>
          <h2 className="text-2xl font-semibold md:text-3xl">
            {list.length} more, from forecasting to data engineering
          </h2>
        </div>
      </FadeIn>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <CompactProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
