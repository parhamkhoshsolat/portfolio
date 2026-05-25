import type { Metadata } from "next";
import { Database, Cpu, Layers, GitBranch, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HFSpaceEmbed } from "@/components/HFSpaceEmbed";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("talentsonar")!;
const assets = getProjectAssets("talentsonar");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Team", value: "2 people" },
  { label: "Data source", value: "GitHub GraphQL" },
  { label: "Inference", value: "Gemini API" },
  { label: "Frontend", value: "Streamlit" },
];

const pipelineSteps = [
  {
    title: "Pull",
    body: "GitHub GraphQL API extracts public-repo metadata, commit history, and language breakdowns for any handle in a single round trip.",
  },
  {
    title: "Structure",
    body: "Raw API output is summarised into compact features: tech stack distribution, project archetypes (CRUD app vs ML pipeline vs library), commit cadence.",
  },
  {
    title: "Infer",
    body: "Structured features are passed to Google Gemini with a prompt that asks for skill inference, seniority signal, and stand-out projects, with grounded explanations per claim.",
  },
  {
    title: "Score",
    body: "A Streamlit candidate-scoring view combines the LLM read with a configurable test layer. PDF report downloadable for downstream review.",
  },
];

export default function TalentSonarPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <FadeIn>
        <DeepSection
          eyebrow="The problem"
          title="GitHub handles are noisy; recruiters need a fast read"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            Every technical recruiter eventually faces the same problem: a
            candidate&apos;s GitHub profile is the most honest signal of their
            actual coding, but it&apos;s also dozens of repos of varying
            quality, mixed languages, and side projects vs serious work.
            Reading a profile cold takes 20 minutes per candidate.
          </p>
          <p>
            TalentSonar collapses that into a single page: paste a handle,
            get an LLM-grounded read on technical skills, project
            archetypes, and seniority signal, with the underlying evidence
            (repos, commit cadence, languages) visible alongside.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Pipeline"
          title="Four steps from a handle to a structured profile"
          icon={<GitBranch className="h-4 w-4" />}
        >
          <ol className="grid gap-4 md:grid-cols-2">
            {pipelineSteps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft tabular-nums">
                    {i + 1}
                  </span>
                  {step.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </DeepSection>

        <DeepSection
          eyebrow="Scope"
          title="What ships today vs what&apos;s next"
          icon={<Cpu className="h-4 w-4" />}
        >
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-text">Live today:</strong> GitHub
              GraphQL extraction, Gemini-driven inference, Streamlit
              candidate-scoring UI, CSS-only anti-cheat layer, downloadable
              PDF report.
            </li>
            <li>
              <strong className="text-text">Mock today:</strong> the
              candidate test scoring is a heuristic placeholder; the next
              iteration swaps it for LLM-evaluated scoring with explanations
              per question.
            </li>
            <li>
              <strong className="text-text">v2 plan:</strong> a Recruiter
              dashboard with multi-candidate sorting, JD-match scoring, and a
              link to schedule directly with the strongest match.
            </li>
          </ul>
        </DeepSection>

        {project.liveUrl ? (
          <DeepSection
            eyebrow="Live demo"
            title="Try the candidate-scoring app"
            icon={<GitBranch className="h-4 w-4" />}
          >
            <p>
              The Streamlit app lives on HuggingFace Spaces. Paste a GitHub
              handle to see the GraphQL extraction plus the Gemini-driven
              skill inference end to end.
            </p>
            <div className="mt-6">
              <HFSpaceEmbed
                liveUrl={project.liveUrl}
                spaceName="TalentSonar"
                height={720}
              />
            </div>
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
            Source code on{" "}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </DeepSection>

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/40 p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 text-accent" />
            <p className="text-sm text-muted">
              The agent at the bottom-right has the full project memory for
              TalentSonar. Ask it:{" "}
              <span className="text-accent">&ldquo;Walk me through the LLM
              prompt design&rdquo;</span>.
            </p>
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
