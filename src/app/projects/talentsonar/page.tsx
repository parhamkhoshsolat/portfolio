import type { Metadata } from "next";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Database, Cpu, Layers, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("talentsonar")!;
const assets = getProjectAssets("talentsonar");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
  alternates: { canonical: "/projects/talentsonar" },
};

const stats = [
  { label: "Team", value: "2 people" },
  { label: "Format", value: "Hackathon prototype" },
  { label: "Job-ad parsing", value: "Gemini API" },
  { label: "Candidate search", value: "GitHub GraphQL" },
];

const pipelineSteps = [
  {
    title: "Parse",
    body: "An HR user pastes or uploads a job description (PDF, Word, or markdown). Gemini turns it into structured requirements: technical skills, soft skills, and the experience asked for.",
  },
  {
    title: "Search",
    body: "The required skills are mapped to programming languages and sent to the GitHub GraphQL search API, which returns real public GitHub users who match.",
  },
  {
    title: "Review",
    body: "Candidates land in a Streamlit HR dashboard next to the job posting, where the recruiter can review profiles and track jobs, candidates, and invitations.",
  },
  {
    title: "Assess",
    body: "The recruiter can send a candidate a questionnaire (multiple choice, text, and rating questions) in English or Italian.",
  },
];

export default function TalentSonarPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        Can an LLM turn a free-text job description into a structured search
        that finds real candidates on GitHub, fast enough to be useful in a
        24-hour hackathon prototype?
      </HypothesisCallout>
      <ProjectGlance slug="talentsonar" />

      <FadeIn>
        <DeepSection
          eyebrow="The problem"
          title="From a job ad to a first list of candidates"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            Recruiters start from a job description written in free text, and
            turning it into a search for people takes time. TalentSonar tries
            to shorten that step: the job ad goes in, structured requirements
            come out, and those requirements drive a search over public
            GitHub profiles.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Pipeline"
          title="Four steps from a job description to a candidate list"
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
          title="What works and what does not"
          icon={<Cpu className="h-4 w-4" />}
        >
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-text">Works:</strong> Gemini parsing
              of job descriptions into structured requirements, and GitHub
              GraphQL search that returns real candidate profiles.
            </li>
            <li>
              <strong className="text-text">Placeholder:</strong> candidates
              are ranked by a simple rule-based score that was never
              validated, and years of experience are random placeholders, so
              the ranking is not a real assessment.
            </li>
            <li>
              <strong className="text-text">Not built:</strong> LLM scoring
              of candidate answers; text answers are scored by length.
            </li>
          </ul>
        </DeepSection>

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

      </FadeIn>
    </article>
  );
}
