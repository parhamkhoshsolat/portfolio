import type { Metadata } from "next";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Database, Cpu, BarChart3, Layers, AlertCircle, Users, ExternalLink } from "lucide-react";
import { HFSpaceEmbed } from "@/components/HFSpaceEmbed";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import {
  PestClassifierComparison,
  PestRegressionComparison,
} from "@/components/PestModelComparison";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("pest-forecasting")!;
const assets = getProjectAssets("pest-forecasting");

const REANALYSIS_URL =
  "https://github.com/parhamkhoshsolat/pest-population-forecasting/tree/main/reanalysis";

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
  alternates: { canonical: "/projects/pest-forecasting" },
};

const stats = [
  { label: "Trap-days", value: "245" },
  { label: "Traps", value: "5" },
  { label: "Catch days", value: "21" },
  { label: "Models compared", value: "11" },
];

export default function PestPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout label="Question">
        Can a few weeks of trap counts plus local weather warn of new insect
        catches, and which kind of model does it best when catch days are rare
        (21 of 245 trap-days)?
      </HypothesisCallout>
      <ProjectGlance slug="pest-forecasting" />

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="Weather and trap counts from five field traps"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            Growers check insect traps to decide when to treat crops, and a
            missed catch costs more than a false alarm. This was the only data
            available for the university project: 5 traps over 49 days (6 July
            to 23 August 2024), 245 trap-days with average temperature,
            humidity and temperature range, and 21 catch days in two bursts.
          </p>
          <p>
            The data was split by date: the first 196 rows for training and the
            last 49 for testing. We engineered lag, 3-day rolling-mean, recency
            and calendar features.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Methodology"
          title="Two tasks, 11 models, one time-ordered split"
          icon={<Cpu className="h-4 w-4" />}
        >
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-text">Count regression</strong> (6
              models): a regression task (estimate the day&apos;s catch count)
              with ARIMAX, SARIMAX, Prophet, Random Forest, XGBoost and
              LightGBM.
            </li>
            <li>
              <strong className="text-text">Catch-day classification</strong>{" "}
              (5 models): whether any new insect is caught, with Random Forest,
              XGBoost, LightGBM, LSTM and GRU. Tree models were tuned with
              time-ordered cross-validation and{" "}
              <code className="text-accent">class_weight=&apos;balanced&apos;</code>.
              The threshold search found no useful value (validation F1 was 0
              at every threshold), so it stayed at the grid&apos;s lowest value,
              0.10.
            </li>
            <li>
              <strong className="text-text">Model choice</strong>: we ran both
              as tournaments; the winner was picked on the same test window, so
              even the original scores were optimistic.
            </li>
          </ul>
        </DeepSection>

        <DeepSection
          eyebrow="Re-analysis"
          title="A key input leaked the answer"
          icon={<AlertCircle className="h-4 w-4" />}
        >
          <p>
            The original classifier looked strong. When I re-checked the
            features, the input &quot;recent activity&quot; turned out to be 1
            on every catch day, including the catch day itself, so it already
            contained the answer. It was the strongest feature in the model, and
            the regression used it too.
          </p>
          <p>
            I re-ran both notebooks with that input removed, on the same split,
            the same search grid and the same threshold search, and compared the
            result with simple baselines.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Results"
          title="Without the leak, no model beats simple baselines"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            With the leaking input removed, the Random Forest classifier scores
            AUC 0.49 and F1 0.36 on 49 test trap-days (9 with a catch), against
            the original 0.92 and 0.667. The regression&apos;s mean error rises
            from 0.355 to 0.496 insects per trap-day, worse than simply
            predicting yesterday&apos;s count (0.34). Adding synthetic catch days
            to training (SMOTE) made the classifier worse, not better.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <PestClassifierComparison />
            <PestRegressionComparison />
          </div>
          <p className="mt-6">
            The honest conclusion: on 245 trap-days with 21 catch days, none of
            these models forecasts catches better than a simple baseline. This
            is a negative result, reported as one. Scripts and tables for the
            re-analysis are in the{" "}
            <a
              href={REANALYSIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              reanalysis folder on GitHub
            </a>
            .
          </p>
        </DeepSection>

        {project.liveUrl ? (
          <DeepSection
            id="live-demo"
            eyebrow="Live demo"
            title="The corrected dashboard"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            <p className="mb-6">
              A Streamlit dashboard on Hugging Face with the data exploration, the corrected
              results next to the simple baselines, and what was withdrawn and why. The
              prediction form was removed, because no model beat the baselines.
            </p>
            <HFSpaceEmbed liveUrl={project.liveUrl} spaceName="Pest forecasting dashboard" height={760} />
          </DeepSection>
        ) : null}

        <DeepSection
          eyebrow="Team"
          title="Who did what"
          icon={<Users className="h-4 w-4" />}
        >
          <p>
            Team of 3 (Information Systems and Business Intelligence, Federico
            II). I designed the model comparison and evaluation and did the
            re-analysis; Farshad Farahtaj led data preprocessing, exploratory
            analysis and feature engineering; Giovanni Montanile built the
            Power BI reports.
          </p>
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
