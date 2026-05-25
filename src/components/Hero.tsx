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
      {/* Local accent gradient stays on top of the site-wide texture for a
          stronger hero presence; the grid pattern itself is now site-wide. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 50% -10%, rgba(56, 189, 248, 0.10), transparent 60%)",
        }}
      />
      <div className="container relative max-w-4xl py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted"
          role="status"
          aria-label="Open to data and ML roles across the EU"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
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
          I ship the whole data pipeline. Six projects below across
          vision-language fine-tuning, streaming engineering, time-series
          forecasting, and{" "}
          <span className="text-accent">geospatial BI</span>.
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
          className="mt-10"
        >
          <Button asChild size="lg">
            <Link href="#projects">
              See the work <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <HeroMarquee />
    </section>
  );
}
