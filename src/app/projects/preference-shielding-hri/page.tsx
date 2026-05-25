import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  Brain,
  Beaker,
  ShieldCheck,
  AppWindow,
  Layers,
  FlaskConical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { inProgressProjects } from "@/lib/in-progress-projects";

const project = inProgressProjects.find(
  (p) => p.slug === "preference-shielding-hri"
)!;

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Study conditions", value: "4" },
  { label: "Pre-study runs", value: "240" },
  { label: "Seeds per condition", value: "30" },
  { label: "Grid size", value: "7×7" },
];

const conditions = [
  {
    name: "Baseline",
    body: "Q-learning agent with no shielding. The agent learns from environmental reward only; participant preferences are recorded but never enforced.",
  },
  {
    name: "Standard Preference Shielding",
    body: "The original mechanism from the literature. Every preference is enforced unconditionally near matching objects, regardless of how confident the agent is or how important the object is to the participant.",
  },
  {
    name: "Adaptive Shielding",
    body: "New contribution. The shield defers to the agent once its Q-value confidence crosses a threshold. Early in learning the participant's preferences carry full weight; as the agent becomes confident, it earns autonomy.",
  },
  {
    name: "Hard / Soft Shielding",
    body: "New contribution. Participants tag each object as Strict or Flexible. Strict objects get unconditional override; Flexible objects let the agent learn freely. Users keep guarantees on what matters most without strangling task performance everywhere.",
  },
];

const figures = [
  {
    src: "/projects/preference-shielding-hri/figures/learning_curves_reward.png",
    alt: "Learning curves across the 8 factorial pre-study conditions",
    caption: "Reward over training across the 8 factorial pre-study conditions.",
    interpretation:
      "How to read it: each curve is one of the 8 algorithmic conditions (Baseline + 7 extension combinations) averaged across 30 seeds. By episode 200 the conditions split into two regimes: those that find a viable policy (top cluster, near zero cumulative reward) and those that get stuck in the failure mode (bottom cluster, near -1000). This is a pre-study algorithmic benchmark, NOT the participant data.",
  },
  {
    src: "/projects/preference-shielding-hri/figures/interaction_effects.png",
    alt: "Interaction effects bar charts for the 2x2x2 factorial design",
    caption: "Interaction effects across the 2-cubed factorial design.",
    interpretation:
      "How to read it: red bars mean two extensions cancel each other out (antagonistic), green bars mean they amplify (synergistic), grey bars mean they add independently. M_FIN shows a clean antagonistic interaction in COND_AC and COND_ABC, the signal that extensions A and C should not be combined unconditionally.",
  },
  {
    src: "/projects/preference-shielding-hri/figures/radar_chart.png",
    alt: "Radar chart comparing 8 conditions across 5 metrics",
    caption:
      "Extension comparison across the final 100 episodes (5 metrics, 8 conditions).",
    interpretation:
      "How to read it: each axis is one outcome metric (preference alignment, task success, short episodes, final reward, low override rate). Higher is better. Most extensions cluster tightly on the bottom 4 metrics but split sharply on Preference Alignment (vertical), the cleanest empirical statement of the safety-performance tradeoff that the Hard/Soft Shielding contribution is designed to solve.",
  },
  {
    src: "/projects/preference-shielding-hri/figures/heatmaps_all_conditions.png",
    alt: "Heatmap of policy density across the 8 conditions",
    caption: "Per-condition policy density on the 7x7 grid.",
    interpretation:
      "How to read it: each panel is the visited-state density of the converged agent under one condition. Conditions that mass density on a tight diagonal are converging to a single goal-directed path; conditions with density spread across rooms are stuck or oscillating.",
  },
];

export default function PreferenceShieldingPage() {
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
          <Badge variant="outline">MSc thesis</Badge>
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>

        {project.hypothesis ? (
          <div className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Thesis hypothesis
            </p>
            <p className="mt-2 text-base leading-relaxed text-text">
              {project.hypothesis}
            </p>
          </div>
        ) : null}
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
            <span>The four study conditions</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            What participants will compare
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Each participant sees one of four shielding regimes for a
            Q-learning agent on a 7x7 grid. The two new contributions
            (Adaptive and Hard / Soft) are the heart of the thesis; Baseline
            and Standard PS are the controls.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {conditions.map((c, i) => (
              <div
                key={c.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft tabular-nums">
                    {i + 1}
                  </span>
                  {c.name}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <ShieldCheck className="h-4 w-4" />
            <span>Pre-study validation</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Algorithm benchmark before the humans arrive
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Before opening the experiment to participants, I ran a 2-cubed
            factorial algorithmic pre-study (8 conditions across 30 seeds =
            240 runs) to confirm the extensions behave as designed. In
            particular: the all-Strict configuration of Hard / Soft Shielding
            reproduces the classic safety-performance tradeoff (perfect
            preference alignment, lost task success), which is exactly the
            failure mode the Strict / Flexible split is designed to escape
            from.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {figures.map((f, i) => (
              <figure
                key={f.src}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="border-b border-border/60 bg-bg/40 px-4 py-2 text-[10px] uppercase tracking-wider text-muted">
                  Pre-study figure {i + 1} of {figures.length}
                </div>
                <div className="relative aspect-[16/10] w-full bg-white">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    className="object-contain p-4"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    unoptimized
                  />
                </div>
                <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted">
                  <span className="block text-text">{f.caption}</span>
                  <span className="mt-3 block border-l-2 border-accent/40 pl-3 text-xs">
                    {f.interpretation}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <AppWindow className="h-4 w-4" />
            <span>The web app</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Where participants will meet the agent
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            The study runs in a browser. A FastAPI backend streams the
            agent&apos;s training over a WebSocket while a React 18 frontend
            paints the 7x7 grid live, frame by frame. Participants express
            directional preferences with an arrow grid, watch the agent
            adapt (or not), and answer questionnaires after each session.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-accent">
                Backend
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>FastAPI with async WebSocket training loop</li>
                <li>aiosqlite for participant data + questionnaires</li>
                <li>Per-condition Q-table runs, async streaming</li>
                <li>
                  Admin REST API for analytics, settings, and live monitoring
                </li>
                <li>Docker-deployable on Fly.io</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-accent">
                Frontend
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>React 18 + Vite + Tailwind CSS v4</li>
                <li>Live animated 7x7 GridCanvas, looping AnimatedPath</li>
                <li>
                  PreferencePanel (arrow grid) and EnforcementPanel (Hard /
                  Soft per object)
                </li>
                <li>Mid-training popup questionnaires + post-session screens</li>
                <li>Consent gate + onboarding + debrief flow</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <FlaskConical className="h-4 w-4" />
            <span>Status</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Gated on data-collection permission
          </h2>
          <div className="mt-5 space-y-4 text-muted">
            <p>
              Algorithms and the web app are complete; the algorithmic
              pre-study above confirms the contributions behave as designed.
              The participant experiment opens once permission to collect
              human-subjects data is granted by the relevant institutional
              review.
            </p>
            <p>
              Once participants come through, the headline analysis will
              compare the four conditions on three outcome families:
              perceived robot transparency (questionnaire scales), perceived
              trust (Likert + qualitative), and learning speed (objective
              task-success time). I&apos;ll wire the live results into a
              dashboard here once the data is in.
            </p>
          </div>
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
