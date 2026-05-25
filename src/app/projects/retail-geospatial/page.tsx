import type { Metadata } from "next";
import { Database, Map, BarChart3, Layers, Award, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectGallery, ExternalEmbed } from "@/components/ProjectGallery";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("retail-geospatial")!;
const assets = getProjectAssets("retail-geospatial");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const stats = [
  { label: "Districts", value: "20" },
  { label: "Source systems", value: "2" },
  { label: "Team", value: "4 people" },
  { label: "Recognition", value: "Jury pick" },
];

export default function RetailGeospatialPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        Can SQL joins between Fater proprietary sales and ISTAT census,
        plus a Python geospatial pipeline, produce a single ranked map of
        expansion opportunities a non-technical executive can act on in
        five seconds?
      </HypothesisCallout>

      <FadeIn>
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-4 w-4 text-amber-400" />
            <div className="text-sm leading-relaxed text-muted">
              <p className="font-semibold text-amber-200">
                Mock data, real methodology
              </p>
              <p className="mt-2">
                Fater&apos;s proprietary sales records are under NDA. The
                map below and the public repo use representative mock data
                that mirrors the structure of the original. The SQL
                queries, joins, spatial pipeline, and per-capita
                store-potential metric are faithful to the work I
                presented to leadership; only the underlying numbers are
                synthetic. The static deliverable that drove the jury
                decision used the real data and is not shown here.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="An industry challenge for a Procter and Gamble joint venture"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            Fater S.p.A. is the P&amp;G + Angelini Industries joint venture
            that owns Pampers Italia, Lines, and Tampax for the Italian
            market. The brief: rank 20 administrative microcode districts by
            expansion opportunity using a mix of their proprietary sales
            records and ISTAT census data that had no prior link.
          </p>
          <p>
            Our team of four built the SQL and spatial pipeline together; I
            presented the final analysis solo to Fater leadership and was
            picked by the jury for individual recognition.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Methodology"
          title="From two disconnected sources to one ranked map"
          icon={<Map className="h-4 w-4" />}
        >
          <p>
            Three steps, in order:
          </p>
          <ol className="ml-6 list-decimal space-y-2">
            <li>
              <strong className="text-text">SQL stitch.</strong> CTEs and
              joins in MySQL combined Fater&apos;s proprietary sales records
              with ISTAT sociodemographic census data per district. Window
              functions handled the district-level rankings.
            </li>
            <li>
              <strong className="text-text">Spatial join.</strong> A
              GeoPandas point-in-polygon pipeline (EPSG:4326) attached each
              store to its district polygon so per-district counts could be
              computed from raw store points.
            </li>
            <li>
              <strong className="text-text">Per-capita metric.</strong> Store
              count divided by district population gives the per-capita
              store-potential figure that drives the ranking. Higher = under
              served relative to population.
            </li>
          </ol>
        </DeepSection>

        <DeepSection
          eyebrow="Interactive map (mock data)"
          title="Choropleth of per-capita store potential"
          icon={<Map className="h-4 w-4" />}
        >
          <p>
            The Folium map below reproduces the shape of the deliverable
            that went into the Fater presentation, rendered against mock
            data (see the note at the top of this page). The static map
            export with the real data drove the jury decision; the
            interactive version here exists so the methodology is
            inspectable.
          </p>
          {assets.externalEmbed ? (
            <div className="mt-6">
              <ExternalEmbed {...assets.externalEmbed} />
            </div>
          ) : null}
        </DeepSection>

        <DeepSection
          eyebrow="Static deliverable"
          title="Final choropleth shipped to Fater leadership"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <ProjectGallery charts={assets.charts} cols={1} />
        </DeepSection>

        <DeepSection
          eyebrow="Recognition"
          title="Attendance certificate from Fater leadership"
          icon={<Award className="h-4 w-4" />}
        >
          <p>
            Signed by Fater&apos;s Sales &amp; Digital Business Analyst
            Manager, Head of Data &amp; Analytics, and Sales &amp; Digital
            Data Scientist Project Manager. The certificate names the exact
            brief (a Neighborhood Analytics model for sales-point potential
            in the children&apos;s diapers category) and confirms the
            collaboration with the MSc Data Science programme at Federico II.
          </p>
          <a
            href="/projects/retail-geospatial/fater-attendance.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-text hover:border-accent/60 hover:text-accent transition-colors"
          >
            <Award className="h-4 w-4" />
            <span className="flex flex-col">
              <span className="font-medium">View the certificate (PDF)</span>
              <span className="text-xs text-muted">
                Issued 11 April 2024, Naples
              </span>
            </span>
          </a>
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
