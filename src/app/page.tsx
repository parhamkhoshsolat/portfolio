import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InProgressSection } from "@/components/InProgressSection";
import { FadeIn } from "@/components/FadeIn";
import { OpenAgentContactCard } from "@/components/OpenAgentChatButton";
import { credentials } from "@/lib/credentials";
import { siteConfig } from "@/lib/site-config";
import { Award, ExternalLink, Linkedin, Github } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ProjectsSection />

      <InProgressSection />

      <section
        id="experience"
        className="border-b border-border/40"
      >
        <div className="container max-w-3xl py-20 md:py-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Experience
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              Data Scientist, Sakoudar
            </h2>
            <p className="mt-2 text-sm text-muted">
              2022 to 2025 &middot; full time &middot; on site, then remote
            </p>
            <p className="mt-6 text-muted">
              Sakoudar is an influencer campaign management platform across
              LinkedIn, X and Instagram. I joined in the company&apos;s first
              year as one of two technical people.
            </p>
            <ul className="mt-6 space-y-4 text-muted">
              <li>
                Built the scoring and recommendation engine behind the live
                platform. I owned the data, scoring and matching, and part of
                the backend.
              </li>
              <li>
                Designed a cross-platform engagement score that weights each
                interaction type per platform and corrects for posting
                frequency, audience size and category, using the
                platforms&apos; own audience demographics.
              </li>
              <li>
                Built brand-fit matching with semantic text embeddings that
                compares each campaign&apos;s message and goals with
                influencers&apos; own posts.
              </li>
              <li>
                Turned customer briefs into ranked influencer shortlists.
                After launch, about 8 in 10 campaigns used the engine&apos;s
                recommendations instead of manual selection.
              </li>
              <li>
                Applied sentiment analysis to influencer posts. Built the
                founders&apos; review dashboard and the step that published
                approved scores to the live site.
              </li>
              <li>
                Python, pandas, MySQL on the company server. Weekly data
                collection from three platform APIs, covering under 500
                influencers.
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>


      <section
        id="about"
        className="border-y border-border/40 bg-card/30"
      >
        <div className="container max-w-3xl py-20 md:py-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              About
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              I build tools that help non-technical people make decisions
              with data.
            </h2>
            <div className="mt-6 space-y-5 text-muted">
              <p>
                For three years I was the data person at Sakoudar, an
                influencer marketing platform. The problem
                underneath it was comparison: raw impressions reward whoever
                posts most often, and a beauty audience is nothing like a
                tech audience, so nobody could say which creator was actually
                worth the money. As one of two technical people, I owned the
                data side: weekly data collection from the Instagram,
                LinkedIn and X APIs, a cross-platform engagement score that
                corrected for both distortions, and the recommendation
                engine that turned a customer&apos;s brief into a ranked
                shortlist. After launch, about 8 in 10 campaigns used the
                engine&apos;s recommendations instead of manual selection.
              </p>
              <p>
                In spring 2024, in a Federico II course, my four-person team
                took on a challenge set by Fater S.p.A. (the Procter &amp;
                Gamble and Angelini joint venture behind Pampers in Italy):
                map stores onto census districts and compare districts by
                store potential per resident, on one map a non-specialist
                can read. I did the statistics and analysis part.
              </p>
              <p>
                That pattern repeats across this site. A vision-language
                model I fine-tuned on 60,000 image-question pairs, shipped
                as a public web demo where anyone uploads a photo and asks
                questions about it. A Kafka and Zookeeper setup that loaded
                six months of daily prices for 55 tickers, with a separate
                PySpark stage that clusters one ticker&apos;s price history.
                A comparison of eight model families that found a pest-catch
                detector which flagged every catch day in the held-out set,
                at the cost of one false alarm for each true one.
              </p>
              <p>
                My newest work leans into reinforcement learning. Six
                warehouse vehicles routed by nine classical and learned
                methods, all under one collision shield that keeps collisions
                at zero, so they compete on throughput alone (the classical
                planners won). An agent that repairs damaged photos
                by chaining small specialist networks, reimplemented from a
                CVPR paper and extended with its unreleased fine-tuning. Both
                are live demos you can try. The same thread runs into my MSc
                thesis at Federico II, on how a learning robot can stay
                transparent and trustworthy to the person it learns from.
                Alongside it, I&apos;m doing research on how code LLMs handle
                hardware-design (Verilog) tasks; the results are not public yet.
              </p>
              <p>
                What I&apos;m after: a team that values clarity over
                cleverness and ships work to real users. Strong in Python,
                SQL, PyTorch, HuggingFace Transformers, reinforcement
                learning, Apache Kafka, and PySpark.
              </p>
              <p>
                Naples-based, with three years of paid data science behind
                me and an MSc expected to finish in February 2027. Open to{" "}
                <span className="text-text">Data Scientist</span>,{" "}
                <span className="text-text">ML Engineer</span>, and{" "}
                <span className="text-text">AI Engineer</span> roles, and to
                funded PhD positions in reinforcement learning and
                human-robot interaction. English C1.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-border/40 bg-card/30"
      >
        <div className="container max-w-4xl py-20 md:py-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              Reach me directly.
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              LinkedIn is the fastest route. Replies usually land within a
              working day. The agent in the bottom-right can also pass
              questions to me with full conversation context.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <FadeIn delay={0.05}>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <Linkedin className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-text">LinkedIn</p>
                <p className="mt-1 text-sm text-muted">
                  Best for recruiters and hiring managers.
                </p>
                <p className="mt-auto pt-4 text-xs text-accent group-hover:underline">
                  linkedin.com/in/parham-khoshsolat →
                </p>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <Github className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-text">GitHub</p>
                <p className="mt-1 text-sm text-muted">
                  Source code for my public projects.
                </p>
                <p className="mt-auto pt-4 text-xs text-accent group-hover:underline">
                  github.com/parhamkhoshsolat →
                </p>
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <OpenAgentContactCard />
            </FadeIn>
          </div>
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
