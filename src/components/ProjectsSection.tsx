import { Play, BookOpen } from "lucide-react";
import { ExpandableProjectCard } from "@/components/ExpandableProjectCard";
import { FadeIn } from "@/components/FadeIn";
import { projects, type Project } from "@/lib/projects";

// Split shipped projects into two clearly-labelled groups so visitors
// can pick by intent: try the interactive embeds, or read the analyses.

const FEATURED_LIVE = "florence2-vqa";
const FEATURED_CASE = "retail-geospatial";

// The featured card spans both columns. Putting it first makes it lead its
// rail with a clean full-width row, so the remaining cards fill a tidy grid
// instead of leaving a gap next to it. Sort is stable, so non-featured cards
// keep their original order.
function featuredFirst(list: Project[], featuredSlug: string): Project[] {
  return [...list].sort((a, b) =>
    a.slug === featuredSlug ? -1 : b.slug === featuredSlug ? 1 : 0
  );
}

export function ProjectsSection() {
  const liveDemos = featuredFirst(
    projects.filter((p) => p.status === "live-demo"),
    FEATURED_LIVE
  );
  const caseStudies = featuredFirst(
    projects.filter((p) => p.status === "case-study"),
    FEATURED_CASE
  );

  return (
    <section id="projects" className="container py-20 md:py-28">
      <FadeIn>
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Eight projects
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Things I&apos;ve shipped
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="mb-14 max-w-3xl border-l-2 border-accent/40 pl-4 text-lg italic leading-relaxed text-muted">
          Eight projects, one ability: turning raw data into a deliverable
          a non-technical stakeholder can act on.
        </p>
      </FadeIn>

      <SubHeading
        icon={<Play className="h-3.5 w-3.5" />}
        eyebrow="Live demos"
        title="Projects you can actually try"
        body={`${liveDemos.length} of the eight ship with a working interactive demo. Open any card for the summary, tech stack, and links.`}
      />
      <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
        {liveDemos.map((project, i) => (
          <ExpandableProjectCard
            key={project.slug}
            project={project}
            index={i}
            featured={project.slug === FEATURED_LIVE}
          />
        ))}
      </div>

      <div className="mt-20">
        <SubHeading
          icon={<BookOpen className="h-3.5 w-3.5" />}
          eyebrow="Case studies"
          title="Projects with the full analysis written up"
          body={`${caseStudies.length} projects without a deployed UI. The deep pages have the verified metrics, methodology, and chart interpretations.`}
        />
        <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
          {caseStudies.map((project, i) => (
            <ExpandableProjectCard
              key={project.slug}
              project={project}
              index={i}
              featured={project.slug === FEATURED_CASE}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubHeading({
  icon,
  eyebrow,
  title,
  body,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-1.5">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent">
          {icon}
          {eyebrow}
        </span>
        <h3 className="text-xl font-semibold text-text md:text-2xl">
          {title}
        </h3>
        <p className="text-sm text-muted">{body}</p>
      </div>
    </FadeIn>
  );
}
