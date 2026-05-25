"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMarquee } from "@/components/HeroMarquee";
import { siteConfig } from "@/lib/site-config";

const HEADLINE_WORDS = ["Parham", "Khosh", "Solat"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="container relative grid gap-12 py-24 md:grid-cols-[1.4fr_1fr] md:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to data &amp; ML roles across the EU
          </motion.div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15 + i * 0.08,
                }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            I ship the whole data pipeline. Six projects below across{" "}
            <span className="text-text">vision-language fine-tuning</span>,{" "}
            <span className="text-text">streaming engineering</span>,{" "}
            <span className="text-text">time-series forecasting</span>, and{" "}
            <span className="text-text">geospatial BI</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {siteConfig.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent" /> Three research
              projects in flight
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link href="#projects">
                See the work <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#about">About me</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={`mailto:${siteConfig.contact.email}`}>Get in touch</a>
            </Button>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="hidden self-end md:block"
        >
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <p className="text-xs uppercase tracking-wider text-muted">
              Try the agent
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text">
              The chat in the bottom-right is an AI agent that answers
              recruiter questions about my work. Built on Claude Haiku and
              grounded in my project memory.
            </p>
            <p className="mt-3 text-xs text-muted">
              Ask it: <span className="text-accent">&ldquo;What&apos;s my
              strongest LLM project?&rdquo;</span> or{" "}
              <span className="text-accent">&ldquo;Send Parham a
              message.&rdquo;</span>
            </p>
          </div>
        </motion.aside>
      </div>

      <HeroMarquee />
    </section>
  );
}
