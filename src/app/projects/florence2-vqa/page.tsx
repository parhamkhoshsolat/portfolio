import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Cpu, Database, GraduationCap, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { Florence2LiveDemo } from "@/components/Florence2LiveDemo";
import { ProjectGallery, TechReportLink } from "@/components/ProjectGallery";
import { TopAnswersChart } from "@/components/Florence2EdaCharts";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("florence2-vqa")!;
const assets = getProjectAssets("florence2-vqa");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Model size", value: "771M params" },
  { label: "Training data", value: "150K Q-pairs" },
  { label: "Loss reduction", value: "64%" },
  { label: "Hardware", value: "Colab T4" },
];

export default function Florence2Page() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <FadeIn>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.year}</Badge>
          {project.grade ? <Badge variant="outline">{project.grade}</Badge> : null}
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400">
            Live demo
          </Badge>
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> Source on GitHub
            </a>
          </Button>
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Open on HuggingFace Spaces
            </a>
          </Button>
          {assets.techReport ? (
            <TechReportLink {...assets.techReport} />
          ) : null}
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
        <Section
          icon={<Database className="h-4 w-4" />}
          eyebrow="Dataset"
          title="VQA v2.0 Abstract Scenes, open-ended subset"
        >
          <p>
            We started from VQA v2.0&apos;s Abstract Scenes split: 50,000
            fully coloured cartoon-style scenes, ~3 crowd-annotated questions
            per image, ~150K image-question pairs total (60K train, 30K val,
            60K test). We kept only the open-ended QA subset and dropped
            multiple-choice questions to match the model&apos;s output format.
          </p>
          <p>
            We built a custom preprocessing pass that joined the raw
            questions and annotations JSONs on{" "}
            <code className="text-accent">question_id</code>, took the modal-vote
            answer per question, prefixed each prompt with the{" "}
            <code className="text-accent">&lt;VQA&gt;</code> task token, and
            emitted clean train / val / test JSONs. Images were resized
            offline to 224×224 for training, and to 768×768 at inference time.
          </p>
        </Section>

        <Section
          icon={<BarChart3 className="h-4 w-4" />}
          eyebrow="Data exploration"
          title="What the questions look like before fine-tuning"
        >
          <p>
            Before training, we profiled the open-ended questions and
            crowd-annotated answers to understand the linguistic surface
            area. The answer-frequency bar below is rebuilt from the
            notebook output as an interactive chart; the word cloud and
            question-length histogram stay as raw notebook artifacts.
          </p>
          <div className="mt-6 grid gap-6">
            <TopAnswersChart />
            <ProjectGallery charts={assets.charts} cols={2} />
          </div>
        </Section>

        <Section
          icon={<Cpu className="h-4 w-4" />}
          eyebrow="Model selection"
          title="Three architectures evaluated; Florence-2 won on stability"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Model</th>
                  <th className="py-3 pr-4 font-medium">Params</th>
                  <th className="py-3 pr-4 font-medium">Outcome on Colab T4</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4">PaliGemma</td>
                  <td className="py-3 pr-4 text-muted">~3B</td>
                  <td className="py-3 pr-4 text-muted">
                    Exceeded GPU memory; prompt-format sensitive.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4">BLIP</td>
                  <td className="py-3 pr-4 text-muted">~1.3B</td>
                  <td className="py-3 pr-4 text-muted">
                    Unstable gradients; kernel crashes during contrastive
                    learning.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-accent">Florence-2-base-ft</td>
                  <td className="py-3 pr-4 text-accent">771M</td>
                  <td className="py-3 pr-4 text-accent">
                    Stable end-to-end full-parameter fine-tune.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            We loaded{" "}
            <code className="text-accent">microsoft/Florence-2-base-ft</code>{" "}
            at revision <code className="text-accent">refs/pr/6</code> with{" "}
            <code className="text-accent">trust_remote_code=True</code>. All
            771M parameters trainable, no frozen layers.
          </p>
        </Section>

        <Section
          icon={<GraduationCap className="h-4 w-4" />}
          eyebrow="Training and results"
          title="64% training-loss reduction over 3 epochs"
        >
          <p>
            We optimised with AdamW (learning rate 1e-5, batch size 8), a
            linear LR schedule, no warmup, and 22,500 total steps over 3
            epochs. Training ran on a Google Colab T4 GPU in roughly 9 hours
            wall clock, with a full validation pass at the end of every epoch.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Epoch</th>
                  <th className="py-3 pr-4 font-medium">Train loss</th>
                  <th className="py-3 pr-4 font-medium">Val loss</th>
                </tr>
              </thead>
              <tbody className="text-text tabular-nums">
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4">1</td>
                  <td className="py-3 pr-4">0.307</td>
                  <td className="py-3 pr-4">0.240</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4">2</td>
                  <td className="py-3 pr-4">0.176</td>
                  <td className="py-3 pr-4">0.206</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-accent">3</td>
                  <td className="py-3 pr-4 text-accent">0.111</td>
                  <td className="py-3 pr-4 text-accent">0.202</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted">
            Note: only cross-entropy loss is reported. No test-set
            accuracy / BLEU / CIDEr was computed; qualitative validation
            via manual inspection of validation outputs.
          </p>
        </Section>

        <Section
          icon={<ExternalLink className="h-4 w-4" />}
          eyebrow="Live demo"
          title="Try the fine-tuned model on HuggingFace Spaces"
        >
          <p className="mb-6">
            The Space below runs our fine-tuned model with configurable beam
            search and a per-answer confidence score. HuggingFace pauses idle
            Spaces, so the first request may take 30 to 60 seconds to wake the
            container.
          </p>
          <Florence2LiveDemo
            liveUrl={project.liveUrl!}
            spaceName="Florence-2 VQA"
          />
        </Section>

        <Section
          icon={<Cpu className="h-4 w-4" />}
          eyebrow="Tech stack"
          title="Frameworks and infrastructure"
        >
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">
            Source code, technical report, and reproduction guide on{" "}
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
        </Section>
      </FadeIn>
    </article>
  );
}

function Section({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-border/40 pt-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-muted leading-relaxed">
        {children}
      </div>
    </section>
  );
}
