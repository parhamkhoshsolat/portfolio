import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { InProgressCard } from "@/components/InProgressCard";
import { FadeIn } from "@/components/FadeIn";
import { projects } from "@/lib/projects";
import { inProgressProjects } from "@/lib/in-progress-projects";
import { credentials } from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { Github, Linkedin, Mail, Award, ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="about"
        className="border-y border-border/40 bg-card/30"
      >
        <div className="container grid gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:py-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              About
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              Across the whole pipeline. SQL to slide deck.
            </h2>
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Most data work splits people into camps: the analyst writes
                the SQL, the scientist trains the model, the engineer ships
                the pipeline, the BI lead stands in front of leadership. I do
                all four.
              </p>
              <p>
                Florence-2 fine-tuned end to end on a single Colab GPU and
                shipped as a public web demo. A Kafka and PySpark streaming
                pipeline carrying daily OHLCV data across 55 tickers. An
                eleven-model ML tournament against a 10.67:1 class imbalance
                where the champion caught every single rare event in the test
                set. A geospatial analysis that joined Fater S.p.A.&apos;s
                proprietary sales with ISTAT census data, then went up on a
                screen in front of company leadership. The jury picked the
                work for individual recognition.
              </p>
              <p>
                What I&apos;m after: a team that values clarity over
                cleverness and ships to real users. Strong in Python,
                advanced SQL (CTEs, window functions, query optimisation),
                PyTorch, HuggingFace Transformers, Apache Kafka, PySpark,
                Tableau, and Power BI. My MSc thesis at the University of
                Naples Federico II focuses on human-robot interaction with
                reinforcement learning.
              </p>
              <p>
                Naples-based.{" "}
                <span className="text-text">Data Analyst</span>,{" "}
                <span className="text-text">Data Scientist</span>, or{" "}
                <span className="text-text">ML Engineer</span> roles in Italy
                and remote across the EU. English C1.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted">
                The fastest way to reach me
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text hover:border-accent/60 hover:text-accent"
              >
                <Mail className="h-4 w-4" /> {siteConfig.contact.email}
              </a>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3 text-muted hover:border-accent/60 hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </Link>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3 text-muted hover:border-accent/60 hover:text-accent"
                >
                  <Github className="h-4 w-4" /> GitHub
                </Link>
              </div>
              <p className="mt-5 text-xs text-muted">
                Phone &amp; CV on request, or just ask the agent.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="projects" className="container py-20 md:py-28">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Six projects
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Things I&apos;ve shipped
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Ordered by what most recruiters ask about first. Each card
              opens a deeper write-up with metrics, code links, and an
              interactive demo where one exists.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <section id="in-progress" className="container pb-20 md:pb-28">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Currently building
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Three research projects in flight
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Active work, mid-stride. Two on reinforcement learning, one on
              safety-conscious learning in human-robot interaction. Click
              any card to see the current status and visuals.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inProgressProjects.map((project, i) => (
            <InProgressCard
              key={project.slug}
              project={project}
              index={i}
            />
          ))}
        </div>
      </section>

      <section
        id="credentials"
        className="border-t border-border/40 bg-card/30"
      >
        <div className="container py-20 md:py-24">
          <FadeIn>
            <div className="mb-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                Credentials
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Programmes &amp; certificates
              </h2>
            </div>
          </FadeIn>

          <ul className="grid gap-4 md:grid-cols-3">
            {credentials.map((c) => {
              const isExternal = c.href?.startsWith("http");
              const Inner = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-medium text-text">{c.title}</span>
                    <span className="text-xs uppercase tracking-wider text-muted">
                      {c.date}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{c.issuer}</p>
                  {c.detail ? (
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      {c.detail}
                    </p>
                  ) : null}
                </>
              );
              if (!c.href) {
                return (
                  <li
                    key={c.title}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    {Inner}
                  </li>
                );
              }
              return (
                <li key={c.title}>
                  <a
                    href={c.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 hover:border-accent/60 transition-colors"
                  >
                    {Inner}
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[11px] text-accent group-hover:underline">
                      {isExternal ? (
                        <>
                          <ExternalLink className="h-3 w-3" /> Visit
                        </>
                      ) : (
                        <>
                          <Award className="h-3 w-3" /> View certificate
                        </>
                      )}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
