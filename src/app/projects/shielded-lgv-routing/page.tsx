import type { Metadata } from "next";
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
};

const stats = [
  { label: "LGVs in simulation", value: "6" },
  { label: "Methods compared", value: "6" },
  { label: "Collisions, by design", value: "0" },
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
    body: "Two-level optimal search: a constraint tree at the top, single-agent A* at each leaf. Optimal under standard MAPF assumptions; expensive at scale.",
  },
];

const learnedPolicies = [
  {
    name: "RL",
    body: "Deep RL policy trained to coordinate LGVs from local observations. Generalises to layouts the classical planners must replan for.",
  },
  {
    name: "Bayes-DQN",
    body: "Bootstrapped DQN ensemble. Ensemble disagreement is the agent's uncertainty, replacing epsilon-greedy with posterior sampling for directed exploration.",
  },
  {
    name: "Hybrid",
    body: "Learned high-level routing on top of a classical local planner. Combines the generalisation of RL with the guarantees of search.",
  },
];

export default function ShieldedLgvRoutingPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        Can a collision shield make safety guarantees structurally
        independent of the routing method, so a fair head-to-head between
        classical multi-agent planners and learned policies (including
        humans walking the aisles) becomes possible without retraining
        anyone?
      </HypothesisCallout>

      <FadeIn>
        <DeepSection
          eyebrow="The contribution"
          title="PIBT collision shield, planner-agnostic"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <p>
            Six LGVs share the warehouse with each other and with human
            workers walking the aisles. Every routing method, classical or
            learned, runs underneath the same PIBT (Priority Inheritance
            with Backtracking) collision shield. PIBT guarantees that at
            every simulation step, the joint action is collision-free.
          </p>
          <p>
            This separation of concerns is the contribution. Safety lives
            in the shield, not in the planner. So the comparison between
            planners reduces to a question of throughput, fairness, and
            generalisation, and learned policies are not penalised for
            being statistically uncertain about safety the way classical
            ones are not.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Three classical planners"
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
          eyebrow="Three learned policies"
          title="What the RL stack adds"
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
            Every routing method navigates around them automatically. None
            of the learned policies were retrained when worker counts
            change; the shield handles new dynamic obstacles the same way
            it handles vehicle-vehicle conflicts. This is the
            zero-shot-generalisation claim that the shield enables.
          </p>
        </DeepSection>

        {project.liveUrl ? (
          <DeepSection
            eyebrow="Live demo"
            title="Switch methods, reshape the warehouse, add workers"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            <p className="mb-6">
              Python simulation server, WebSocket streaming, live web
              client. Pick any of the six methods, change the warehouse
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
            Built with Farshad Farahtaj. Source on the HuggingFace Space
            files tab.
          </p>
        </DeepSection>
      </FadeIn>
    </article>
  );
}
