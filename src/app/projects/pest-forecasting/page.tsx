import type { Metadata } from "next";
import { Database, Cpu, BarChart3, Layers, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HFSpaceEmbed } from "@/components/HFSpaceEmbed";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import {
  RegressionMaeChart,
  ClassificationChart,
  ChampionConfusionMatrix,
} from "@/components/PestModelComparison";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("pest-forecasting")!;
const assets = getProjectAssets("pest-forecasting");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Samples", value: "245" },
  { label: "Models compared", value: "11" },
  { label: "Class imbalance", value: "10.67:1" },
  { label: "Minority recall", value: "1.00" },
];

export default function PestPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        Can a tournament of eleven models find a classifier that catches
        every rare pest outbreak in a 245-sample field dataset with a
        10.67:1 minority-class imbalance, where the cost of a missed
        outbreak dwarfs the cost of a false alarm?
      </HypothesisCallout>

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="Eleven-model tournament across regression and classification"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            We cleaned and merged a multi-source dataset across 5 monitoring
            sites: 245 daily samples combining meteorological readings with
            entomological catch counts. After harmonising inconsistent field
            names and mixed date formats, we engineered lag, 3-day
            rolling-mean, recency, and calendar features.
          </p>
          <p>
            The question split into two: a regression task (predict tomorrow&apos;s
            catch count) and a binary classification task (will there be a
            catch event at all). We ran both as tournaments so the model
            choice was driven by held-out test performance, not intuition.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Methodology"
          title="TimeSeriesSplit CV, class-weight balancing, threshold tuning"
          icon={<Cpu className="h-4 w-4" />}
        >
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-text">Regression bracket</strong> (6
              models): ARIMAX, SARIMAX, Prophet, Random Forest, XGBoost,
              LightGBM. All evaluated under TimeSeriesSplit cross-validation.
            </li>
            <li>
              <strong className="text-text">Classification bracket</strong> (5
              models): Random Forest, XGBoost, LightGBM, LSTM, GRU. The 10.67:1
              class imbalance was handled with{" "}
              <code className="text-accent">class_weight=&apos;balanced&apos;</code>{" "}
              and per-model F1-optimal threshold tuning on a held-out
              chronological validation slice.
            </li>
            <li>
              <strong className="text-text">Champion selection</strong>: lowest
              test MAE on regression, highest test F1 on classification.
              Random Forest won both.
            </li>
          </ul>
        </DeepSection>

        <DeepSection
          eyebrow="Results"
          title="Random Forest takes both brackets"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            The two charts below compare every model on its own test set.
            Random Forest in cyan; baselines in slate.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <RegressionMaeChart />
            <ClassificationChart />
          </div>
        </DeepSection>

        <DeepSection
          eyebrow="Champion in detail"
          title="What the Random Forest classifier actually catches"
          icon={<AlertCircle className="h-4 w-4" />}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <ChampionConfusionMatrix />
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted">
                Test metrics
              </p>
              <h3 className="mt-1 text-base font-semibold">
                49-row chronological test set
              </h3>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border border-border/60 bg-bg/40 p-3">
                  <dt className="text-xs uppercase tracking-wider text-muted">F1</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-accent">0.667</dd>
                </div>
                <div className="rounded-md border border-border/60 bg-bg/40 p-3">
                  <dt className="text-xs uppercase tracking-wider text-muted">AUC</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-accent">0.919</dd>
                </div>
                <div className="rounded-md border border-border/60 bg-bg/40 p-3">
                  <dt className="text-xs uppercase tracking-wider text-muted">Accuracy</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-text">0.82</dd>
                </div>
                <div className="rounded-md border border-border/60 bg-bg/40 p-3">
                  <dt className="text-xs uppercase tracking-wider text-muted">Recall (Catch)</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-text">1.00</dd>
                </div>
              </dl>
              <p className="mt-5 text-xs text-muted">
                Minority class support: 9 samples. Threshold tuned to 0.10 on
                a held-out chronological validation slice.
              </p>
            </div>
          </div>
        </DeepSection>

        {project.liveUrl ? (
          <DeepSection
            eyebrow="Live demo"
            title="Try the pest-prediction dashboard"
            icon={<AlertCircle className="h-4 w-4" />}
          >
            <p>
              The three-tab Streamlit dashboard ships on HuggingFace Spaces.
              Tab 1 is the exploratory data analysis, tab 2 surfaces the
              tournament results table for every model, tab 3 lets you pick
              a site and date and see the forecasted catch count alongside
              the actuals.
            </p>
            <div className="mt-6">
              <HFSpaceEmbed
                liveUrl={project.liveUrl}
                spaceName="Pest Prediction Dashboard"
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
      </FadeIn>
    </article>
  );
}
