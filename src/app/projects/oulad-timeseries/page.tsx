import type { Metadata } from "next";
import { Database, Cpu, BarChart3, Layers, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("oulad-timeseries")!;
const assets = getProjectAssets("oulad-timeseries");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Source data", value: "420 MB" },
  { label: "Daily observations", value: "808" },
  { label: "Models tested", value: "4" },
  { label: "Best test MAPE", value: "1.9%" },
];

export default function OuladPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="Forecasting student VLE engagement on the Open University dataset"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            The Open University Learning Analytics dataset (OULAD) is a public
            420 MB release of click-stream and assessment data across multiple
            UK course presentations. I aggregated it to 808 daily observations
            of total VLE interactions and benchmarked four forecasters
            head-to-head: SARIMA, ARIMAX, Prophet, and a custom 1D CNN.
          </p>
          <p>
            The goal: a forecast accurate enough to inform academic planning,
            but with at least one model that staff without an ML background
            could interpret. SARIMA stayed in the comparison for that reason.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Feature engineering"
          title="Two different lag windows for two different model families"
          icon={<Cpu className="h-4 w-4" />}
        >
          <p>
            Statistical models (SARIMA, ARIMAX, Prophet) and the CNN want
            different feature shapes, so I built two parallel windows:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-text">7 lag features</strong> at 1, 2,
              3, 7, 14, 21, and 28 days for the statistical models, mirroring
              weekly and monthly seasonality.
            </li>
            <li>
              <strong className="text-text">30-lag input window</strong> for
              the 1D CNN, letting the network learn its own short-horizon
              shape without having to write seasonality terms by hand.
            </li>
          </ul>
        </DeepSection>

        <DeepSection
          eyebrow="Results"
          title="CNN edged out Prophet by a thin margin"
          icon={<TrendingUp className="h-4 w-4" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Model</th>
                  <th className="py-3 pr-4 font-medium">Test MAE</th>
                  <th className="py-3 pr-4 font-medium">Test MAPE</th>
                  <th className="py-3 pr-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="text-text tabular-nums">
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4 text-accent">1D CNN</td>
                  <td className="py-3 pr-4 text-accent">0.199</td>
                  <td className="py-3 pr-4 text-accent">1.9%</td>
                  <td className="py-3 pr-4 text-muted">
                    Winner. 50 epochs, batch 32, 30-lag window.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4">Prophet</td>
                  <td className="py-3 pr-4">0.203</td>
                  <td className="py-3 pr-4">2.0%</td>
                  <td className="py-3 pr-4 text-muted">
                    Razor-thin runner-up.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-4">ARIMAX</td>
                  <td className="py-3 pr-4 text-muted">n/a</td>
                  <td className="py-3 pr-4 text-muted">n/a</td>
                  <td className="py-3 pr-4 text-muted">
                    Solid baseline; see chart below.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">SARIMA</td>
                  <td className="py-3 pr-4 text-muted">n/a</td>
                  <td className="py-3 pr-4 text-muted">n/a</td>
                  <td className="py-3 pr-4 text-muted">
                    Kept as interpretable seasonal baseline.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DeepSection>

        <DeepSection
          eyebrow="Forecasts"
          title="What each model sees and predicts"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            Three notebook outputs: the raw time series with anomalies
            flagged, Prophet&apos;s forecast against observed clicks in the
            original scale, and the winning CNN&apos;s training-data fit plus
            its out-of-sample predictions.
          </p>
          <div className="mt-6">
            <ProjectGallery charts={assets.charts} />
          </div>
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
