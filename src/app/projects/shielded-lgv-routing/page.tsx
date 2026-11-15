import type { Metadata } from "next";
import { ProjectGlance } from "@/components/ProjectGlance";
import {
  Database,
  Cpu,
  ShieldCheck,
  Layers,
  ExternalLink,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HFSpaceEmbed } from "@/components/HFSpaceEmbed";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("shielded-lgv-routing")!;
const assets = getProjectAssets("shielded-lgv-routing");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
  alternates: { canonical: "/projects/shielded-lgv-routing" },
};

const stats = [
  { label: "LGVs in simulation", value: "6" },
  { label: "Methods compared", value: "9" },
  { label: "Collisions (runtime-checked)", value: "0" },
  { label: "Live demo", value: "Yes" },
];

const classicalPlanners = [
  {
    name: "Greedy",
    body: "Each LGV picks the shortest route to its current goal ignoring others. Fast baseline; breaks down under congestion.",
  },
  {
    name: "Prioritized planning",
    body: "Plans LGVs one at a time in priority order, each respecting the previously planned trajectories. Practical, used in industry; can fail when priority order is wrong.",
  },
  {
    name: "Conflict-Based Search (CBS)",
    body: "Two-level optimal search: a constraint tree at the top, single-agent A* at each leaf. Optimal in its textbook form; here windowed with an expansion cap for the lifelong task stream.",
  },
];

const learnedPolicies = [
  {
    name: "Hybrid (learned priority)",
    body: "Prioritized planning where a small network, trained with REINFORCE as a ranking, picks the order in which vehicles are planned. 3.00x greedy throughput.",
  },
  {
    name: "Bootstrapped DQN",
    body: "Randomized-prior bootstrapped DQN ensemble (K=8) with Thompson sampling per episode and a warm start from expert demonstrations. 2.53x greedy, the best end-to-end learned policy.",
  },
  {
    name: "PPO, MAPPO, A2C, BC",
    body: "Parameter-shared PPO 1.56x, behaviour cloning 1.40x, MAPPO with a centralised critic 1.29x, and A2C 1.10x (its interval includes 1.0, so not clearly above greedy).",
  },
];

export default function ShieldedLgvRoutingPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        If one collision shield keeps every routing method safe, so that
        methods compete on throughput alone, do learned policies beat
        classical multi-agent planners?
      </HypothesisCallout>
      <ProjectGlance slug="shielded-lgv-routing" />

      <FadeIn>
        <DeepSection
          eyebrow="The contribution"
          title="One PIBT-inspired shield under every method"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <p>
            Six LGVs share the warehouse aisles (walking workers appear in
            the live demo only, not in the scored runs). Every routing method, classical or
            learned, runs on top of the same collision shield: a
            priority-ordered simplification of PIBT (without its priority
            inheritance or backtracking) that checks every joint move. A
            separate conflict check asserts zero collisions at every
            simulation step.
          </p>
          <p>
            Because safety lives in the shield and not in the planner, the
            comparison reduces to throughput. Evaluated over 5 seeds on 15
            held-out task streams on one warehouse layout, with IQM and
            bootstrap confidence intervals, the classical planners won:
            prioritized planning 3.03x greedy throughput and CBS 3.01x,
            against 2.53x for the best learned policy.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Classical planners"
          title="What every learned method has to beat"
          icon={<Cpu className="h-4 w-4" />}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {classicalPlanners.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-sm font-semibold text-accent">{p.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </DeepSection>

        <DeepSection
          eyebrow="Learned and hybrid methods"
          title="How the learned methods compared"
          icon={<Database className="h-4 w-4" />}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {learnedPolicies.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-sm font-semibold text-accent">{p.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </DeepSection>

        <DeepSection
          eyebrow="Humans in the loop"
          title="Workers walk; the fleet adapts without retraining"
          icon={<Users className="h-4 w-4" />}
        >
          <p>
            Workers walk warehouse aisles on the same grid the LGVs use.
            Every routing method navigates around them without retraining,
            because the shield treats workers as dynamic obstacles, the same
            way it treats other vehicles. In the live demo only; workers
            were not part of the evaluation.
          </p>
        </DeepSection>

        {project.liveUrl ? (
          <DeepSection
            id="live-demo"
            eyebrow="Live demo"
            title="Switch methods, reshape the warehouse, add workers"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            <p className="mb-6">
              Python simulation server, WebSocket streaming, live web
              client. Pick any of six methods (greedy, prioritized, CBS, behaviour
              cloning, bootstrapped DQN, hybrid), change the warehouse
              layout, raise or lower the number of human workers. The
              shield runs underneath all of it.
            </p>
            <HFSpaceEmbed
              liveUrl={project.liveUrl}
              spaceName="LGV Warehouse Live Demo"
              height={760}
            />
          </DeepSection>
        ) : null}

        <DeepSection
          eyebrow="Tech stack"
          title="Frameworks and infrastructure"
          icon={<Layers className="h-4 w-4" />}
        >
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">
            Solo project for the Advanced Statistical Learning and Modeling
            course at Federico II. Demo source on the HuggingFace Space files
            tab.
          </p>
        </DeepSection>
      </FadeIn>
    </article>
  );
}
