import type { Metadata } from "next";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Database, Cpu, BarChart3, Layers, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("oulad-timeseries")!;
const assets = getProjectAssets("oulad-timeseries");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
  alternates: { canonical: "/projects/oulad-timeseries" },
};

const stats = [
  { label: "Source data", value: "420 MB" },
  { label: "Daily observations", value: "808" },
  { label: "Models tested", value: "4" },
  { label: "CNN hold-out MAE (log)", value: "0.20" },
];

export default function OuladPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        How well can classical time-series models and a small 1D CNN
        forecast daily student activity on the Open University learning
        platform?
      </HypothesisCallout>
      <ProjectGlance slug="oulad-timeseries" />

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
            of total VLE interactions, log-transformed, and built four
            forecasters: SARIMA, ARIMAX, Prophet, and a custom 1D CNN.
          </p>
          <p>
            University team project (Hardware and Software for Big Data,
            Federico II, July 2024) with Farshad Farahtaj and Zahra
            Jafarinejad; I built the full pipeline.
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
          title="What was measured, and what was not"
          icon={<TrendingUp className="h-4 w-4" />}
        >
          <p>
            The 1D CNN (TensorFlow/Keras, 50 epochs, batch 32, 30-day input
            window) reached an MAE of 0.20 on log-scale daily clicks on a
            chronological hold-out.
          </p>
          <p>
            SARIMA, ARIMAX and Prophet were fitted and plotted, but they were
            not scored on the same hold-out as the CNN, so the numbers are not
            a like-for-like comparison and no model is declared the winner.
            Errors are on the log scale; they are not percentage errors on raw
            click counts.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Forecasts"
          title="What each model sees and predicts"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            Three notebook outputs: the raw time series with anomalies
            flagged, Prophet&apos;s forecast against observed clicks in the
            original scale, and the CNN&apos;s training-data fit plus
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
