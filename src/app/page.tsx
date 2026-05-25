import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InProgressSection } from "@/components/InProgressSection";
import { FadeIn } from "@/components/FadeIn";
import { credentials } from "@/lib/credentials";
import { Award, ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

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
                In April 2024 I stood in front of Fater S.p.A.&apos;s
                leadership (the Procter &amp; Gamble joint venture behind
                Pampers Italia) presenting a map that ranked twenty Naples
                districts by store-expansion potential. Behind the map:
                MySQL joins between Fater&apos;s proprietary sales records
                and Italian census data, plus a Python geospatial pipeline.
                In front of it: an executive who could read the answer in
                five seconds. The jury picked the work for individual
                recognition.
              </p>
              <p>
                That pattern repeats across this site. A vision-language
                model I fine-tuned on 150,000 image-question pairs, shipped
                as a public web demo where anyone uploads a photo and asks
                questions about it. A streaming pipeline (Apache Kafka,
                PySpark) that groups daily stock prices into market patterns
                using the same tools production financial systems use. A
                pest-prediction system picked from a tournament of eleven
                models because it catches every rare outbreak in the test
                data, which is exactly the case farmers cannot afford to
                miss.
              </p>
              <p>
                Three more projects are in flight, including the
                human-robot interaction study at the heart of my MSc thesis
                at the University of Naples Federico II.
              </p>
              <p>
                What I&apos;m after: a team that values clarity over
                cleverness and ships work to real users. Strong in Python,
                SQL (CTEs, window functions, query optimisation), PyTorch,
                HuggingFace Transformers, Apache Kafka, PySpark, Tableau,
                and Power BI.
              </p>
              <p>
                Naples-based.{" "}
                <span className="text-text">Data Analyst</span>,{" "}
                <span className="text-text">Data Scientist</span>, or{" "}
                <span className="text-text">ML Engineer</span> roles in
                Italy and remote across the EU. English C1.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <ProjectsSection />

      <InProgressSection />

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
