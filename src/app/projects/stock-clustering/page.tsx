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
};

const stats = [
  { label: "Streaming topics", value: "55" },
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
        Can a single notebook bootstrap a Kafka + Zookeeper broker, stream
        55 tickers through it, and produce daily price-regime clusters
        cleanly justified by Silhouette, Elbow, and PCA together?
      </HypothesisCallout>

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="A streaming layer for 55 tickers, plus a clustering experiment on top"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            We bootstrapped a single-broker Apache Kafka 3.3.1 plus Zookeeper
            cluster from a notebook and registered 55 per-ticker topics
            (stock_AAPL, stock_AMZN, and so on for the US large-cap universe).
            A KafkaProducer streamed daily OHLCV data (April to September 2023,
            yfinance) into those topics so downstream consumers could subscribe
            per ticker without re-fetching.
          </p>
          <p>
            <strong className="text-text">Scope:</strong> the streaming layer
            carries all 55 tickers, but the K-means experiment runs on a
            single ticker&apos;s price series. Wiring the Kafka source into
            the clustering pipeline is the next step.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Methodology"
          title="K = 4 picked from three independent signals"
          icon={<Cpu className="h-4 w-4" />}
        >
          <p>
            The PySpark MLlib pipeline goes{" "}
            <code className="text-accent">VectorAssembler</code> →{" "}
            <code className="text-accent">KMeans (seed=1)</code> →{" "}
            <code className="text-accent">PCA (k=2)</code> →{" "}
            <code className="text-accent">ClusteringEvaluator</code>. We swept K
            from 2 to 10 and looked at three orthogonal criteria together:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Silhouette score (cluster cohesion + separation)</li>
            <li>Within-cluster sum of squares, the classic Elbow test</li>
            <li>2D PCA visualisation, to eyeball how clusters fragment</li>
          </ul>
          <p>
            Silhouette peaks at K=3 but stays close at K=4 (0.756 vs 0.740);
            Elbow shows the largest drop between K=2 and K=3, then diminishing
            returns; the PCA grid shows K=4 separates the price regimes
            cleanly without over-fragmenting. K=4 was the pick.
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
