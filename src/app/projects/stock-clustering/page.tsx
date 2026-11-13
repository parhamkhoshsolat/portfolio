import type { Metadata } from "next";
import { Database, Cpu, BarChart3, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { SilhouetteChart, ElbowChart } from "@/components/StockKSelection";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("stock-clustering")!;
const assets = getProjectAssets("stock-clustering");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
  alternates: { canonical: "/projects/stock-clustering" },
};

const stats = [
  { label: "Kafka topics", value: "55" },
  { label: "Window", value: "Apr to Sep 2023" },
  { label: "Chosen K", value: "4" },
  { label: "Silhouette @ K=4", value: "0.74" },
];

export default function StockClusteringPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero
        project={project}
        assets={assets}
        stats={stats}
      />

      <HypothesisCallout>
        Can a single notebook stand up a Kafka + Zookeeper broker, load 55
        tickers of daily prices into it, and run a K-means analysis in
        PySpark with K chosen from silhouette and elbow plots?
      </HypothesisCallout>

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="Kafka ingestion for 55 tickers, plus a separate clustering exercise"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            A single-broker Apache Kafka 3.3.1 plus Zookeeper setup, started
            from a notebook. Producers sent daily OHLCV data (April to
            September 2023, yfinance) for 55 US tickers into one topic per
            ticker (stock_AAPL, stock_AMZN, and so on; the topics were
            auto-created by the producers): 6,875 messages, 55 tickers x 125
            trading days.
          </p>
          <p>
            <strong className="text-text">Scope:</strong> this is a batch
            backfill of historical data, not a live stream. Nothing consumes
            the topics, and Spark does not read from Kafka. The K-means
            analysis ran separately, in PySpark local mode, on a single
            ticker&apos;s 125 daily rows.
          </p>
          <p>
            University team project (Hardware and Software for Big Data,
            Federico II) with Farshad Farahtaj; I built the full pipeline.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Methodology"
          title="Choosing K for one ticker's prices"
          icon={<Cpu className="h-4 w-4" />}
        >
          <p>
            The PySpark MLlib stage runs{" "}
            <code className="text-accent">VectorAssembler</code> →{" "}
            <code className="text-accent">KMeans (seed=1)</code> →{" "}
            <code className="text-accent">ClusteringEvaluator</code> on the raw
            Open, High, Low and Close prices; PCA (k=2) is used only to plot
            the clusters. K was swept from 2 to 10 and judged on:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Silhouette score (cluster cohesion + separation)</li>
            <li>Within-cluster sum of squares, the classic Elbow test</li>
            <li>2D PCA visualisation, to eyeball how clusters fragment</li>
          </ul>
          <p>
            Silhouette peaks at K=3 but stays close at K=4 (0.756 vs 0.740);
            Elbow shows the largest drop between K=2 and K=3, then diminishing
            returns; in the PCA plots K=5 and K=6 start to split bands. K=4
            was picked by eye from these plots. With one stock and unscaled
            prices, this is an exercise in choosing K, not a finding about
            the market.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="K selection"
          title="Two interactive views of why K = 4"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            The silhouette and elbow curves below are rebuilt from the
            notebook outputs as interactive charts. Hover any point for the
            exact value at that K. Amber rings mark K = 4, the chosen
            partition.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <SilhouetteChart />
            <ElbowChart />
          </div>
        </DeepSection>

        <DeepSection
          eyebrow="Cluster visualisation"
          title="What the clusters actually look like"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <p>
            Two notebook outputs that don&apos;t translate cleanly to
            interactive charts. The grid below shows the K-means assignment
            at K = 2 through 6, and the 3D scatter shows the final K = 4
            partition in raw Open / High / Low price space.
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
