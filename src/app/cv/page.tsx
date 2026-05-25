import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site-config";

const CV_PATH = "/cv/parham-khoshsolat-cv.pdf";

export const metadata: Metadata = {
  title: "CV",
  description: `One-page CV for ${siteConfig.name}. PDF embedded inline with a one-click download.`,
};

export default function CvPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <FadeIn>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">CV</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">
              One page, no preamble.
            </h1>
            <p className="mt-4 max-w-2xl text-muted">
              Latest export. If you want a version tailored to a specific
              role, drop me a note and I&apos;ll send one tuned to the JD.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={CV_PATH} download>
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={`mailto:${siteConfig.contact.email}`}>
                <Mail className="h-4 w-4" /> Email me
              </a>
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white">
          <iframe
            src={`${CV_PATH}#view=FitH&toolbar=1`}
            title="Parham Khosh Solat CV"
            className="h-[1100px] w-full"
          />
        </div>
        <p className="mt-3 text-xs text-muted">
          PDF preview not loading? Use the <strong>Download PDF</strong>{" "}
          button above or open the file{" "}
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            in a new tab
          </a>
          .
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-16 rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Other ways to verify the work
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text hover:border-accent/60 hover:text-accent"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn profile
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text hover:border-accent/60 hover:text-accent"
            >
              <Github className="h-4 w-4" /> GitHub (six repos)
            </Link>
            <Link
              href="/#projects"
              className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text hover:border-accent/60 hover:text-accent"
            >
              Project write-ups
            </Link>
          </div>
        </section>
      </FadeIn>
    </article>
  );
}
