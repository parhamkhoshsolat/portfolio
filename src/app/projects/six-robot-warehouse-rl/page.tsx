import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  Brain,
  Cpu,
  Layers,
  AlertCircle,
  Beaker,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { inProgressProjects } from "@/lib/in-progress-projects";

const project = inProgressProjects.find(
  (p) => p.slug === "six-robot-warehouse-rl"
)!;

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Agents in simulation", value: "6" },
  { label: "RL methods", value: "3" },
  { label: "Classical baselines", value: "3" },
  { label: "Unit tests", value: "190+" },
];

const rlMethods = [
  {
    name: "DQN",
    body: "Vanilla deep Q-learning with epsilon-greedy exploration. The baseline against which the Bayesian-exploration variant is measured.",
  },
  {
    name: "Bootstrapped DQN",
    body: "An ensemble of Q-networks; the ensemble disagreement is the agent's uncertainty. Replaces epsilon-greedy with posterior sampling, the same idea Osband et al. 2016 showed yields deep exploration in sparse-reward MDPs.",
  },
  {
    name: "PPO",
    body: "Stable-Baselines3 implementation of Proximal Policy Optimization. A different policy-gradient family that tends to be sample-hungry but stable, useful as a sanity check that the gains aren&apos;t architecture-specific.",
  },
];

const classicalBaselines = [
  {
    name: "A*",
    body: "Informed shortest-path planner. Requires the full map and re-plans from scratch on every change.",
  },
  {
    name: "Cooperative A*",
    body: "A* with space-time reservation. Multiple agents take turns reserving cells, avoiding the typical pile-up at chokepoints.",
  },
  {
    name: "Conflict-Based Search (CBS)",
    body: "A two-level search: a constraint tree at the top, single-agent A* at each leaf. Optimal under standard MAPF assumptions but expensive at scale.",
  },
];

export default function WarehousePage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <FadeIn>
        <Link
          href="/#in-progress"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to in-progress
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-amber-400/40 bg-amber-400/10 text-amber-200"
          >
            <Wrench className="mr-1 h-3 w-3" /> In progress
          </Badge>
          <Badge variant="outline">{project.statusLabel}</Badge>
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-4 w-4 text-amber-400" />
            <div className="text-sm leading-relaxed text-muted">
              <p className="font-semibold text-amber-200">
                Why this page is light on numbers
              </p>
              <p className="mt-2">
                The current pilot is training the full algorithm sweep at
                N = 6 robots. Headline metrics land in about ten hours.
                This page will update with per-algorithm delivery success
                rates (with rliable IQM + 95 percent bootstrap CIs and
                Mann-Whitney + Bayesian BEST posterior probability against
                each classical baseline) the moment the runs complete.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-2xl font-semibold tabular-nums text-accent">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Brain className="h-4 w-4" />
            <span>The three RL methods</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            What the agents will learn
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Three families of deep-RL agents share the same observation
            space, action space, and reward function. The point of the
            comparison is to isolate which exploration strategy and which
            optimisation family handle the sparse-reward, multi-agent
            warehouse setting best.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {rlMethods.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-sm font-semibold text-accent">{m.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Cpu className="h-4 w-4" />
            <span>The three classical baselines</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            What the RL has to beat
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {classicalBaselines.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-sm font-semibold text-accent">{m.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Hungarian task assignment maps pallets to robots before each
            episode so both RL and classical sides face the same
            assignment problem.
          </p>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Beaker className="h-4 w-4" />
            <span>Statistical analysis</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Per-algorithm delivery success at N = 6, with confidence
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Once training lands, the headline is per-algorithm delivery
            success rate over 50 evaluation episodes (best-checkpoint and
            final-state pair). Beyond that:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-muted">
            <li>
              rliable IQM with 95 percent bootstrap confidence intervals to
              guard against single-seed luck.
            </li>
            <li>
              Mann-Whitney U for non-parametric pairwise comparisons.
            </li>
            <li>
              Bayesian BEST test for posterior probability that one method
              actually beats another (not just &quot;p &lt; 0.05&quot;).
            </li>
            <li>
              Benjamini-Hochberg FDR correction across the full comparison
              matrix.
            </li>
          </ul>
          <p className="mt-6 text-sm text-muted">
            190+ unit tests across the environment, agents, baselines, and
            stats pipeline. The point of the discipline is so the final
            comparison can&apos;t be challenged on methodology, only on
            interpretation.
          </p>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Layers className="h-4 w-4" />
            <span>Tech stack</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Full implementation stack
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {(project.techStackFull ?? project.techStack).map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </section>
      </FadeIn>
    </article>
  );
}
