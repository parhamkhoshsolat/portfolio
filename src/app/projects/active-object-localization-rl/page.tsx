import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  GitCompare,
  TrendingUp,
  Target,
  Layers,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { inProgressProjects } from "@/lib/in-progress-projects";

const project = inProgressProjects.find(
  (p) => p.slug === "active-object-localization-rl"
)!;

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Current best mAP@0.5", value: "0.287" },
  { label: "Iteration cycle", value: "v10" },
  { label: "Target band (CLIP)", value: "0.28 to 0.35" },
  { label: "Paper baseline (VGG)", value: "0.46" },
];

const diffs = [
  {
    component: "Visual backbone",
    paper: "VGG-16 fc7 (4096-d)",
    ours: "Frozen CLIP ViT-L/14 (768-d region embedding)",
  },
  {
    component: "Action space",
    paper: "9 actions",
    ours: "10 actions (added a fine-grained scale-smaller for endgame refinement)",
  },
  {
    component: "RL algorithm",
    paper: "Vanilla DQN",
    ours: "Double DQN + n-step Bellman + persistent DQfD margin loss",
  },
  {
    component: "Trigger reward",
    paper: "Binary +5 / -1",
    ours:
      "Continuous and monotone: shaped reward above IoU 0.5; smooth failure penalty scaling with IoU below threshold",
  },
  {
    component: "Auxiliary tasks",
    paper: "None",
    ours:
      "Aux IoU prediction head with pairwise ranking loss, gradient flowing into the Q-trunk",
  },
  {
    component: "Conditioning signal",
    paper: "None",
    ours:
      "Class-conditional SCLIP saliency map (16x16) concatenated into the observation",
  },
];

const iterations = [
  {
    version: "v6",
    change: "Added Double DQN",
    why: "Cure Q-overestimation; v5's greedy policy almost never picked TRIGGER because Q(best_move) was unboundedly positive (classic DQN pathology).",
    result: "mAP 0.257. Q-mean stayed in [-2, +2] for the full training run.",
  },
  {
    version: "v7",
    change: "n-step Bellman + persistent DQfD margin loss",
    why: "Propagate trigger reward 3x faster through the Bellman target and prevent BC-anchor decay.",
    result: "mAP 0.287 (current best across all iterations).",
  },
  {
    version: "v9.2",
    change: "Auxiliary IoU prediction head with gradient flow into Q-trunk",
    why: "Improve the representation quality at the critical IoU band so the policy has a sharper signal to act on.",
    result:
      "Pearson rho between trunk features and true IoU in [0.5, 0.85] climbed from 0.18 to 0.48, BUT mAP did not move. The aux head fixed the representation; the binding constraint was somewhere else (the trigger-reward structure).",
  },
  {
    version: "v10",
    change: "Training in progress",
    why: "Test whether closing the policy-vs-representation gap recovers mAP. The rep-quality win from v9.2 should now translate, given v7's reward structure.",
    result:
      "Floor: equal v7 (0.287). Stretch: above 0.30. Trigger IoU distribution should also shift right (mean trigger_iou >= 0.6 vs v9.2's ~0.55).",
  },
];

export default function ActiveObjectLocalizationPage() {
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
                Before you read the numbers
              </p>
              <p className="mt-2">
                This is a reimplementation-with-modern-components of Caicedo
                and Lazebnik (ICCV 2015), not a strict reproduction. The
                paper used VGG features; I use frozen CLIP. So direct mAP
                comparison with the paper&apos;s 0.46 is not apples to
                apples. The realistic target band for CLIP-backbone work in
                this problem is 0.28 to 0.35. What this project is really
                about is closing the gap between representation quality and
                policy quality, and v10 is the iteration that tests the
                diagnosis.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
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
            <GitCompare className="h-4 w-4" />
            <span>Six differences from the paper</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            What changed, and why
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            The original paper&apos;s framework is preserved: episodic search
            of a bounding box via discrete geometric actions, ending on a
            TRIGGER, with the full-image initial box and the IoU greater than
            or equal to 0.5 success criterion. Six specific components
            differ.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Component</th>
                  <th className="py-3 pr-4 font-medium">Paper (2015)</th>
                  <th className="py-3 pr-4 font-medium">Ours</th>
                </tr>
              </thead>
              <tbody className="text-text">
                {diffs.map((d) => (
                  <tr key={d.component} className="border-b border-border/60 align-top">
                    <td className="py-3 pr-4 text-accent">{d.component}</td>
                    <td className="py-3 pr-4 text-muted">{d.paper}</td>
                    <td className="py-3 pr-4">{d.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <TrendingUp className="h-4 w-4" />
            <span>Iteration history</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Each version is a hypothesis test
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Every iteration has its own Drive root for clean A / B. Each
            version&apos;s success criterion is explicit: a specific
            mechanism is fixed and a specific metric should move.
          </p>
          <div className="mt-6 space-y-4">
            {iterations.map((it) => (
              <div
                key={it.version}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-semibold text-accent tabular-nums">
                    {it.version}
                  </span>
                  <span className="text-sm font-semibold text-text">
                    {it.change}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Why
                  </span>{" "}
                  {it.why}
                </p>
                <p className="mt-2 text-sm text-muted">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Result
                  </span>{" "}
                  {it.result}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Target className="h-4 w-4" />
            <span>What I&apos;m presenting</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            The contribution is the diagnosis
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Across v6 → v9.2 the iterations isolated which component was
            actually limiting performance. The aux head proved representation
            quality could be lifted dramatically (rho 0.18 → 0.48) but mAP did
            not move. That non-result is the most informative result in the
            stack: the binding constraint is the trigger reward, not the
            representation. v10 tests the fix; whether or not the stretch
            target lands, the contribution is the diagnostic process and the
            isolated mechanisms, not a benchmark beat.
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
