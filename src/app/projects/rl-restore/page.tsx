import type { Metadata } from "next";
import {
  Image as ImageIcon,
  Cpu,
  BarChart3,
  Sparkles,
  Layers,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HFSpaceEmbed } from "@/components/HFSpaceEmbed";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("rl-restore")!;
const assets = getProjectAssets("rl-restore");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Specialist CNN tools", value: "12" },
  { label: "Agent PSNR gain", value: "+2.93 dB" },
  { label: "Of oracle ceiling", value: "~90%" },
  { label: "Live demo", value: "Yes" },
];

// Overall PSNR gain over the damaged input, held-out DIV2K test split.
// Ordered low to high so the story reads top to bottom.
const results = [
  {
    method: "Best single tool",
    gain: "+2.34",
    note: "The strongest one-shot specialist. The floor any chain should beat.",
    highlight: false,
  },
  {
    method: "RL agent (DQN+LSTM, up to 3 tools)",
    gain: "+2.93",
    note: "Nearly doubles the best single tool. Reaches about 90% of the oracle ceiling.",
    highlight: true,
  },
  {
    method: "Greedy oracle (best-possible chain)",
    gain: "+3.24",
    note: "The ceiling for this toolbox if you could always pick the perfect chain.",
    highlight: false,
  },
  {
    method: "Agent after joint fine-tuning",
    gain: "+3.67",
    note: "Retraining tools on the mid-chain images they actually see. A +0.74 dB lift, about 3x the paper's reported 0.25.",
    highlight: true,
  },
  {
    method: "Single CNN baseline (448k params)",
    gain: "+4.03",
    note: "One end-to-end network of the same size. Higher raw PSNR than the toolchain.",
    highlight: false,
  },
];

const additions = [
  {
    title: "Single-CNN baseline",
    body: "One end-to-end network of the same parameter budget, so the toolchain is measured against an honest alternative, not just against itself.",
  },
  {
    title: "Joint fine-tuning (the paper's Algorithm 1)",
    body: "Never released by the authors. It retrains the tools on the actual mid-chain images they encounter, not clean degradations. Lifts the same agent from +2.93 to +3.67.",
  },
  {
    title: "Generative Enhance & Upscale 4x",
    body: "A Real-ESRGAN finisher that invents plausible detail to look crisp. Shown without a PSNR number, because that detail is synthesized, not recovered.",
  },
  {
    title: "Live web app",
    body: "A FastAPI + React demo that plays back the agent's decisions one tool at a time, with the quality meter climbing as it goes.",
  },
];

export default function RlRestorePage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        When a photo is damaged by an unknown mix of blur, noise, and JPEG
        artifacts, can a reinforcement-learning agent pick a short, ordered
        chain of small specialist filters that beats any single filter, and
        is the result worth the extra machinery compared to one end-to-end
        network?
      </HypothesisCallout>

      <FadeIn>
        <DeepSection
          eyebrow="The problem"
          title="No single filter fixes mixed damage"
          icon={<ImageIcon className="h-4 w-4" />}
        >
          <p>
            A denoiser blurs away real edges. A deblurrer amplifies noise. A
            JPEG-artifact remover does nothing for either. Real photos carry
            all three at once, at strengths you do not know in advance, so
            the right fix is a sequence of small corrections rather than one
            big one.
          </p>
          <p>
            This is a reimplementation of Yu, Dong, Lin, and Loy, &quot;Crafting
            a Toolchain for Image Restoration by Deep Reinforcement
            Learning&quot; (CVPR 2018). I built it end to end for a
            computer-vision course: the 12 tools, the agent, the baselines,
            the fine-tuning, and the web app.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="How it works"
          title="Twelve specialist tools, one agent that chains them"
          icon={<Cpu className="h-4 w-4" />}
        >
          <p>
            The toolbox is 12 small CNNs. Each is trained to fix one kind of
            damage at one strength, so each is good at exactly one thing and
            useless at the rest. On its own that is a limitation. Chained by
            a controller, it becomes a vocabulary.
          </p>
          <p>
            The controller is a DQN with an LSTM. It looks at a 63x63 crop of
            the damaged photo, picks one tool, applies it to the full image,
            looks again, and either picks the next tool or stops. Chains run
            up to three tools. The LSTM is what lets the agent remember what
            it has already done and adapt the rest of the chain to the image
            in front of it.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Results"
          title="Where the agent lands, honestly"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            Held-out DIV2K test split. Every number is PSNR gain in decibels
            over the damaged input, averaged across mild, moderate, and
            severe degradation. Higher is better.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Method</th>
                  <th className="py-3 pr-4 font-medium">Gain</th>
                  <th className="py-3 pr-4 font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="text-text">
                {results.map((r) => (
                  <tr key={r.method} className="border-b border-border/60 align-top">
                    <td
                      className={`py-3 pr-4 ${
                        r.highlight ? "text-accent" : ""
                      }`}
                    >
                      {r.method}
                    </td>
                    <td
                      className={`py-3 pr-4 tabular-nums ${
                        r.highlight ? "text-accent" : "text-text"
                      }`}
                    >
                      {r.gain}
                    </td>
                    <td className="py-3 pr-4 text-muted">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-muted">
            The honest takeaway: the agent reaches about 90% of the oracle
            ceiling and nearly doubles the best single tool, but a single
            end-to-end CNN of the same size scores higher on raw PSNR. So
            the toolchain&apos;s value is not peak fidelity. It is
            interpretability (it shows its work step by step), modularity
            (swap or add a tool without retraining the rest), and per-image
            adaptivity. Pixel-loss models also come out slightly soft from
            regression to the mean, which is why the generative finisher
            exists.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Beyond the paper"
          title="What I added"
          icon={<Plus className="h-4 w-4" />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {additions.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-sm font-semibold text-accent">{a.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </DeepSection>

        {project.liveUrl ? (
          <DeepSection
            eyebrow="Live demo"
            title="Watch the agent restore a photo, one tool at a time"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            <p className="mb-6">
              A self-contained FastAPI + React app, no Gradio. Pick a method,
              upload or snap a photo, and watch the agent restore it step by
              step with the quality meter climbing. The optional Enhance &amp;
              Upscale 4x step runs Real-ESRGAN. Open in a new tab if
              you&apos;d rather not wait inline.
            </p>
            <HFSpaceEmbed
              liveUrl={project.liveUrl}
              spaceName="RL-Restore"
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
            PyTorch for the 12 tools, the DQN+LSTM agent, the baselines, and
            joint fine-tuning. FastAPI + React + TypeScript + Docker for the
            web app, deployed on a free HuggingFace CPU Space. About 200
            tests. Source on{" "}
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
              Based on Yu, Dong, Lin, Loy, &quot;Crafting a Toolchain for
              Image Restoration by Deep Reinforcement Learning,&quot; CVPR
              2018 (arXiv:1804.03312). The Enhance step uses Real-ESRGAN
              (Wang et al., 2021). My own code is MIT-licensed.
            </p>
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
