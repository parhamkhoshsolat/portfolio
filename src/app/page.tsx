import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeaturedProjects, MoreProjects } from "@/components/ProjectsSection";
import { ResearchCard } from "@/components/ProjectGridCard";
import { FadeIn } from "@/components/FadeIn";
import { credentials } from "@/lib/credentials";
import { research } from "@/lib/project-cards";
import { siteConfig } from "@/lib/site-config";
import { Award, ExternalLink, Linkedin, Github, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedProjects />

      {/* Work and research side by side, so neither audience has to scroll past the other. */}
      <section id="experience" className="scroll-mt-20 border-y border-border/40 bg-card/30">
        <div className="container grid gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Experience</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Data Scientist, Sakoudar</h2>
            <p className="mt-2 text-sm text-muted">
              2022 to 2025 &middot; full time &middot; influencer campaign platform across
              LinkedIn, X and Instagram &middot; one of two technical people
            </p>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-text/90 marker:text-accent">
              <li>
                Built the scoring and recommendation engine behind the live platform; I owned the
                data, scoring and matching, and part of the backend.
              </li>
              <li>
                Designed a cross-platform engagement score that corrects for posting frequency,
                audience size and category, and brand-fit matching with semantic text embeddings.
              </li>
              <li>
                After launch, about 8 in 10 campaigns used the engine&apos;s recommendations
                instead of manual selection.
              </li>
            </ul>
            <details className="group mt-4 text-sm text-muted">
              <summary className="cursor-pointer text-accent hover:underline">
                More about this role
              </summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                <li>
                  The engagement score weights each interaction type per platform, using the
                  platforms&apos; own audience demographics.
                </li>
                <li>
                  Brand-fit matching compares each campaign&apos;s message and goals with
                  influencers&apos; own posts.
                </li>
                <li>
                  Applied sentiment analysis to influencer posts. Built the founders&apos; review
                  dashboard and the step that published approved scores to the live site.
                </li>
                <li>
                  Python, pandas, MySQL on the company server. Weekly data collection from three
                  platform APIs, covering under 500 influencers.
                </li>
              </ul>
            </details>

            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Education</p>
              <p className="mt-2 font-semibold text-text">
                MSc Data Science, University of Naples Federico II
              </p>
              <p className="mt-1 text-sm text-muted">
                2023 to February 2027 (expected) &middot; weighted average 28.67/30 &middot; all
                exams finished, thesis in progress
              </p>
              <p className="mt-3 text-sm text-muted">
                BSc Information Technology Engineering, Amol University
              </p>
            </div>
          </FadeIn>

          <div id="research" className="scroll-mt-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Research</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Research in progress</h2>
              <p className="mt-2 text-sm text-muted">
                Thesis lab:{" "}
                <a
                  href="https://www.prisca.unina.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  PRISCA Lab ↗
                </a>
                , University of Naples Federico II
              </p>
            </FadeIn>
            <div className="mt-5 grid gap-4">
              {research.map((item) => (
                <ResearchCard key={item.key} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MoreProjects />

      <section id="about" className="scroll-mt-20 border-y border-border/40 bg-card/30">
        <div className="container py-16 md:py-20">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">About</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                What ties the work together
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                The thread through my work is comparison: creators across platforms at Sakoudar,
                districts of very different sizes for Fater, nine routing methods under one safety
                layer. My newest work is in reinforcement learning, and my thesis asks how a
                learning robot can stay readable to the person who teaches it. I&apos;m looking for
                a team that values clarity over cleverness and ships to real users, or a funded PhD
                in reinforcement learning or human-robot interaction. Strong in Python, SQL,
                PyTorch, Hugging Face Transformers, reinforcement learning, Apache Kafka and
                PySpark. Based in Naples and open to relocation. Languages: English C1, learning German (A1).
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20">
        <div className="container py-16 md:py-20">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Reach me directly.</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Replies usually land within a working day.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <FadeIn delay={0.05}>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <Mail className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-text">Email</p>
                <p className="mt-1 text-sm text-muted">For PhD positions and anything formal.</p>
                <p className="mt-auto break-all pt-4 text-xs text-accent group-hover:underline">
                  {siteConfig.contact.email}
                </p>
              </a>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <Linkedin className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-text">LinkedIn</p>
                <p className="mt-1 text-sm text-muted">Best for recruiters and hiring managers.</p>
                <p className="mt-auto pt-4 text-xs text-accent group-hover:underline">
                  linkedin.com/in/parham-khoshsolat →
                </p>
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <Github className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-text">GitHub</p>
                <p className="mt-1 text-sm text-muted">Source code for my public projects.</p>
                <p className="mt-auto pt-4 text-xs text-accent group-hover:underline">
                  github.com/parhamkhoshsolat →
                </p>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="credentials" className="border-t border-border/40 bg-card/30">
        <div className="container py-16 md:py-20">
          <FadeIn>
            <div className="mb-8 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Credentials</p>
              <h2 className="text-2xl font-semibold md:text-3xl">Programmes &amp; certificates</h2>
              <p className="text-sm text-muted">
                Legal name: Seyyed Alireza Khoshsolat (on degree certificates)
              </p>
            </div>
          </FadeIn>

          <ul className="grid gap-4 md:grid-cols-3">
            {credentials.map((c) => {
              const isExternal = c.href?.startsWith("http");
              const Inner = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-medium text-text">{c.title}</span>
                    <span className="text-xs uppercase tracking-wider text-muted">{c.date}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{c.issuer}</p>
                  {c.detail ? (
                    <p className="mt-3 text-xs leading-relaxed text-muted">{c.detail}</p>
                  ) : null}
                </>
              );
              if (!c.href) {
                return (
                  <li key={c.title} className="rounded-xl border border-border bg-card p-5">
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
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
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
