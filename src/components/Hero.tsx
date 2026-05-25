"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMarquee } from "@/components/HeroMarquee";
import { siteConfig } from "@/lib/site-config";

function openAgentChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-agent-chat"));
  }
}

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
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Button asChild size="lg">
              <Link href="#projects">
                See the work <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="#about"
              className="text-sm text-muted hover:text-text transition-colors"
            >
              Read the back-story
            </Link>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="hidden self-end md:block"
        >
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-agent-chat"));
              }
            }}
            className="group w-full rounded-2xl border border-accent/30 bg-gradient-to-br from-accent-soft/40 via-card to-card p-6 text-left transition-all hover:border-accent/60 hover:shadow-[0_0_0_4px_rgba(56,189,248,0.08)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-wider text-accent">
                Skip the scroll
              </p>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-bg transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
            <p className="mt-3 text-base leading-relaxed text-text">
              Ask the agent.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Trained on the full memory of my work. Ask anything in
              plain English, then download the conversation when
              you&apos;re done.
            </p>
            <p className="mt-4 text-xs text-accent">
              Click to open chat →
            </p>
          </button>
        </motion.aside>
      </div>

      <HeroMarquee />
    </section>
  );
}
