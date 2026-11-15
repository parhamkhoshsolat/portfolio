"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMarquee } from "@/components/HeroMarquee";
import { siteConfig } from "@/lib/site-config";

const HEADLINE_WORDS = ["Parham", "Khosh", "Solat"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 50% -10%, rgba(56, 189, 248, 0.10), transparent 60%)",
        }}
      />
      <div className="container relative py-12 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="shrink-0"
          >
            <Image
              src="/brand/portrait.jpg"
              alt="Portrait of Parham Khosh Solat"
              width={144}
              height={144}
              priority
              className="h-24 w-24 rounded-full object-cover ring-2 ring-accent/50 ring-offset-4 ring-offset-bg md:h-36 md:w-36"
            />
          </motion.div>

          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.06 }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            >
              <p className="mt-5 text-lg leading-relaxed text-text md:text-xl">
                Data scientist with three years in industry, finishing an MSc in Data Science at
                Federico II (expected February 2027). My thesis studies how a learning robot can
                stay transparent and trustworthy to the person teaching it.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Open to data scientist and ML engineer roles, and to funded PhD positions in
                reinforcement learning and human-robot interaction.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-4 w-4" aria-hidden /> {siteConfig.location} &middot; open to relocation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button asChild size="lg">
                <Link href="#projects">
                  See the work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#research">Research</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <HeroMarquee />
    </section>
  );
}
